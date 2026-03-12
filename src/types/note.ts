/**
 * 笔记类型定义
 */

export interface Note {
  id: string;
  slug: string;
  title: string;
  description?: string;
  date?: Date;
  category?: string;
  tags: string[];
  body?: string;
  rawContent?: string;
}

export interface NoteFrontmatter {
  title?: string;
  description?: string;
  date?: Date;
  category?: string;
  tags?: string[];
}

export interface NoteCardData {
  title: string;
  href: string;
  date?: string;
  description?: string;
  category?: string;
  tags?: string[];
}

export interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
  href: string;
}

export interface TagInfo {
  name: string;
  count: number;
  href: string;
}

export interface NoteCollectionItem {
  id: string;
  data: NoteFrontmatter;
  body?: string;
  rawContent?: string;
}
