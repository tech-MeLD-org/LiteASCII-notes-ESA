<script>
  // ── State ─────────────────────────────────────────────────────────────────
  let mobileOpen = $state(false);
  let searchOpen = $state(false);
  let searchReady = $state(false);
  let searchEl = $state(null);
  let isDark = $state(false);

  const links = [
    { href: '/',          label: 'Home'      },
    { href: '/notes',     label: 'Notes'     },
    { href: '/map',       label: 'Map'       },
    { href: '/timeline',  label: 'Timeline'  },
    { href: '/thoughts',  label: 'Thoughts'  },
    { href: '/about',     label: 'About'     },
  ];

  // ── Theme ─────────────────────────────────────────────────────────────────
  // Dark is default (no attribute). Light = data-theme="light"
  function initTheme() {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      isDark = false;
    } else {
      document.documentElement.removeAttribute('data-theme');
      isDark = true;
    }
  }

  function toggleTheme() {
    isDark = !isDark;
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  // ── Search ────────────────────────────────────────────────────────────────
  function openSearch() {
    searchOpen = true;
    // Init pagefind UI if available
    setTimeout(() => {
      if (window.__pagefind_ready && searchEl && !searchReady) {
        // @ts-ignore
        new PagefindUI({ element: searchEl, showSubResults: true, showImages: false });
        searchReady = true;
      }
    }, 80);
  }

  function closeSearch() {
    searchOpen = false;
  }

  function handleGlobalKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchOpen ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape') {
      if (searchOpen) closeSearch();
      if (mobileOpen) mobileOpen = false;
    }
  }

  import { onMount } from 'svelte';
  onMount(() => {
    initTheme();
  });
</script>

<svelte:window onkeydown={handleGlobalKey} />

<!-- ── Navigation Bar ─────────────────────────────────────────────────────── -->
<nav class="fixed top-0 left-0 right-0 z-[100] h-[52px] bg-bg/80 backdrop-blur-md border-b border-border-color">
  <div class="max-w-[1200px] mx-auto px-6 h-full flex items-center gap-8">
    <!-- Logo -->
    <a href="/" class="text-[1.05rem] font-bold text-primary tracking-wider whitespace-nowrap flex-shrink-0 hover:text-primary-light transition-colors">
      LiteASCII
    </a>

    <!-- Desktop links -->
    <ul class="hidden sm:flex list-none m-0 p-0 gap-6 flex-1">
      {#each links as link}
        <li>
          <a href={link.href} class="text-sm text-text-secondary hover:text-primary transition-colors">
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <!-- Actions -->
    <div class="flex items-center gap-1.5 ml-auto">
      <!-- Search button -->
      <button 
        class="flex items-center justify-center w-8 h-8 border border-border-color rounded-md bg-transparent text-text-secondary cursor-pointer transition-colors hover:text-primary hover:border-primary"
        onclick={openSearch} 
        aria-label="Search (⌘K)" 
        title="Search (⌘K)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </button>

      <!-- Theme toggle -->
      <button 
        class="flex items-center justify-center w-8 h-8 border border-border-color rounded-md bg-transparent text-text-secondary cursor-pointer transition-colors hover:text-primary hover:border-primary"
        onclick={toggleTheme} 
        aria-label="Toggle theme"
      >
        {#if isDark}
          <!-- Sun icon -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        {:else}
          <!-- Moon icon -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        {/if}
      </button>

      <!-- Mobile hamburger -->
      <button 
        class="flex sm:hidden items-center justify-center w-8 h-8 border border-border-color rounded-md bg-transparent text-text-secondary cursor-pointer transition-colors hover:text-primary hover:border-primary"
        onclick={() => mobileOpen = !mobileOpen} 
        aria-label="Menu"
      >
        {#if mobileOpen}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        {:else}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if mobileOpen}
    <div class="border-t border-border-color bg-bg/80 backdrop-blur-md py-3 px-6 flex flex-col gap-0.5">
      {#each links as link}
        <a 
          href={link.href} 
          class="text-sm text-text-secondary py-2 px-2 rounded hover:text-primary hover:bg-primary-faint transition-colors"
          onclick={() => mobileOpen = false}
        >
          {link.label}
        </a>
      {/each}
    </div>
  {/if}
</nav>

<!-- ── Search Modal ────────────────────────────────────────────────────────── -->
{#if searchOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div 
    class="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[10vh]"
    onclick={closeSearch}
  >
    <div 
      class="w-[min(640px,90vw)] bg-bg-card border border-border-light rounded-xl overflow-hidden shadow-2xl"
      onclick={(e) => e.stopPropagation()}
    >
      <div class="flex items-center justify-between px-4 py-3 border-b border-border-color">
        <span class="text-xs text-text-secondary font-medium">搜索文档</span>
        <span class="text-[0.7rem] text-text-muted font-mono">ESC to close</span>
      </div>
      <div bind:this={searchEl} id="pagefind-search" class="px-4 py-3"></div>
      {#if !window?.__pagefind_ready}
        <p class="px-4 py-4 text-xs text-text-muted text-center">
          搜索功能需先运行 <code class="bg-bg-secondary px-1.5 py-0.5 rounded text-primary text-[0.85em]">pnpm build</code>
        </p>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* Pagefind UI theme overrides */
  :global(.pagefind-ui) {
    --pagefind-ui-scale: 0.9;
    --pagefind-ui-primary: #e74c3c;
    --pagefind-ui-text: #e8e8e6;
    --pagefind-ui-background: transparent;
    --pagefind-ui-border: #303032;
    --pagefind-ui-tag: #1e1e20;
    --pagefind-ui-border-width: 1px;
    --pagefind-ui-border-radius: 6px;
    --pagefind-ui-font: ui-sans-serif, system-ui, sans-serif;
  }
</style>