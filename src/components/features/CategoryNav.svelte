<script lang="ts">
  interface Category {
    name: string;
    href: string;
    count: number;
  }

  interface Props {
    categories: Category[];
    current?: string;
  }

  let { categories, current }: Props = $props();
</script>

<nav class="flex flex-col gap-1">
  {#each categories as category}
    <a 
      href={category.href}
      class="flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors
        {current === category.name 
          ? 'bg-primary-faint text-primary' 
          : 'text-text-secondary hover:bg-surface hover:text-text-main'}"
    >
      <span>{category.name}</span>
      <span class="text-xs text-text-muted font-mono">{category.count}</span>
    </a>
  {/each}
</nav>