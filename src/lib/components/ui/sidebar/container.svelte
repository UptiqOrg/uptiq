<script lang="ts">
	import { page } from '$app/stores';
	import { metaStore } from '$lib/store/meta.store';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button';
	import Sidebar from '$lib/components/ui/sidebar/sidebar.svelte';
	import Logo from '$lib/components/ui/logo/logo.svelte';
	import AlignLeft from 'lucide-svelte/icons/align-left';

	page.subscribe(() => {
		$metaStore.showDashboardSidebar = false;
	});
</script>

{#if $metaStore.isSmallScreen}
	<div class="fixed left-4 top-4 flex items-center gap-3">
		<Sheet.Root bind:open={$metaStore.showDashboardSidebar}>
			<Sheet.Trigger asChild let:builder>
				<Button variant="secondary" builders={[builder]} size="icon" class="h-11 w-11 rounded-full">
					<AlignLeft class="h-5 w-5" />
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left" class="w-screen p-0">
				<Sidebar />
			</Sheet.Content>
		</Sheet.Root>
		<Logo />
	</div>
{:else}
	<nav class="fixed bg-background md:w-72">
		<Sidebar />
	</nav>
{/if}
