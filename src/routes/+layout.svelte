<script>
	import '../app.css';
	import '../font.css';
	import { dev } from '$app/environment';
	import { metaStore } from '$lib/store/meta.store';
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import { inject } from '@vercel/analytics';

	let innerWidth = 0;
	inject({ mode: dev ? 'development' : 'production' });

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
<main class="h-screen w-screen overflow-y-auto overflow-x-hidden">
	<div class="container mx-auto py-20">
		<slot />
	</div>
</main>
