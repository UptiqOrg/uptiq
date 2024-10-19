<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import Header from '$lib/components/ui/dashboard/header.svelte';
	import ProjectCard from '$lib/components/ui/project/project-card.svelte';
	import ProjectForm from '$lib/components/ui/project/project-form.svelte';
	import type { SelectProjectPartial } from '$lib/db/schema.js';

	export let data;

	let selectedProject: SelectProjectPartial | null = null;
	let showProjectFormDialog = false;

	const updateProjectsList = (selected: SelectProjectPartial | null) => {
		if (!selected) return;
		let project = data.projects.find((project) => project.id === selected.id);
		console.log(project);
	};

	$: updateProjectsList(selectedProject);
</script>

<section class="flex items-center justify-between">
	<Header title="Projects" />
	<Button
		on:click={() => {
			showProjectFormDialog = true;
			selectedProject = null;
		}}
	>
		Add Project
	</Button>
</section>
<div class="w-full columns-xs gap-4">
	{#each data.projects as project}
		<ProjectCard {project} bind:showProjectFormDialog bind:selectedProject />
	{/each}
</div>

<Dialog.Root bind:open={showProjectFormDialog}>
	<Dialog.Content>
		<Dialog.Title>Add Project</Dialog.Title>
		<Dialog.Description>
			<ProjectForm bind:selectedProject bind:showProjectFormDialog />
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>
