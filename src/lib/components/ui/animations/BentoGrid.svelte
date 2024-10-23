<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string | undefined = undefined;
</script>

<div
	class={cn(
		'grid grid-cols-1  gap-4 sm:grid-cols-1 md:auto-rows-[15.4rem] md:grid-cols-1 lg:grid-cols-3 ',
		className
	)}
>
	<slot />
</div>
