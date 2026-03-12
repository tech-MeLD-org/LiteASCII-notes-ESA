<script lang="ts">
  import ProfileCard from '../features/ProfileCard.svelte';
  import TagCloud from '../features/TagCloud.svelte';
  import CategoryNav from '../features/CategoryNav.svelte';
  
  interface Category {
    name: string;
    href: string;
    count: number;
  }

  interface Tag {
    name: string;
    count: number;
    href: string;
  }

  interface Props {
    // ProfileCard props
    name?: string;
    description?: string;
    avatar?: string;
    noteCount?: number;
    categoryCount?: number;
    tagCount?: number;
    // Navigation props
    categories?: Category[];
    tags?: Tag[];
    currentCategory?: string;
    currentTag?: string;
  }

  let {
    name = 'LiteASCII',
    description = '知识生长于链接之中',
    avatar = '/ProfileImage.png',
    noteCount = 0,
    categoryCount = 0,
    tagCount = 0,
    categories = [],
    tags = [],
    currentCategory,
    currentTag
  }: Props = $props();
</script>

<aside class="flex flex-col gap-6">
  <!-- Profile Card -->
  <ProfileCard 
    {name}
    {description}
    {avatar}
    {noteCount}
    {categoryCount}
    {tagCount}
  />

  <!-- Categories -->
  {#if categories.length > 0}
    <div class="bg-bg-card border border-border-color rounded-xl p-5">
      <h3 class="text-sm font-bold text-text-main mb-3 flex items-center gap-2">
        <span class="w-1 h-4 bg-primary rounded-full"></span>
        分类
      </h3>
      <CategoryNav {categories} current={currentCategory} />
    </div>
  {/if}

  <!-- Tags -->
  {#if tags.length > 0}
    <div class="bg-bg-card border border-border-color rounded-xl p-5">
      <h3 class="text-sm font-bold text-text-main mb-3 flex items-center gap-2">
        <span class="w-1 h-4 bg-primary rounded-full"></span>
        标签
      </h3>
      <TagCloud {tags} current={currentTag} />
    </div>
  {/if}
</aside>