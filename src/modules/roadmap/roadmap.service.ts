import { Injectable } from '@nestjs/common';
import { MainTopicService } from '../mainTopic/mainTopic.service';
import { ChildTopicService } from '../childTopic/child.service';
interface Topic {
  id: string;
  name: string;
  emoji: string;
  children?: SubTopic[];
}

interface SubTopic {
  id: string;
  name: string;
  emoji: string;
  mainTopicId: string;
  lastTopicId: string;
  contentId: string | null;
}

interface TopicStructure {
  id: string;
  name: string;
  emoji: string;
  children: SubTopic[];
}
@Injectable()
export class RoadmapService {
  constructor(
    private mainTopicService: MainTopicService,
    private childTopicService: ChildTopicService,
  ) {}

  async getRoadmap(id: string): Promise<any> {
    const childTopics = await this.childTopicService.findMayByMainTopicId(id);
    const mainTopic = await this.mainTopicService.findOne(id);
    // 做一个遍历，返回前端需要的字段
    // mainTopic['type'] = 'custom 
    const newMainData = {
      id: mainTopic.id ,
      type: 'custom',
      data: {
        name: mainTopic.name,
        emoji: mainTopic.emoji,
        link: '一级标题',
      },
    }
    const data = this.buildNestedStructure({
      ...newMainData,
      children: childTopics,
    });
    console.log({
      ...newMainData,
      children: childTopics,
    });

    return data;
  }

  buildNestedStructure(data: any) {
    const map = new Map();
    const root = { ...data, children: [] };

    // 创建所有节点的映射
    data.children.forEach((child) => {
      map.set(child.id, {
        id: child.id,
        type: 'custom',
        data: {
          name: child.name,
          emoji: child.emoji,
          link: '二级子标题',
        },
        lastTopicId: child.lastTopicId,
        mainTopicId: child.mainTopicId,
        children: [],
      });
    });

    // 找到直接子节点（二级节点）
    const directChildren = data.children.filter(
      (child) => child.lastTopicId === data.id,
    );

    // 构建嵌套结构
    directChildren.forEach((directChild) => {
      const node = map.get(directChild.id);
      root.children.push(node);

      // 找到所有属于这个直接子节点的子节点
      const subChildren = data.children.filter(
        (child) =>
          child.lastTopicId === directChild.id ||
          (child.lastTopicId !== data.id &&
            this.findParent(child, directChild.id, map)),
      );

      node.children = subChildren.map((subChild) => map.get(subChild.id));
    });

    // 递归移除 lastTopicId 和 mainTopicId
    const removeIds = (node) => {
      delete node.lastTopicId;
      delete node.mainTopicId;
      if (node.children) {
        node.children.forEach(removeIds);
      }
    };

    removeIds(root);

    return root;
  }

  // 辅助函数：递归查找父节点
  findParent(child, targetId, map) {
    if (child.lastTopicId === targetId) return true;
    if (child.lastTopicId === child.mainTopicId) return false;
    const parent = map.get(child.lastTopicId);
    return this.findParent(parent, targetId, map);
  }
}
