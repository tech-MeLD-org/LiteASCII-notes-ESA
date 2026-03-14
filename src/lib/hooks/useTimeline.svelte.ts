/**
 * Timeline 数据处理的 Svelte Hook
 * 处理笔记按时间轴分组、排序等逻辑
 */

import type { CollectionEntry } from 'astro:content';
import { pathToSlug, getNoteTitle, isVisibleNote } from '../core/note-logic';

export interface TimelineNote {
  id: string;
  title: string;
  href: string;
  date: Date;
  monthDay: string;
  category?: string;
  tags: string[];
}

export interface UndatedNote {
  id: string;
  title: string;
  href: string;
  path: string;
  category?: string;
  tags: string[];
}

export interface TimelineYear {
  year: number;
  notes: TimelineNote[];
}

export interface TimelineData {
  years: TimelineYear[];
  undated: UndatedNote[];
}

/**
 * 格式化日期为 MM-DD 格式
 */
function formatMonthDay(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    month: '2-digit', 
    day: '2-digit' 
  });
}

/**
 * 处理笔记数据，按年份分组并排序
 */
export function processNotesForTimeline(
  notes: CollectionEntry<'notes'>[]
): TimelineData {
  // 过滤可见笔记，排除 thoughts 标签
  const validNotes = notes.filter(n => 
    isVisibleNote(n) && 
    !n.data.tags?.some(t => t.toLowerCase() === 'thoughts')
  );

  // 分离有日期和无日期的笔记
  const datedNotes = validNotes.filter(n => n.data.date);
  const undatedNotes = validNotes.filter(n => !n.data.date);

  // 按日期排序（降序）
  const sortedDatedNotes = datedNotes.sort((a, b) => 
    new Date(b.data.date!).getTime() - new Date(a.data.date!).getTime()
  );

  // 按年份分组
  const byYear = new Map<number, CollectionEntry<'notes'>[]>();
  for (const note of sortedDatedNotes) {
    const year = new Date(note.data.date!).getFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(note);
  }

  // 转换为 TimelineYear 数组
  const years: TimelineYear[] = [...byYear.keys()]
    .sort((a, b) => b - a)
    .map(year => ({
      year,
        notes: byYear.get(year)!.map(note => ({
          id: note.id,
          title: getNoteTitle(note),
          href: '/notes/' + pathToSlug(note.id),
          date: new Date(note.data.date!),
          monthDay: formatMonthDay(new Date(note.data.date!)),
          category: note.data.category as string | undefined,
          tags: note.data.tags || []
        }))
    }));

  // 处理无日期笔记（按标题排序）
  const sortedUndatedNotes = undatedNotes
    .sort((a, b) => getNoteTitle(a).localeCompare(getNoteTitle(b)))
    .map(note => ({
      id: note.id,
      title: getNoteTitle(note),
      href: '/notes/' + pathToSlug(note.id),
      path: note.id.split('/').slice(0, -1).join(' / ') || 'ROOT',
      category: note.data.category as string | undefined,
      tags: note.data.tags || []
    }));

  return {
    years,
    undated: sortedUndatedNotes
  };
}