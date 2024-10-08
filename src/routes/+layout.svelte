<script>
	import '../app.css';
	import '../font.css';
	import { metaStore } from '$lib/store/meta.store';

	let innerWidth = 0;

	$: metaStore.set({
		isSmallScreen: innerWidth < 1000,
		showDashboardSidebar: false
	});
</script>

<svelte:window bind:innerWidth />

<slot />
