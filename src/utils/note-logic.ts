/**
 * 统一的路径转 Slug 规则：
 * 确保全站（图谱、侧边栏、路由）的 URL 逻辑 100% 同步
 */
export function pathToSlug(filePath: string): string {
  return filePath
    .replace(/\.md$/i, '')
    .split('/')
    .map(seg =>
      seg.toLowerCase()
         .replace(/\./g, '') 
         .replace(/\s+/g, '-') 
         .replace(/[^\w\u4e00-\u9fff\u3400-\u4dbf-]/g, '') 
         .replace(/-+/g, '-')
         .replace(/^-|-$/g, '')
    )
    .join('/');
}

/**
 * 统一的标题提取逻辑：
 * 顺序：Frontmatter title -> 第一个 H1 标题 -> 文件名
 */
export function getNoteTitle(note: any): string {
  if (note.data.title) return note.data.title;
  const match = note.body?.match(/^#\s+(.+)/m);
  if (match) return match[1].trim();
  return note.id.split('/').pop()?.replace(/\.md$/, '') || 'Untitled';
}

/**
 * 过滤器：排除 Obsidian 中的附件文件夹
 */
export const isVisibleNote = (note: any) => 
  !note.id.startsWith('attachments/') && !note.id.includes('/attachments/');

/**
 * 构建目录树 (用于 DirectoryGraph)
 */
export function buildDirectoryTree(notes: any[]) {
  const dirNodes: any[] = [];
  const addedPaths = new Set();
  
  // 虚拟根节点
  dirNodes.push({ id: 'root', label: 'LiteASCII Universe', type: 'folder', parentId: null });

  notes.forEach(note => {
    const parts = note.id.split('/');
    let currentPath = '';
    let parentId = 'root';

    parts.forEach((part, i) => {
      const isFile = i === parts.length - 1;
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (!addedPaths.has(currentPath)) {
        addedPaths.add(currentPath);
        dirNodes.push({
          id: currentPath,
          label: isFile ? getNoteTitle(note) : part.replace(/\.md$/, ''),
          type: isFile ? 'file' : 'folder',
          parentId: parentId,
          href: isFile ? `/notes/${pathToSlug(note.id)}` : null
        });
      }
      parentId = currentPath;
    });
  });
  return dirNodes;
}

/**
 * 构建引用关系图 (用于 ObsidianGraph)
 */
/**
 * 构建引用关系图 - 增强匹配算法
 */
export function buildReferenceGraph(notes: any[]) {
  const nodeList = notes.map((note, i) => ({
    id: i,
    label: getNoteTitle(note),
    href: '/notes/' + pathToSlug(note.id),
  }));

  // 1. 建立索引映射
  const nameToIndex = new Map();
  notes.forEach((n, i) => {
    const rawId = n.id.replace(/\.md$/, ''); // 原始 ID，可能带点号
    const fileName = rawId.split('/').pop() || "";
    
    // 存入多种可能的匹配 key
    nameToIndex.set(fileName, i); // 原名
    nameToIndex.set(decodeURIComponent(fileName), i); // 解码名
    nameToIndex.set(pathToSlug(fileName), i); // 转换后的 Slug 名 (2.4 -> 24)
  });
  
  const edgeList: any[] = [];
  const edgeSet = new Set();

  notes.forEach((note, srcIdx) => {
    if (!note.body) return;

    // 2. 正则匹配：支持 [[Wiki]] 和 [MD](path)
    const linkRegex = /\[\[(.*?)\]\]|\[.*?\]\((.*?)\)/g;
    let match;

    while ((match = linkRegex.exec(note.body)) !== null) {
      let rawTarget = (match[1] || match[2] || '').split('#')[0].trim();
      if (!rawTarget || rawTarget.startsWith('http') || rawTarget.match(/\.(png|jpg|pdf)$/i)) continue;

      // 提取文件名并进行各种尝试匹配
      const targetFileName = rawTarget.split('/').pop()?.replace(/\.md$/, "") || "";
      let decodedTarget = targetFileName;
      try { decodedTarget = decodeURIComponent(targetFileName); } catch(e) {}

      // 尝试匹配逻辑顺序：
      // 1. 直接匹配文件名
      // 2. 匹配解码后的文件名
      // 3. 匹配经过点号处理后的文件名 (关键！)
      const targetIdx = nameToIndex.get(targetFileName) ?? 
                        nameToIndex.get(decodedTarget) ??
                        nameToIndex.get(pathToSlug(decodedTarget));

      if (targetIdx !== undefined && targetIdx !== srcIdx) {
        const edgeKey = [Math.min(srcIdx, targetIdx), Math.max(srcIdx, targetIdx)].join('-');
        if (!edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          edgeList.push({ source: srcIdx, target: targetIdx });
        }
      }
    }
  });

  return { nodes: nodeList, edges: edgeList };
}