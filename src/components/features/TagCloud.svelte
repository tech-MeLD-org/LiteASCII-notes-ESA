<script lang="ts">
  import { useExpandableList } from '../../lib/hooks/useExpandableList.svelte';

  interface Tag {
    name: string;
    count: number;
    href: string;
  }

  interface Props {
    tags: Tag[];
    current?: string;
  }

  let { tags, current }: Props = $props();

  const expandable = useExpandableList({ 
    items: tags, 
    defaultShow: 10
  });
</script>

<div class="flex flex-wrap gap-2">
  {#each expandable.displayItems as tag}
    {@const isActive = current === tag.name}
    <a 
      href={tag.href} 
      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors
        {isActive
          ? 'bg-[var(--color-primary)] text-white font-semibold' 
          : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] hover:text-[var(--color-text)]'}"
    >
      <span class="text-[var(--color-text-muted)]">#</span>
      {tag.name}
      <span class="text-xs text-[var(--color-text-muted)] font-mono ml-0.5">{tag.count}</span>
    </a>
  {/each}
  
  {#if expandable.hasMore}
    <button 
      onclick={expandable.toggle}
      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors
             bg-[var(--color-bg-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-border)] font-medium"
    >
      {expandable.showAll ? '收起 ↑' : `+${expandable.remainingCount} 更多 ↓`}
    </button>
  {/if}
</div>