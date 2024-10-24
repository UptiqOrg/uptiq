<script lang="ts">
	import { projectStore, selectedProjectIdStore } from '$lib/store/project.store';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
	import DotPattern from '$lib/components/ui/animations/DotPattern.svelte';

	export let projectId: string;
	export let showProjectFormDialog: boolean;
	export let showDeleteProjectDialog: boolean;
</script>

{#if projectId}
	{@const project = $projectStore.get(projectId)}
	{#if project}
		<a href="/projects/{project.slug}">
			<Card.Root class="relative inline-block w-full">
				<div class="p-4">
					<div class="z-10 mb-3 whitespace-pre-wrap text-xl font-medium">{project.name}</div>
					<p class="text-sm">{project.description}</p>

					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								size="icon"
								variant="ghost"
								class="absolute right-2 top-2 h-8 w-8"
							>
								<EllipsisVertical class="h-3.5 w-3.5" />
								<span class="sr-only">More</span>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Item
								on:click={() => {
									showProjectFormDialog = true;
									selectedProjectIdStore.set(String(project.id));
								}}
							>
								Edit
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item
								on:click={() => {
									showDeleteProjectDialog = true;
								}}
							>
								Delete
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
				<a
					target="_blank"
					href="/status/{project.slug}"
					class="flex w-full items-center justify-between border-t-2 border-foreground bg-secondary"
				>
					<span class="px-2 text-sm text-muted-foreground"
						>uptic.vercel.app/status/{project.slug}</span
					>
					<Button class="h-8 w-8" size="icon">
						<ArrowUpRight class="h-3.5 w-3.5" strokeWidth={3} />
					</Button>
				</a>
				<DotPattern
					width={20}
					height={20}
					cx={10}
					cy={10}
					cr={1}
					class="[mask-image:linear-gradient(to_top_left,white,transparent,transparent)]"
				/>
			</Card.Root>
		</a>
	{/if}
{/if}
