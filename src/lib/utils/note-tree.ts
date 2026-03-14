// src/lib/utils/note-tree.ts
//CategoryList.svelte-工具函数
import { pathToSlug } from '../core/note-logic';

export interface TreeNode {
  name: string;
  children: Record<string, TreeNode>;
  files: Array<{ name: string; slug: string }>;
}

/**
 * 将扁平的笔记列表转换为嵌套树结构
 * 逻辑完全基于你的原始实现
 */
export function buildNoteTree(notes: any[]): TreeNode {
  const root: TreeNode = { name: 'root', children: {}, files: [] };
  
  notes.forEach(note => {
    const parts = note.id.split('/');
    const fileName = parts.pop() || '';
    let current = root;
    
    parts.forEach(dir => {
      if (!current.children[dir]) {
        current.children[dir] = { name: dir, children: {}, files: [] };
      }
      current = current.children[dir];
    });
    
    current.files.push({ 
      name: note.data.title || fileName.replace(/\.md$/, ''), 
      slug: pathToSlug(note.id) 
    });
  });
  
  return root;
}