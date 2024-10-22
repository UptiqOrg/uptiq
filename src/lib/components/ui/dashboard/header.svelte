<script lang="ts">
	export let title: string;
</script>

{#if title}
	<h1 class="my-8 text-3xl font-medium">{title}</h1>
{/if}
