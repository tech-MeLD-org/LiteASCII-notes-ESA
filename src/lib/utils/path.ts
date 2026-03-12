/**
 * 路径处理工具函数
 */

/**
 * 连接 URL 路径
 */
export function joinPath(...parts: string[]): string {
  return parts
    .map((part, i) => {
      if (i === 0) return part.replace(/\/+$/, '');
      if (i === parts.length - 1) return part.replace(/^\/+/, '');
      return part.replace(/^\/+|\/+$/g, '');
    })
    .filter(Boolean)
    .join('/');
}

/**
 * 确保路径以 / 开头
 */
export function ensureLeadingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * 确保路径不以 / 结尾（除非根路径）
 */
export function ensureNoTrailingSlash(path: string): string {
  return path === '/' ? path : path.replace(/\/+$/, '');
}

/**
 * 规范化路径
 */
export function normalizePath(path: string): string {
  return ensureNoTrailingSlash(ensureLeadingSlash(path));
}

/**
 * 从文件路径获取文件名
 */
export function getFileName(path: string): string {
  return path.split('/').pop() || '';
}

/**
 * 从文件路径获取目录名
 */
export function getDirName(path: string): string {
  const parts = path.split('/');
  parts.pop();
  return parts.join('/') || '/';
}