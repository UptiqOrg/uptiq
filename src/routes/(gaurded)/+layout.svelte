<script lang="ts">
	import { cn } from '$lib/utils';
	import { metaStore } from '$lib/store/meta.store';
	import SideBar from '$lib/components/ui/sidebar/container.svelte';
</script>

<main
	class={cn(
		'h-screen w-screen overflow-y-auto overflow-x-hidden border-t',
		$metaStore.isSmallScreen ? '' : 'flex'
	)}
>
	<div class="container mx-auto flex px-0">
		<SideBar />
		<div class="mt-20 w-full p-4 md:ml-72 md:mt-0">
			<slot />
		</div>
	</div>
</main>
