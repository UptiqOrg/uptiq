<script lang="ts">
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import StatusBadge from '$lib/components/ui/status/status-badge.svelte';
	import StatusAvailability from '$lib/components/ui/status/status-availability.svelte';
	import StatusPerformance from '$lib/components/ui/status/status-performance.svelte';
	import StatusPageChart from '$lib/components/ui/status/status-page-chart.svelte';

	export let data;
	let loadingStatusPage = true;
	let statusPageItems = [];
	let operationalStatus = '';

	onMount(async () => {
		if (!data.project) return;
		statusPageItems = await fetch(`/api/status/page/${data.project.id}`)
			.then(async (response) => await response.json())
			.finally(() => {
				loadingStatusPage = false;
			});

		const total = statusPageItems.length;
		const operational = statusPageItems.filter(
			(statusPageItem) =>
				statusPageItem.statuses[statusPageItem.statuses.length - 1].status === 'up'
		).length;

		operationalStatus = `${operational} / ${total}`;
	});
</script>

{#if data.project}
	<main class="mx-auto max-w-4xl pt-10">
		<section class="mb-4 flex gap-4">
			<Card.Root class="w-2/3  px-6 py-4 sm:px-8">
				<h1 class="mb-2 text-2xl">{data.project.name}</h1>
				<p class="text-sm">{data.project.description}</p>
			</Card.Root>
			<Card.Root class="flex w-1/3 items-center justify-center px-6 py-4 sm:px-8">
				<div>
					{#if !loadingStatusPage}
						<div class="text-3xl">{operationalStatus}</div>
						<div class="text-sm text-muted-foreground">Operational</div>
					{/if}
				</div>
			</Card.Root>
		</section>
		<section>
			{#if loadingStatusPage}
				<Skeleton class="mb-4 h-40 w-full" />
				<Skeleton class="mb-4 h-40 w-full" />
				<Skeleton class="h-40 w-full" />
			{:else}
				{#each statusPageItems as statusPageItem}
					{@const statuses = statusPageItem.statuses}
					<Card.Root class="mb-4 w-full px-4 py-4 sm:px-8">
						<div class="mb-3">
							<div class="flex items-center justify-between">
								<div class="flex items-center">
									{#if statusPageItem.statuses.length > 0}
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
				{/each}
			{/if}
		</section>
	</main>
{/if}
