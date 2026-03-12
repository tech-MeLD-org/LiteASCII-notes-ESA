/**
 * 笔记工具函数
 */

import type { NoteCollectionItem, NoteCardData, NoteFrontmatter } from '../../types/note';

/**
 * 从笔记内容中提取标题（如果 frontmatter 中没有）
 */
export function extractTitle(note: NoteCollectionItem): string {
  if (note.data.title) return note.data.title;
  const match = note.body?.match(/^#\s+(.+)/m);
  if (match) return match[1].trim();
  return note.id.replace(/\.md$/, '').split('/').pop() || 'Untitled';
}

/**
 * 从笔记 ID 生成 slug
 */
export function noteSlug(noteId: string): string {
  return noteId.replace(/\.md$/, '');
}

/**
 * 格式化日期
 */
export function formatDate(dateVal: Date | string | undefined): string | undefined {
  if (!dateVal) return undefined;
  const date = dateVal instanceof Date ? dateVal : new Date(dateVal);
  if (isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * 将笔记集合项转换为 NoteCardData
 */
export function toNoteCardData(note: NoteCollectionItem): NoteCardData {
  return {
    title: extractTitle(note),
    href: `/notes/${noteSlug(note.id)}`,
    date: formatDate(note.data.date),
    description: note.data.description,
    category: note.data.category,
    tags: note.data.tags || [],
  };
}

/**
 * 统计分类和标签
 */
export function countCategories(notes: NoteCollectionItem[]): Map<string, number> {
  const counts = new Map<string, number>();
  notes.forEach((note) => {
    const category = note.data.category || '未分类';
    counts.set(category, (counts.get(category) || 0) + 1);
  });
  return counts;
}

export function countTags(notes: NoteCollectionItem[]): Map<string, number> {
  const counts = new Map<string, number>();
  notes.forEach((note) => {
    (note.data.tags || []).forEach((tag) => {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });
  return counts;
}

/**
 * 按日期排序笔记
 */
export function sortByDate(notes: NoteCollectionItem[]): NoteCollectionItem[] {
  return [...notes].sort((a, b) => {
    const da = a.data.date ? new Date(a.data.date).getTime() : 0;
    const db = b.data.date ? new Date(b.data.date).getTime() : 0;
    return db - da;
  });
}

/**
 * 生成标签 slug
 */
export function tagSlug(tag: string): string {
  return encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'));
}

/**
 * 生成分类 slug
 */
export function categorySlug(category: string): string {
  return encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'));
}