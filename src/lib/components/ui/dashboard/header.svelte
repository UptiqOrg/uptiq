<script lang="ts">
	export let title: string;
</script>

{#if title}
	<h1 class="my-8 text-3xl font-semibold">{title}</h1>
{/if}
