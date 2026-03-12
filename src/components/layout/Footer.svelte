<script>
  const year = new Date().getFullYear();
</script>

<footer class="border-t border-border-color bg-bg-secondary mt-16 py-8 px-6">
  <div class="max-w-[1200px] mx-auto flex items-center justify-between gap-4 flex-wrap">
    <div class="flex-1 min-w-[160px]">
      <a href="/" class="text-[0.95rem] font-bold text-primary tracking-wider hover:text-primary-light transition-colors">
        LiteASCII
      </a>
      <p class="text-xs text-text-muted mt-1 font-mono">知识生长于链接之中</p>
    </div>

    <p class="text-[0.72rem] text-text-muted font-mono">© {year} · Built with Astro & Svelte</p>
  </div>
</footer>