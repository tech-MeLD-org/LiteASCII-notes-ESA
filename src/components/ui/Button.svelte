<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onclick?: () => void;
    children?: import('svelte').Snippet;
  }

  let { 
    variant = 'primary', 
    size = 'md',
    href,
    onclick,
    children 
  }: Props = $props();

  const variantClasses = {
    primary: 'bg-[#e74c3c] text-white hover:bg-[#ff6b5b]',
    secondary: 'bg-[#1e1e20] text-[#e8e8e6] border border-[#303032] hover:border-[#e74c3c]',
    ghost: 'bg-transparent text-[#a8a8a6] hover:text-[#e8e8e6]',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150';
</script>

{#if href}
  <a {href} class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]}">
    {@render children?.()}
  </a>
{:else}
  <button {onclick} class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]}">
    {@render children?.()}
  </button>
{/if}