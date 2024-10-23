<script lang="ts">
	import GitHub from 'lucide-svelte/icons/github';
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { page } from '$app/stores';
</script>

<div class="flex items-center">
	{#if $page.data.session}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					size="lg"
					variant="ghost"
					builders={[builder]}
					class="relative h-12 w-full justify-between rounded-full bg-background px-2"
				>
					<p class="ml-2 mr-4 text-sm font-medium leading-none">
						{$page.data.session.user?.username}
					</p>
					<Avatar.Root class="h-9 w-9">
						<Avatar.Image
							src={$page.data.session.user?.image}
							alt="@{$page.data.session.user?.name}"
						/>
						<Avatar.Fallback>{($page.data.session.user?.name ?? '')[0]}</Avatar.Fallback>
					</Avatar.Root>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="end">
				<DropdownMenu.Label class="font-normal">
					<div class="flex flex-col space-y-1">
						<p class="text-sm font-medium leading-none">{$page.data.session.user?.name}</p>
						<p class="text-xs leading-none text-muted-foreground">
							{$page.data.session.user?.email}
						</p>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item href="/projects">Projects</DropdownMenu.Item>
					<DropdownMenu.Item>Settings</DropdownMenu.Item>
					<DropdownMenu.Item>Help</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<SignOut>
						<div slot="submitButton" class="buttonPrimary">Sign out</div>
					</SignOut>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{:else}
		<SignIn options={{ redirectTo: '/projects' }} signInPage="signin" />
	{/if}
</div>
