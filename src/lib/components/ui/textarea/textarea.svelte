<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	let defaultClasses = 'bg-secondary px-4 py-2 rounded-md w-full focus-within:border-ring border-2';

	export let value: HTMLTextareaAttributes['value'] = undefined;
	export let label: string = '';
	export { className as class };
</script>

<div class={cn(defaultClasses)}>
	<div class="text-xs font-semibold text-muted-foreground">
		{label}
		<span class="text-red-500">
			{#if $$restProps['required']}
				*
			{/if}
		</span>
	</div>
	<textarea
		class={cn('w-full bg-transparent text-sm outline-none ring-0', className)}
		bind:value
		on:blur
		on:change
		on:click
		on:focus
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:paste
		on:input
		{...$$restProps}
	/>
</div>
