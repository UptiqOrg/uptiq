<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { SelectProjectPartial } from '$lib/db/schema';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	export let selectedProject: SelectProjectPartial | null;
	export let showProjectFormDialog: boolean;
	let name = selectedProject ? selectedProject.name : '';
	let slug = selectedProject ? selectedProject.slug : '';
	let description = selectedProject ? selectedProject.description : '';
	let formError: string;
	let loading = false;

	const handleSubmit = async (): Promise<void> => {
		loading = true;

		const url = selectedProject ? `/api/projects/${selectedProject.slug}` : '/api/projects';
		await fetch(url, {
			method: selectedProject ? 'PUT' : 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, slug, description, id: selectedProject?.id })
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data.error) formError = data.error;
				selectedProject = data.project;
			})
			.catch((err) => {
				formError = err;
			});

		showProjectFormDialog = false;
		loading = false;
	};
</script>

<form on:submit|preventDefault={handleSubmit} class="my-4 space-y-4">
	{#if formError}
		<div class="mb-4 text-left">
			<div class="flex items-center rounded-lg border border-red-400 px-4 py-2 text-red-400">
				<CircleAlert class="mr-2 h-4 w-4" />
				{formError}
			</div>
		</div>
	{/if}
	<Input label="Name" id="name" bind:value={name} required />
	<Input label="Slug" id="slug" bind:value={slug} required />
	<Textarea label="Description" id="description" bind:value={description} rows="4" />
	<Button type="submit" disabled={loading}>
		Submit
		{#if loading}
			<LoaderCircle class="ml-2 h-5 w-5 animate-spin" />
		{/if}
	</Button>
</form>
