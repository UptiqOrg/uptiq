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
				{#if $page.url.pathname !== '/'}
					<Button
						size="lg"
						variant="outline"
						builders={[builder]}
						class="relative w-full justify-between px-3 py-2"
					>
						<div class="flex flex-col space-y-1 text-left">
							<p class="text-sm font-medium leading-none">{$page.data.session.user?.name}</p>
							<p class="text-xs leading-none text-muted-foreground">
								{$page.data.session.user?.email}
							</p>
						</div>
						<Avatar.Root class="h-9 w-9">
							<Avatar.Image
								src={$page.data.session.user?.image}
								alt="@{$page.data.session.user?.name}"
							/>
							<Avatar.Fallback>{($page.data.session.user?.name ?? '')[0]}</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				{:else}
					<Button builders={[builder]} variant="ghost" size="icon" class="rounded-full">
						<Avatar.Root class="h-10 w-10">
							<Avatar.Image
								src={$page.data.session.user?.image}
								alt="@{$page.data.session.user?.name}"
							/>
							<Avatar.Fallback>{($page.data.session.user?.name ?? '')[0]}</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				{/if}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="end">
				<DropdownMenu.Group>
					<DropdownMenu.Item href="/dashboard">Dashboard</DropdownMenu.Item>
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
		<Button variant="outline">
			<SignIn
				options={{
					redirectTo: $page.data.redirectTo
						? `/${decodeURIComponent($page.data.redirectTo).slice(1)}`
						: `/dashboard`
				}}
			/>
			<GitHub class="ml-2 h-5 w-5" />
		</Button>
	{/if}
</div>
