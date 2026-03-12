<script lang="ts">
  interface Props {
    variant?: 'tag' | 'category' | 'default';
    size?: 'sm' | 'md';
    href?: string;
    children?: import('svelte').Snippet;
  }

  let { 
    variant = 'default', 
    size = 'sm',
    href,
    children 
  }: Props = $props();

  const variantClasses = {
    tag: 'bg-[#1e1e20] text-[#565658] hover:text-[#e8e8e6] hover:bg-[#303032]',
    category: 'bg-[rgba(231,76,60,0.1)] text-[#e74c3c] hover:bg-[rgba(231,76,60,0.2)]',
    default: 'bg-[#1e1e20] text-[#a8a8a6] hover:text-[#e8e8e6] hover:bg-[#303032]',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  const baseClasses = 'inline-flex items-center gap-1 rounded font-mono transition-colors duration-150';
</script>

{#if href}
  <a {href} class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]}">
    {@render children?.()}
  </a>
{:else}
  <span class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]}">
    {@render children?.()}
  </span>
{/if}