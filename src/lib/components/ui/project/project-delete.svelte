<script lang="ts">
	import type { SelectProjectPartial } from '$lib/db/schema';
	import { Button } from '$lib/components/ui/button';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	export let project: SelectProjectPartial;
	export let showDeleteProjectDialog: boolean;
	let loading = false;

	const deleteProject = async () => {
		loading = true;
		await fetch(`/api/projects/${project.slug}`, { method: 'DELETE' }).then(() => {
			showDeleteProjectDialog = false;
		});
		loading = false;
	};
</script>

<div>
	<div class="mb-4">
		Are you sure you want to delete the project - {project.name} ({project.slug})?
	</div>
	<Button variant="destructive" on:click={deleteProject}>
		Confirm
		{#if loading}
			<LoaderCircle class="ml-2 h-5 w-5 animate-spin" />
		{/if}
	</Button>
</div>
