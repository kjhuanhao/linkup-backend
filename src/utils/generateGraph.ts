// 定义初始数据
const data: DataNode = {
  id: '0',
  type: 'custom',
  data: { name: '电脑知识及工具', emoji: '💻' },
  children: [
    {
      id: '1',
      type: 'custom',
      data: { name: '认识你的电脑', link: '一级子标题', emoji: '🖥️' },
      children: [
        {
          id: '1-1',
          type: 'custom',
          data: { name: '文件与文件管理', link: '二级子标题', emoji: '📁' },
        },
        {
          id: '1-2',
          type: 'custom',
          data: { name: '基本维护和安全防护', link: '二级子标题', emoji: '🛡️' },
        },
        {
          id: '1-3',
          type: 'custom',
          data: { name: '蓝屏与解决蓝屏', link: '二级子标题', emoji: '🔧' },
        },
        {
          id: '1-4',
          type: 'custom',
          data: {
            name: 'Windows 11 修整指南',
            link: '二级子标题',
            emoji: '🪟',
          },
        },
      ],
    },
    {
      id: '2',
      type: 'custom',
      data: { name: '软件与工具', link: '一级子标题', emoji: '🧰' },
      children: [
        {
          id: '2-1',
          type: 'custom',
          data: { name: '软件的寻找与安装', link: '/aaaa', emoji: '🔍' },
        },
        {
          id: '2-3',
          type: 'custom',
          data: {
            name: '浏览器——网上冲浪必备',
            link: '二级子标题',
            emoji: '🌐',
          },
        },
        {
          id: '2-4',
          type: 'custom',
          data: { name: '压缩文件与压缩工具', link: '二级子标题', emoji: '🗜️' },
        },
        {
          id: '2-5',
          type: 'custom',
          data: { name: '工具类软件推荐', link: '二级子标题', emoji: '🛠️' },
        },
      ],
    },
    {
      id: '3',
      type: 'custom',
      data: { name: '提高效率与技巧', link: '一级子标题', emoji: '⚡' },
      children: [
        {
          id: '3-1',
          type: 'custom',
          data: {
            name: '那些好用的键盘快捷键',
            link: '二级子标题',
            emoji: '⌨️',
          },
        },
        {
          id: '3-2',
          type: 'custom',
          data: { name: '怎样寻找优质的教程', link: '二级子标题', emoji: '📚' },
        },
      ],
    },
    {
      id: '4',
      type: 'custom',
      data: { name: '硬件与设备', link: '一级子标题', emoji: '🖨️' },
      children: [
        {
          id: '4-1',
          type: 'custom',
          data: { name: '显示器的二三事', link: '二级子标题', emoji: '🖥️' },
        },
        {
          id: '4-2',
          type: 'custom',
          data: { name: '用户与微软账号', link: '二级子标题', emoji: '👤' },
        },
      ],
    },
  ],
};

// 定义计算位置的函数
function calculatePositions(node: DataNode, x = 0, y = 0, level = 0): void {
  node.position = { x, y };

  if (!node.children || node.children.length === 0) return;

  const children = node.children;
  const offset = 400; // 每个一级子标题的水平偏移量
  const verticalOffset = 150; // 垂直偏移量
  const childCount = children.length;
  const totalWidth = offset * (childCount - 1);

  const startX = x - totalWidth / 2;
  let currentY = y + verticalOffset;

  for (let i = 0; i < childCount; i++) {
    const child = children[i];

    if (level === 0) {
      // 主标题的子标题（一级子标题）
      child.position = { x: startX + i * offset, y: y + verticalOffset };
    } else if (level === 1) {
      // 一级子标题的子标题（二级子标题）
      child.position = { x, y: currentY };
      currentY += verticalOffset;
    } else if (level === 2) {
      // 二级子标题的子标题（三级子标题）
      child.position = { x: x + offset / 2, y: currentY - 20 };
      currentY += verticalOffset;
    }

    calculatePositions(child, child.position.x, child.position.y, level + 1);
  }
}

// 计算位置
calculatePositions(data);

// 定义扁平化节点的函数
function flattenNodes(
  node: DataNode,
  result: Partial<DataNode>[] = [],
): Partial<DataNode>[] {
  const { children, ...rest } = node;
  result.push(rest);
  if (children) {
    children.forEach((child) => flattenNodes(child, result));
  }
  return result;
}

const nodes = flattenNodes(data);

// 定义创建边缘的函数
interface Edge {
  id: string;
  type: string;
  source: string;
  target: string;
  markerEnd: {
    type: string;
    width: number;
    height: number;
    color: string;
  };
  animated: boolean;
}

function createEdges(node: DataNode, result: Edge[] = []): Edge[] {
  if (node.children) {
    node.children.forEach((child) => {
      result.push({
        id: `e${node.id}-${child.id}`,
        type: 'straight',
        source: node.id,
        target: child.id,
        markerEnd: {
          type: 'ArrowClosed',
          width: 20,
          height: 20,
          color: '#ff7c7c',
        },
        animated: true,
      });
      createEdges(child, result);
    });
  }
  return result;
}

const edges = createEdges(data);

export function gentest(): void {
  console.log('Nodes:', JSON.stringify(nodes, null, 2));
  console.log('Edges:', JSON.stringify(edges, null, 2));
}
