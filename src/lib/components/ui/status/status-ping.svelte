<script lang="ts">
	import type { SelectUptimeCheck } from '$lib/db/schema';
	import { getMinutesAgo } from '$lib/utils';

	export let statuses: SelectUptimeCheck[] = [];
</script>

<div class="p-3">
	<h4 class="text-xs text-muted-foreground">Last Pinged</h4>
	<h2 class="text-xl">
		{#if statuses[statuses.length - 1].createdAt}
			{@const { time, type } = getMinutesAgo(new Date(statuses[statuses.length - 1].createdAt))}
			{time}
			<span class="text-sm">{type} ago</span>
		{/if}
	</h2>
</div>
