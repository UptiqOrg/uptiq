<script lang="ts">
	import { prettifyDate } from '$lib/utils';
	import { statusColorMap } from './constants';
	import * as HoverCard from '$lib/components/ui/hover-card';

	export let statuses = [];
	const MAX_STATUSES = 50;
</script>

<div>
	<div class="mx-auto mb-2 flex w-full items-center justify-center gap-0.5">
		{#each Array(Math.max(0, MAX_STATUSES - statuses.length)).fill(undefined) as emptyStatus}
			<HoverCard.Root openDelay={100} closeDelay={0}>
				<HoverCard.Trigger
					target="_blank"
					rel="noreferrer noopener"
					class="h-14 w-[2%] rounded-md"
					style="background-color: {statusColorMap['maintenance']}"
				/>
				<HoverCard.Content class="w-fit">
					<ul class="text-sm text-muted-foreground">No data available!</ul>
				</HoverCard.Content>
			</HoverCard.Root>
		{/each}
		{#each statuses.slice(-MAX_STATUSES) as status}
			<HoverCard.Root openDelay={100} closeDelay={0}>
				<HoverCard.Trigger
					target="_blank"
					rel="noreferrer noopener"
					class="h-14 w-[2%] rounded-md"
					style="background-color: {statusColorMap[status.status]}"
				/>
				<HoverCard.Content class="w-fit">
					<ul class="text-sm text-muted-foreground">
						<li class="flex justify-between">
							Status: <span class="text-foreground">{status.status.toUpperCase()}</span>
						</li>
						<li class="flex justify-between">
							Status Code: <span class="text-foreground">{status.statusCode}</span>
						</li>
						<li class="flex justify-between">
							Response Time: <span class="ml-4 text-foreground">{status.responseTime}ms</span>
						</li>
					</ul>
				</HoverCard.Content>
			</HoverCard.Root>
		{/each}
	</div>
	<div class="flex w-full items-center justify-between text-xs">
		{#if statuses.length > 0}
			<div class="flex w-full items-center justify-between text-xs">
				<div>{prettifyDate(new Date(statuses[0].createdAt))}</div>
				{#if statuses.length > 2}
					<div>
						{prettifyDate(new Date(statuses[Math.floor((statuses.length - 1) / 2)].createdAt))}
					</div>
				{/if}
				<div>{prettifyDate(new Date(statuses[statuses.length - 1].createdAt))}</div>
			</div>
		{:else}
			<div class="text-center text-xs text-muted-foreground">No status history available</div>
		{/if}
	</div>
</div>
