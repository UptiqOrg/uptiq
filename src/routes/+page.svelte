<script lang="ts">
	import Logo from '$lib/components/ui/logo/logo.svelte';
	import Auth from '$lib/components/ui/auth/auth.svelte';
</script>

<main class="h-screen w-screen bg-gradient-to-t from-amber-50 to-blue-100 p-2">
	<nav class="flex h-20 w-screen place-items-center text-lg font-medium">
		<div class="container mx-auto flex items-center justify-between">
			<a href="/"><Logo /></a>
			<div>
				<Auth />
			</div>
		</div>
	</nav>
	<section
		class="flex h-[calc(100vh-6rem)] w-full place-items-center justify-center rounded-xl bg-background shadow-lg"
	>
		<div>
			<h1 class="text-7xl">Coming soon!</h1>
		</div>
	</section>
</main>
