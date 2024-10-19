<script lang="ts">
	import { onMount } from 'svelte';
	import { projectStore, selectedProjectIdStore } from '$lib/store/project.store';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { get } from 'svelte/store';
	import Header from '$lib/components/ui/dashboard/header.svelte';
	import ProjectCard from '$lib/components/ui/project/project-card.svelte';
	import ProjectForm from '$lib/components/ui/project/project-form.svelte';
	import ProjectDelete from '$lib/components/ui/project/project-delete.svelte';

	export let data;

	let showProjectFormDialog = false;
	let showDeleteProjectDialog = false;

	onMount(() => {
		if (!data.projects) return null;
		projectStore.set(data.projects);
	});
</script>

<section class="flex items-center justify-between">
	<Header title="Projects" />
	<Button
		on:click={() => {
			showProjectFormDialog = true;
			selectedProjectIdStore.set(null);
		}}
	>
		Add Project
	</Button>
</section>
<div class="w-full columns-xs gap-4">
	{#if $projectStore && $projectStore.size > 0}
		{#each $projectStore.keys() as projectId}
			<ProjectCard {projectId} bind:showProjectFormDialog bind:showDeleteProjectDialog />
		{/each}
	{:else}
		Loading projects ...
	{/if}
</div>

<Dialog.Root bind:open={showProjectFormDialog}>
	<Dialog.Content>
		<Dialog.Title>{get(selectedProjectIdStore) ? 'Update' : 'Add'} Project</Dialog.Title>
		<Dialog.Description>
			<ProjectForm bind:showProjectFormDialog />
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>
<Dialog.Root bind:open={showDeleteProjectDialog}>
	<Dialog.Content>
		<Dialog.Title>Delete Project</Dialog.Title>
		<Dialog.Description>
			<ProjectDelete bind:showDeleteProjectDialog />
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>
