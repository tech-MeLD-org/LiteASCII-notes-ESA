/**
 * 可展开列表 Hook
 * 用于 TagCloud、CategoryNav 等需要"显示更多"功能的组件
 */

interface UseExpandableListOptions<T> {
  items: T[];
  defaultShow: number;
}

interface UseExpandableListReturn<T> {
  /** 当前显示的项 */
  displayItems: T[];
  /** 是否展开全部 */
  showAll: boolean;
  /** 是否还有更多项 */
  hasMore: boolean;
  /** 切换展开/收起 */
  toggle: () => void;
  /** 剩余未显示的数量 */
  remainingCount: number;
}

/**
 * 创建可展开列表逻辑
 * @param options - 配置项
 * @returns 展开列表的状态和方法
 */
export function useExpandableList<T>(
  options: UseExpandableListOptions<T>
): UseExpandableListReturn<T> {
  const { items, defaultShow } = options;

  let showAll = $state(false);

  const displayItems = $derived(showAll ? items : items.slice(0, defaultShow));
  const hasMore = $derived(items.length > defaultShow);
  const remainingCount = $derived(Math.max(0, items.length - defaultShow));

  function toggle() {
    showAll = !showAll;
  }

  return {
    get displayItems() {
      return displayItems;
    },
    get showAll() {
      return showAll;
    },
    get hasMore() {
      return hasMore;
    },
    toggle,
    get remainingCount() {
      return remainingCount;
    }
  };
}