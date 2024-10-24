<script lang="ts">
	import BentoGrid from '$lib/components/ui/animations/BentoGrid.svelte';
	import BentoGridItem from '$lib/components/ui/animations/BentoGridItem.svelte';
	import SparklesText from '$lib/components/ui/animations/SparklesText.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import StatusCard from '$lib/components/ui/status/status-card.svelte';
	import Auth from '$lib/components/ui/auth/auth.svelte';
	import StatusPageChart from '$lib/components/ui/status/status-page-chart.svelte';
	import { websiteStore } from '$lib/store/website.store';
	import { onDestroy, onMount } from 'svelte';

	export let data;

	onMount(() => {
		const websiteMap = new Map();
		websiteMap.set(data.website.id, data.website);
		websiteStore.set(websiteMap);
	});

	onDestroy(() => {
		websiteStore.set(new Map());
	});
</script>

<main class="relative pt-10">
	<div
		class="gradient fixed left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 scale-50"
	/>
	<section class="relative z-10 h-[calc(100vh-5rem)] w-full">
		<BentoGrid>
			<BentoGridItem className="col-span-1 sm:col-span-2 lg:col-span-1">
				<div class="w-full">
					<p class="text-2xl sm:text-3xl">Babe wake up,</p>
					<SparklesText text="Uptime Monitoring" />
					<p class="text-2xl sm:text-3xl">just got easier!</p>
				</div>
			</BentoGridItem>
			<BentoGridItem
				className="col-span-1 row-span-1 sm:col-span-2 sm:row-span-2 p-1 bg-foreground"
			>
				<img
					src="https://ucarecdn.com/2093e56b-7d0c-4e8f-9942-d285e89900e5/-/preview/1000x556/"
					class="h-full w-full rounded-lg border-2 border-foreground object-cover"
					alt=""
				/>
			</BentoGridItem>
			<BentoGridItem className="col-span-1 sm:row-span-2 p-1 bg-foreground">
				<div class="flex h-full flex-col space-y-1">
					<div class="h-full rounded-lg border-2 border-foreground bg-background p-4">
						<StatusPageChart statuses={data.statuses} />
					</div>
					<div>
						{#if data.website && data.statuses.length > 0}
							<StatusCard
								websiteId={data.website.id}
								demoStatuses={data.statuses}
								showSettings={false}
								showWebsiteFormDialog={false}
								showDeleteWebsiteDialog={false}
							/>
						{/if}
					</div>
				</div>
			</BentoGridItem>
			<BentoGridItem className="col-span-1 p-2">
				<div class="relative h-full w-full">
					<div class="absolute bottom-4 right-4 rounded-md bg-lime-300 px-4 py-2">
						Work In Progress 🚧
					</div>
					<img
						src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW83c2F3dzFuMDF5bGwwNGF3amViMngyMDVsd2pjY2d4cHh3MWtraCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZTans30ONaaIM/giphy.gif"
						class=" h-full w-full rounded-lg object-cover"
						alt=""
					/>
				</div>
			</BentoGridItem>
			<BentoGridItem className="col-span-1 p-4 h-full">
				<div class="flex h-full items-center justify-center">
					<div>
						<SparklesText text="Try it out" />
						<div class="mt-4 flex space-x-4">
							<Button class="w-full border-2" variant="outline">
								<Auth />
							</Button>
							<Button href="/status/portfolio" target="_blank" class="w-full"
								>Demo Status Page</Button
							>
						</div>
					</div>
				</div>
			</BentoGridItem>
		</BentoGrid>
	</section>
</main>

<style>
	.gradient {
		background: linear-gradient(225deg, #ff9a9e, #a18cd1, #fbc2eb, #8fd3f4, #ff9a9e);
		background-size: 100% 100%;
		filter: blur(200px);
		animation: gradientMove 15s ease infinite;
	}

	@keyframes gradientMove {
		0% {
			background-position: 0% 0%;
		}
		50% {
			background-position: 100% 100%;
		}
		100% {
			background-position: 0% 0%;
		}
	}
</style>
