<script lang="ts">
  interface Props {
    title: string;
    href: string;
    date?: string;
    description?: string;
    category?: string;
    tags?: string[];
  }

  let { 
    title, 
    href, 
    date, 
    description, 
    category, 
    tags = [] 
  }: Props = $props();
</script>

<a {href} class="block bg-[#242426] border border-[#303032] rounded-xl p-5 transition-all duration-200 hover:border-[#e74c3c] hover:-translate-y-1 group">
  {#if date}
    <time class="text-xs text-[#565658] font-mono block mb-2">{date}</time>
  {/if}
  
  <h3 class="text-lg font-semibold text-[#e8e8e6] mb-2 group-hover:text-[#e74c3c] transition-colors">
    {title}
  </h3>
  
  {#if description}
    <p class="text-sm text-[#a8a8a6] line-clamp-2 mb-3">{description}</p>
  {/if}
  
  <div class="flex items-center gap-2 flex-wrap mt-auto">
    {#if category}
      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-[rgba(231,76,60,0.1)] text-[#e74c3c]">
        {category}
      </span>
    {/if}
    
    {#each tags.slice(0, 3) as tag}
      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-[#1e1e20] text-[#565658]">
        #{tag}
      </span>
    {/each}
    
    {#if tags.length > 3}
      <span class="text-xs text-[#565658] font-mono">+{tags.length - 3}</span>
    {/if}
  </div>
</a>