import Users from 'lucide-svelte/icons/users';
import ChartLine from 'lucide-svelte/icons/chart-line';
import LayoutDashboard from 'lucide-svelte/icons/layout-dashboard';
import WalletCards from 'lucide-svelte/icons/wallet-cards';

export const navLinks = [
	{
		title: 'Dashboard',
		href: '/dashboard',
		icon: LayoutDashboard
	},
	{
		title: 'Projects',
		href: '/projects',
		icon: WalletCards
	},
	{
		title: 'Analytics',
		href: '/analytics',
		icon: ChartLine
	},
	{
		title: 'Subscribers',
		href: '/subscribers',
		icon: Users
	}
];
