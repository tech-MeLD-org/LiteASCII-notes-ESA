<script lang="ts">
  import { tagSlug, categorySlug } from '../../lib/core/note-logic';

  interface Props {
    variant?: 'tag' | 'category' | 'default';
    size?: 'sm' | 'md';
    label?: string;
    href?: string;
    autoLink?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    variant = 'default',
    size = 'sm',
    label = '',
    href = '',
    autoLink = false,
    children
  }: Props = $props();

  // 修复点：Svelte 5 $derived 直接写表达式即可，不需要包裹函数
  const finalHref = $derived(
    href ? href :
    (!autoLink || !label) ? '' :
    variant === 'tag' ? `/tags/${tagSlug(label)}` :
    variant === 'category' ? `/category/${categorySlug(label)}` :
    ''
  );

  const finalClass = $derived(
    `ui-pill ${size === 'sm' ? 'ui-pill-sm' : 'ui-pill-md'} ` +
    `${variant === 'tag' ? 'ui-pill-tag' : variant === 'category' ? 'ui-pill-category' : 'ui-pill-default'}`
  );
</script>

{#if finalHref}
  <a href={finalHref} class={finalClass}>
    {#if children}
      {@render children()}
    {:else}
      {variant === 'tag' ? `#${label}` : label}
    {/if}
  </a>
{:else}
  <span class={finalClass}>
    {#if children}
      {@render children()}
    {:else}
      {variant === 'tag' ? `#${label}` : label}
    {/if}
  </span>
{/if}