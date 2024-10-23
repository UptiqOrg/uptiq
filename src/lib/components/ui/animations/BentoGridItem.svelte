<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string | undefined = undefined;
</script>

<div
	class={cn(
		'group/bento row-span-1 flex w-full flex-col justify-between space-y-4 rounded-xl border border-transparent bg-white px-6 py-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none',
		className
	)}
>
	<slot />
</div>
