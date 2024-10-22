<script lang="ts">
	import { onMount } from 'svelte';
	import { projectStore, selectedProjectIdStore } from '$lib/store/project.store';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
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

{#if $projectStore === undefined}
	<p>Loading projects...</p>
{:else if $projectStore.size === 0}
	<p>No projects found. Click "Add Project" to create your first project.</p>
{:else}
	<div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each Array.from($projectStore.keys()) as projectId}
			<ProjectCard {projectId} bind:showProjectFormDialog bind:showDeleteProjectDialog />
		{/each}
	</div>
{/if}

<Dialog.Root bind:open={showProjectFormDialog}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{$selectedProjectIdStore ? 'Update' : 'Add'} Project</Dialog.Title>
			<Dialog.Description>
				{$selectedProjectIdStore
					? 'Update the details of your existing project.'
					: 'Enter the details for your new project.'}
			</Dialog.Description>
		</Dialog.Header>
		<ProjectForm bind:showProjectFormDialog />
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={showDeleteProjectDialog}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Delete Project</Dialog.Title>
			<Dialog.Description>
				Are you sure you want to delete this project? This action cannot be undone.
			</Dialog.Description>
		</Dialog.Header>
		<ProjectDelete bind:showDeleteProjectDialog />
	</Dialog.Content>
</Dialog.Root>
