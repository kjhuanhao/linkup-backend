interface DataNode {
  id: string;
  type: string;
  data: {
    name: string;
    link?: string;
    emoji: string;
    isStart?: string;
    progress?: string;
  };
  children?: DataNode[];
  position?: {
    x: number;
    y: number;
  };
}
