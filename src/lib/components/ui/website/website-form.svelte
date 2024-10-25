<script lang="ts">
	import { websiteStore, selectedWebsiteIdStore } from '$lib/store/website.store';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { page } from '$app/stores';

	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	export let showWebsiteFormDialog: boolean;

	let selectedWebsite = $selectedWebsiteIdStore
		? $websiteStore.get($selectedWebsiteIdStore)
		: undefined;
	let name = selectedWebsite ? selectedWebsite.name : '';
	let url = selectedWebsite ? selectedWebsite.url : '';
	let checkInterval = selectedWebsite ? selectedWebsite.checkInterval : 5;
	let formError: string;
	let loading = false;

	const checkIntervalOptions = [1, 2, 5, 10];

	const handleSubmit = async (): Promise<void> => {
		loading = true;

		const { slug } = $page.params;

		const URL = selectedWebsite ? `/api/websites/${selectedWebsite.id}` : `/api/websites/${slug}`;
		await fetch(URL, {
			method: selectedWebsite ? 'PUT' : 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, url, checkInterval: String(checkInterval) })
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data.error) {
					formError = data.error;
					return;
				} else {
					websiteStore.update((websiteMap) => {
						websiteMap.set(String(data.id), data);
						return websiteMap;
					});
				}
				showWebsiteFormDialog = false;
			})
			.catch((err) => {
				console.log(err);
				formError = 'An error occurred. Please try again later.';
			});

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
	<Input label="Url" type="url" id="url" bind:value={url} required />

	<Select.Root selected={{ value: checkInterval, label: `${checkInterval} checks / min` }}>
		<Select.Trigger label="Check Interval">
			<Select.Value placeholder="Check Interval" />
		</Select.Trigger>
		<Select.Content>
			{#each checkIntervalOptions as option}
				<Select.Item value={option}>
					<span class="mr-2">{option}</span>
					<span class="text-muted-foreground">checks / min</span>
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>

	<Button type="submit" disabled={loading}>
		Submit
		{#if loading}
			<LoaderCircle class="ml-2 h-5 w-5 animate-spin" />
		{/if}
	</Button>
</form>
