<script lang="ts">
	import { cn } from '$lib/utils';

	const baseClasses = {
		layout: 'row-span-1 flex w-full flex-col justify-between space-y-4',
		appearance: 'rounded-xl border border-transparent bg-white px-6 py-4',
		interactions: 'group/bento shadow-input transition duration-200 hover:shadow-xl'
	};

	export let className: string | undefined = undefined;
</script>

<div class={cn(Object.values(baseClasses).join(' '), className)}>
	<slot />
</div>
