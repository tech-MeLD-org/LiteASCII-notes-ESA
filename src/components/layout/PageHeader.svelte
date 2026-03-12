<script lang="ts">
  interface Props {
    title: string;
    subtitle?: string;
  }

  let { title, subtitle }: Props = $props();
</script>

<header class="border-l-4 border-[#e74c3c] pl-4 py-2 mb-8">
  <h1 class="text-3xl font-extrabold tracking-tight text-[#e8e8e6] mb-1">
    {title}
  </h1>
  {#if subtitle}
    <p class="text-sm text-[#565658] font-mono">
      {subtitle}
    </p>
  {/if}
</header>