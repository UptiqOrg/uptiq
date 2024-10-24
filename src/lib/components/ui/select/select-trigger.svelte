<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { cn } from '$lib/utils.js';

	type $$Props = SelectPrimitive.TriggerProps & {
		label: string;
	};
	type $$Events = SelectPrimitive.TriggerEvents;

	let defaultClasses =
		'bg-secondary px-4 py-2 w-full focus-within:border-ring border-2 border-input ring-offset-background focus-visible:ring-ring aria-[invalid]:border-destructive data-[placeholder]:[&>span]:text-muted-foreground  w-full text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1';
	let className: $$Props['class'] = undefined;
	export let label: string;
	export { className as class };
</script>

<SelectPrimitive.Trigger
	class={cn(defaultClasses, className)}
	{...$$restProps}
	let:builder
	on:click
	on:keydown
>
	<div class="mb-1 text-left text-xs font-semibold text-muted-foreground">
		{label}
		<span class="text-red-500">
			{#if $$restProps['required']}*{/if}
		</span>
	</div>
	<div class="flex items-center justify-between">
		<slot {builder} />
		<div>
			<ChevronDown class="h-4 w-4 opacity-50 " />
		</div>
	</div>
</SelectPrimitive.Trigger>
