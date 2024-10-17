<script lang="ts">
	import type { SelectUptimeCheck, SelectWebsiteStatusCard } from '$lib/db/schema';
	import * as Card from '$lib/components/ui/card/index.js';
	import StatusBadge from '$lib/components/ui/status/status-badge.svelte';
	import StatusChart from '$lib/components/ui/status/status-chart.svelte';
	import StatusAvailability from '$lib/components/ui/status/status-availability.svelte';
	import StatusPerformance from '$lib/components/ui/status/status-performance.svelte';
	import StatusPing from '$lib/components/ui/status/status-ping.svelte';

	export let statuses: SelectUptimeCheck[];
	export let website: SelectWebsiteStatusCard;
</script>

<Card.Root class="mb-4 inline-block w-full p-2">
	<div class="flex items-center justify-between gap-2 rounded bg-background p-3">
		<div>
			<h2 class="mr-2 text-lg font-medium">{website.name}</h2>
			<a href={website.url} target="_blank" class="text-xs text-muted-foreground"> {website.url}</a>
		</div>
		<StatusBadge status={statuses[statuses.length - 1].status} />
	</div>
	<div class="m-2 grid grid-cols-3 gap-2 divide-x rounded-lg border">
		<StatusAvailability {statuses} />
		<StatusPerformance {statuses} />
		<StatusPing {website} />
	</div>
	<div class="w-full p-4">
		<StatusChart {statuses} />
	</div>
</Card.Root>
