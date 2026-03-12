<script lang="ts">
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
</script>

<div class="flex flex-wrap gap-2">
  {#each tags as tag}
    <a 
      href={tag.href} 
      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors
        {current === tag.name 
          ? 'bg-primary text-white' 
          : 'bg-surface text-text-secondary hover:bg-border-color hover:text-text-main'}"
    >
      <span class="text-text-muted">#</span>
      {tag.name}
      <span class="text-xs text-text-muted font-mono ml-0.5">{tag.count}</span>
    </a>
  {/each}
</div>
