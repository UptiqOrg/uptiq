<script lang="ts">
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
</script>

<section class="h-screen w-screen">
	<Navbar />
	<main class="border-t">
		<div class="container mx-auto">
			<slot />
		</div>
	</main>
</section>
