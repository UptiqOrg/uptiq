<script lang="ts">
	import type { SelectPartialStatus } from '$lib/db/schema';
	import { selectedWebsiteIdStore, websiteStore } from '$lib/store/website.store';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import StatusBadge from '$lib/components/ui/status/status-badge.svelte';
	import StatusChart from '$lib/components/ui/status/status-chart.svelte';
	import StatusAvailability from '$lib/components/ui/status/status-availability.svelte';
	import StatusPerformance from '$lib/components/ui/status/status-performance.svelte';
	import StatusPing from '$lib/components/ui/status/status-ping.svelte';
	import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
	import { onMount } from 'svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	export let websiteId: string;
	export let showWebsiteFormDialog: boolean;
	export let showDeleteWebsiteDialog: boolean;

	let statuses: SelectPartialStatus[] = [];
	let loadingStatuses = true;

	onMount(async () => {
		if (!websiteId) return;

		statuses = await fetch(`/api/status/${websiteId}`).then((response) => response.json());

		loadingStatuses = false;
	});
</script>

{#if websiteId}
	{@const website = $websiteStore.get(websiteId)}
	{#if website}
		<Card.Root class="inline-block w-full p-2">
			<div class="flex items-center justify-between gap-2 rounded bg-background p-3">
				<div>
					<h2 class="mr-2 text-lg font-medium">{website.name}</h2>
					<a href={website.url} target="_blank" class="text-xs text-muted-foreground">
						{website.url}</a
					>
				</div>
				<div class="flex items-center space-x-4">
					{#if statuses.length > 0}
						<StatusBadge status={statuses[statuses.length - 1].status} />
					{/if}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button builders={[builder]} size="icon" variant="ghost" class="h-8 w-8">
								<EllipsisVertical class="h-3.5 w-3.5" />
								<span class="sr-only">More</span>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Item
								on:click={() => {
									showWebsiteFormDialog = true;
									selectedWebsiteIdStore.set(websiteId);
								}}>Edit</DropdownMenu.Item
							>
							<DropdownMenu.Item disabled={true}>Pause (coming soon)</DropdownMenu.Item>
							<DropdownMenu.Item disabled={true}>Alerts (coming soon)</DropdownMenu.Item>
							<DropdownMenu.Item disabled={true}>Subscribers (coming soon)</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item
								on:click={() => {
									showDeleteWebsiteDialog = true;
									selectedWebsiteIdStore.set(websiteId);
								}}>Delete</DropdownMenu.Item
							>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
			<div class="m-2 grid grid-cols-3 gap-2 divide-x rounded-lg border">
				{#if !loadingStatuses}
					<StatusAvailability {statuses} />
				{:else}
					<div />
				{/if}
				{#if !loadingStatuses}
					<StatusPerformance {statuses} />
				{:else}
					<div />
				{/if}
				<StatusPing {website} />
			</div>
			<div class="flex h-44 w-full items-center justify-center p-4">
				{#if statuses.length > 0}
					<div class="h-full w-full">
						<StatusChart {statuses} />
					</div>
				{:else}
					<p class="text-muted-foreground">No data available</p>
				{/if}
			</div>
		</Card.Root>
	{/if}
{/if}
