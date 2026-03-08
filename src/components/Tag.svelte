<script>
  export let name = "";
  export let active = false;
</script>

<a 
  href={`/tags/${name}`} 
  class="tag" 
  class:active={active}
>
  #{name}
</a>

<style>
  .tag {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.5rem;
    background: var(--bg-2, #1a1a1a);
    border: 1px solid var(--border, #333);
    border-radius: 4px;
    font-size: 0.75rem;
    font-family: 'Courier New', monospace;
    color: var(--text-2, #aaa);
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .tag:hover {
    border-color: var(--red, #ff4d4d);
    color: var(--red, #ff4d4d);
    background: var(--red-faint, rgba(255, 77, 77, 0.1));
    transform: translateY(-1px);
  }

  .tag.active {
    background: var(--red, #ff4d4d);
    color: white;
    border-color: var(--red, #ff4d4d);
  }
</style>