<script>
  export let data; // 接收 Astro 传来的 categories 和 tags
</script>

<div class="sidebar-stack">
  <section class="fuwari-card profile">
    <div class="avatar shadow-md">
      <img src="/favicon.svg" alt="LiteASCII" />
    </div>
    <h2 class="text-lg font-bold">LiteASCII</h2>
    <p class="text-sm opacity-60">探索知识的边界</p>
  </section>

  <section class="fuwari-card">
    <div class="header">Categories</div>
    {#each Object.entries(data.categories) as [name, count]}
      <div class="item">
        <span>{name}</span>
        <span class="badge">{count}</span>
      </div>
    {/each}
  </section>

  <section class="fuwari-card">
    <div class="header">Tags</div>
    <div class="tag-cloud">
      {#each Object.entries(data.tags) as [tag]}
        <span class="static-tag">#{tag}</span>
      {/each}
    </div>
  </section>
</div>

<style>
  .fuwari-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 1rem;
    padding: 1.25rem;
  }
  .static-tag {
    color: var(--red); /* 使用你的主题强调色 */
    background: rgba(var(--red-rgb), 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 0.4rem;
    font-size: 0.85rem;
    cursor: default; /* 明确非交互 */
  }
  /* ... */
</style>