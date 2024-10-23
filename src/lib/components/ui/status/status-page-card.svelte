<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import StatusBadge from '$lib/components/ui/status/status-badge.svelte';
	import StatusAvailability from '$lib/components/ui/status/status-availability.svelte';
	import StatusPerformance from '$lib/components/ui/status/status-performance.svelte';
	import StatusPageChart from '$lib/components/ui/status/status-page-chart.svelte';

	interface Status {
		status: string;
	}

	interface StatusPageItem {
		name: string;
		url: string;
		statuses: Status[];
	}

	export let statusPageItem: StatusPageItem;
	$: statuses = statusPageItem?.statuses ?? [];
</script>

<Card.Root class="mb-4 h-full w-full px-4 py-4 sm:px-8">
	<div class="mb-3">
		<div class="flex items-center justify-between">
			<div class="flex items-center">
				{#if statuses.length > 0}
					<StatusBadge status={statuses[statuses.length - 1].status} />
				{/if}
				<h2 class="ml-4 text-lg font-medium">
					{statusPageItem.name}
				</h2>
			</div>
			<a href={statusPageItem.url} target="_blank" class="text-xs text-muted-foreground">
				{statusPageItem.url}
			</a>
		</div>
	</div>
	<div class="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-8">
		<div class="grid w-full grid-cols-2 gap-2 divide-x rounded-lg border sm:w-1/2">
			<StatusAvailability {statuses} />
			<StatusPerformance {statuses} />
		</div>
		<div class="w-full sm:w-1/2">
			{#if statuses.length > 0}
				<StatusPageChart {statuses} />
			{:else}
				<p class="text-muted-foreground">No data available</p>
			{/if}
		</div>
	</div>
</Card.Root>
