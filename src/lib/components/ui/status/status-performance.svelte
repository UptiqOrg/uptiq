<script lang="ts">
	import type { SelectPartialStatus } from '$lib/db/schema';
	import { onMount } from 'svelte';

	export let statuses: SelectPartialStatus[] = [];
	let avgResponseTime = 0;

	onMount(() => {
		const total = statuses.length;
		const sum = statuses.reduce((acc, { responseTime }) => acc + (responseTime ?? 0), 0);

		avgResponseTime = total > 0 ? +(sum / total).toFixed(2) : 0;
	});
</script>

<div class="p-3">
	<h4 class="text-xs text-muted-foreground">
		<span class="inline-flex sm:hidden">Avg</span>
		<span class="hidden sm:inline-flex">Average</span>
		<span>Latency</span>
	</h4>
	<h2 class="text-xl">
		{avgResponseTime}
		<span class="text-sm">ms</span>
	</h2>
</div>
