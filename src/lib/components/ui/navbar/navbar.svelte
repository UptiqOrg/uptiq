<script lang="ts">
	import Logo from '$lib/components/ui/logo/logo.svelte';
	import Auth from '$lib/components/ui/auth/auth.svelte';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
</script>

<nav class="flex h-20 w-screen place-items-center text-lg font-medium">
	<div class="container mx-auto flex items-center justify-between">
		<a href="/" class={cn($page.url.pathname === '/' ? '' : 'ml-10 md:ml-0')}>
			<Logo />
		</a>
		<Auth />
	</div>
</nav>
