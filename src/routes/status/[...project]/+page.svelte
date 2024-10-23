<script lang="ts">
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import StatusPageCard from '$lib/components/ui/status/status-page-card.svelte';

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
				statusPageItem.statuses &&
				statusPageItem.statuses.length > 0 &&
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
				<div class="space-y-4">
					{#each statusPageItems as statusPageItem}
						<StatusPageCard bind:statusPageItem />
					{/each}
				</div>
			{/if}
		</section>
	</main>
{/if}
