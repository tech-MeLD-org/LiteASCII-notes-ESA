<script lang="ts">
  import { tagSlug, categorySlug } from '../../lib/core/note-logic';

  interface Props {
    variant?: 'tag' | 'tag-active' | 'category' | 'category-active' | 'default';
    size?: 'sm' | 'md';
    label?: string;
    href?: string;
    autoLink?: boolean;
    /** 自定义颜色（行内样式优先级最高） */
    color?: string;
    children?: import('svelte').Snippet;
  }

  let {
    variant = 'default',
    size = 'sm',
    label = '',
    href = '',
    autoLink = false,
    color = '',
    children
  }: Props = $props();

  const finalHref = $derived(
    href ? href :
    (!autoLink || !label) ? '' :
    variant === 'tag' ? `/tags/${tagSlug(label)}` :
    variant === 'category' ? `/category/${categorySlug(label)}` :
    ''
  );

  const finalClass = $derived(
    `ui-pill ${size === 'sm' ? 'ui-pill-sm' : 'ui-pill-md'} ` +
    `${variant === 'tag' || variant === 'tag-active' ? 'ui-pill-tag' : 
      variant === 'category' || variant === 'category-active' ? 'ui-pill-category' : 
      'ui-pill-default'}` +
    `${variant === 'tag-active' ? ' ui-pill-tag-active' : 
      variant === 'category-active' ? ' ui-pill-category-active' : ''}`
  );

  // 自定义颜色生成 style 属性
  const customStyle = $derived(color ? `color: ${color}` : '');
</script>

{#if finalHref}
  <a href={finalHref} class={finalClass} style={customStyle}>
    {#if children}
      {@render children()}
    {:else}
      {variant === 'tag' || variant === 'tag-active' ? `#${label}` : label}
    {/if}
  </a>
{:else}
  <span class={finalClass} style={customStyle}>
    {#if children}
      {@render children()}
    {:else}
      {variant === 'tag' || variant === 'tag-active' ? `#${label}` : label}
    {/if}
  </span>
{/if}
