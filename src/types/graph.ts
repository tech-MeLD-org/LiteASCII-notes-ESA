/**
 * 图谱类型定义
 */

export interface GraphNode {
  id: string;
  label: string;
  href?: string;
  type?: 'folder' | 'file' | 'default';
  depth?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  r?: number;
  outDegree?: number;
  totalDegree?: number;
  index?: number;
  [key: string]: any;
}

export interface GraphEdge {
  source: string | number | GraphNode;
  target: string | number | GraphNode;
}

export interface DirectoryNode {
  id: string;
  label: string;
  parentId: string;
  type: 'folder' | 'file';
  href?: string;
}

export interface ReferenceNode {
  id: string;
  title: string;
  href: string;
  slug: string;
}

export interface ReferenceEdge {
  source: number;
  target: number;
}

export interface ForceGraphOptions {
  width?: number;
  height?: number;
  linkDistance?: number;
  chargeStrength?: number;
  collisionRadius?: number;
  centerStrength?: number;
}

export interface GraphSimulation {
  stop: () => void;
  restart: () => void;
  alpha: (value?: number) => number;
  alphaTarget: (value?: number) => number;
  nodes: (nodes?: GraphNode[]) => GraphNode[];
  force: (name: string, force?: any) => any;
  on: (event: string, callback: () => void) => void;
}