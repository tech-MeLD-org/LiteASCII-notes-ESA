<script lang="ts">
  interface Props {
    href?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { href, class: className = '', children }: Props = $props();

  const baseClasses = 'block bg-[#242426] border border-[#303032] rounded-xl p-6 transition-all duration-200 hover:border-[#e74c3c] hover:-translate-y-1';
</script>

{#if href}
  <a {href} class="{baseClasses} {className}">
    {@render children?.()}
  </a>
{:else}
  <div class="{baseClasses} {className}">
    {@render children?.()}
  </div>
{/if}