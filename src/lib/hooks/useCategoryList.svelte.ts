// src/lib/hooks/useCategoryList.svelte.ts
//CategoryList.svelte 自定义 hooks
export function createSidebar(config: {
  minWidth: number;
  maxWidth: number;
  defaultWidth: number;
}) {
  let width = $state(config.defaultWidth);
  let isResizing = $state(false);
  let startX = 0;
  let startWidth = 0;

  // 恢复保存的宽度
  $effect(() => {
    const saved = localStorage.getItem('sidebar-width');
    if (saved) width = parseInt(saved, 10);
  });

  const actions = {
    startResize(e: MouseEvent) {
      e.preventDefault();
      isResizing = true;
      startX = e.clientX;
      startWidth = width;
      document.body.classList.add('is-resizing');
    },

    handleMouseMove(e: MouseEvent) {
      if (!isResizing) return;
      const deltaX = e.clientX - startX;
      width = Math.min(Math.max(startWidth + deltaX, config.minWidth), config.maxWidth);
    },

    stopResize() {
      if (!isResizing) return;
      isResizing = false;
      document.body.classList.remove('is-resizing');
      localStorage.setItem('sidebar-width', width.toString());
    }
  };

  return {
    get width() { return width; },
    get isResizing() { return isResizing; },
    actions
  };
}