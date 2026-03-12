<script lang="ts">
  interface Props {
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    children: any;
  }

  let { 
    variant = 'default', 
    size = 'md',
    children 
  }: Props = $props();

  const variantClasses = {
    default: 'bg-surface text-text-secondary',
    primary: 'bg-primary-faint text-primary',
    success: 'bg-green-900/30 text-green-400',
    warning: 'bg-yellow-900/30 text-yellow-400',
    error: 'bg-red-900/30 text-red-400',
  };

  const sizeClasses = {
    sm: 'text-[0.65rem] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-sm px-2.5 py-1',
  };
</script>

<span class="inline-flex items-center font-medium rounded {variantClasses[variant]} {sizeClasses[size]}">
  {@render children()}
</span>