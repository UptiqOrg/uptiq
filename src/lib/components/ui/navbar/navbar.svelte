<script lang="ts">
	import Logo from '$lib/components/ui/logo/logo.svelte';
	import Auth from '$lib/components/ui/auth/auth.svelte';
</script>

<nav
	class="fixed z-50 flex h-20 w-screen place-items-center border-b bg-background text-lg font-medium shadow-sm"
>
	<div class="container mx-auto flex items-center justify-between">
		<a href="/">
			<Logo />
		</a>
		<Auth />
	</div>
</nav>
