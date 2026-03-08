<script>
  export let name = "";
  // 格式化标签显示（全小写，符合极简美学）
  $: displayName = name.toLowerCase();
  // 编码 URL 防止中文标签跳转失效
  $: url = `/tags/${encodeURIComponent(name)}`;
</script>

<a href={url} class="tag-link">
  <span class="hash">#</span>{displayName}
</a>

<style>
  .tag-link {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.5rem;
    background: rgba(255, 69, 58, 0.08); /* 极淡的红背景 */
    border: 1px solid rgba(255, 69, 58, 0.2); /* 半透明红边框 */
    border-radius: 4px;
    color: var(--red, #ff453a); /* 使用全局定义的红色变量 */
    font-family: 'Courier New', monospace;
    font-size: 0.72rem;
    text-decoration: none;
    transition: all 0.2s ease;
    line-height: 1;
  }

  .tag-link:hover {
    background: rgba(255, 69, 58, 0.15);
    border-color: rgba(255, 69, 58, 0.5);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(255, 69, 58, 0.1);
  }

  .hash {
    opacity: 0.5;
    margin-right: 1px;
    font-weight: bold;
  }
</style>