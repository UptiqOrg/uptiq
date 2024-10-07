<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Github } from 'lucide-svelte';
</script>

<main class="h-screen w-screen bg-gradient-to-t from-amber-50 to-blue-100 p-2">
	<nav class="flex h-20 w-screen place-items-center text-lg font-medium">
		<div class="container mx-auto flex items-center justify-between">
			<a href="/">upTiq</a>
			<div>
				<Button href="/login" variant="outline">Login <Github class="ml-2 h-5 w-5" /></Button>
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
