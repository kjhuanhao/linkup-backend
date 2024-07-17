interface TreeNode {
  data: {
    name: string;
    emoji: string;
  };
  children?: TreeNode[];
}

interface TopicDto extends TreeNode {
  data: {
    name: string;
    emoji: string;
  };
  children: TreeNode[];
}
