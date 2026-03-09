<script>
  import { pathToSlug } from '../utils/note-logic';
  let { allNotes = [], currentSlug = "" } = $props();

  // 树状逻辑保持不变
  function buildTree(notes) {
    const root = { name: 'root', children: {}, files: [] };
    notes.forEach(note => {
      const parts = note.id.split('/');
      const fileName = parts.pop();
      let current = root;
      parts.forEach(dir => {
        if (!current.children[dir]) current.children[dir] = { name: dir, children: {}, files: [] };
        current = current.children[dir];
      });
      current.files.push({ name: note.data.title || fileName.replace(/\.md$/, ''), slug: pathToSlug(note.id) });
    });
    return root;
  }
  const tree = $derived(buildTree(allNotes));
</script>

<aside class="explorer-sidebar">
  <div class="sidebar-inner">
    <div class="sidebar-label">EXPLORER</div>
    <div class="tree-root">
      {#snippet renderNode(node, depth = 0)}
        {#each Object.values(node.children) as child}
          <details open style="--depth: {depth}">
            <summary class="folder-label"><span>󱏒</span> {child.name}</summary>
            {@render renderNode(child, depth + 1)}
          </details>
        {/each}
        {#each node.files as file}
          <a href={`/notes/${file.slug}`} class="tree-file" class:active={currentSlug === file.slug} style="--depth: {depth}">
            <span></span> {file.name}
          </a>
        {/each}
      {/snippet}
      {@render renderNode(tree)}
    </div>
  </div>
</aside>

<style>
  .explorer-sidebar { width: 260px; height: 100%; border-right: 1px solid var(--border); }
  .sidebar-inner { position: sticky; top: var(--nav-h); padding: 2rem 1rem; max-height: calc(100vh - var(--nav-h)); overflow-y: auto; }
  .sidebar-label { font-size: 0.7rem; font-weight: 700; color: var(--text-3); margin-bottom: 1rem; letter-spacing: 0.1em; }
  .folder-label, .tree-file { display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.6rem; font-size: 0.85rem; color: var(--text-2); border-radius: 4px; text-decoration: none; cursor: pointer; }
  .folder-label:hover, .tree-file:hover { background: var(--bg-2); }
  .tree-file.active { background: var(--red-faint); color: var(--red); font-weight: 600; }
  .folder-label { padding-left: calc(var(--depth) * 1rem + 0.5rem); }
  .tree-file { padding-left: calc(var(--depth) * 1rem + 1.5rem); }
  summary { list-style: none; }
  summary::-webkit-details-marker { display: none; }
</style>