<script>
	import '../app.css';
	import '../font.css';
	import { metaStore } from '$lib/store/meta.store';
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';

	let innerWidth = 0;

	$: metaStore.set({
		isSmallScreen: innerWidth < 768,
		showDashboardSidebar: false
	});
</script>

<svelte:window bind:innerWidth />
<svelte:head>
	<title>upTiq</title>
</svelte:head>
<Navbar />
<main class="h-screen w-screen overflow-y-auto overflow-x-hidden bg-secondary py-20">
	<div class="container mx-auto">
		<slot />
	</div>
</main>
