<script lang="ts">
	import StatusCard from '$lib/components/ui/status/status-card.svelte';
	import Header from '$lib/components/ui/dashboard/header.svelte';
	import type { SelectWebsiteStatusCard, SelectUptimeCheck } from '$lib/db/schema';

	let data = [
		{
			website: {
				id: 1,
				name: 'Portfolio',
				url: 'https://aritra1999.github.io',
				checkInterval: 5
			},
			statuses: [
				{
					id: 1,
					status: 'up',
					createdAt: '2023-06-01 08:00:00',
					responseTime: 105,
					statusCode: 200
				},
				{
					id: 2,
					status: 'up',
					createdAt: '2023-06-01 08:15:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 3,
					status: 'up',
					createdAt: '2023-06-01 08:30:00',
					responseTime: 125,
					statusCode: 200
				},
				{
					id: 4,
					status: 'up',
					createdAt: '2023-06-01 08:45:00',
					responseTime: 112,
					statusCode: 200
				},
				{
					id: 5,
					status: 'up',
					createdAt: '2023-06-01 09:00:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 6,
					status: 'up',
					createdAt: '2023-06-01 09:15:00',
					responseTime: 108,
					statusCode: 200
				},
				{
					id: 7,
					status: 'up',
					createdAt: '2023-06-01 09:30:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 8,
					status: 'up',
					createdAt: '2023-06-01 09:45:00',
					responseTime: 115,
					statusCode: 200
				},
				{
					id: 9,
					status: 'up',
					createdAt: '2023-06-01 10:00:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 10,
					status: 'up',
					createdAt: '2023-06-01 10:15:00',
					responseTime: 107,
					statusCode: 200
				},
				{
					id: 11,
					status: 'up',
					createdAt: '2023-06-01 10:30:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 12,
					status: 'up',
					createdAt: '2023-06-01 10:45:00',
					responseTime: 110,
					statusCode: 200
				},
				{
					id: 13,
					status: 'up',
					createdAt: '2023-06-01 11:00:00',
					responseTime: 128,
					statusCode: 200
				},
				{
					id: 14,
					status: 'up',
					createdAt: '2023-06-01 11:15:00',
					responseTime: 113,
					statusCode: 200
				},
				{
					id: 15,
					status: 'up',
					createdAt: '2023-06-01 11:30:00',
					responseTime: 125,
					statusCode: 200
				},
				{
					id: 16,
					status: 'up',
					createdAt: '2023-06-01 11:45:00',
					responseTime: 109,
					statusCode: 200
				},
				{
					id: 17,
					status: 'up',
					createdAt: '2023-06-01 12:00:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 18,
					status: 'up',
					createdAt: '2023-06-01 12:15:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 19,
					status: 'up',
					createdAt: '2023-06-01 12:30:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 20,
					status: 'up',
					createdAt: '2023-06-01 12:45:00',
					responseTime: 106,
					statusCode: 200
				},
				{
					id: 21,
					status: 'up',
					createdAt: '2023-06-01 13:00:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 22,
					status: 'up',
					createdAt: '2023-06-01 13:15:00',
					responseTime: 114,
					statusCode: 200
				},
				{
					id: 23,
					status: 'up',
					createdAt: '2023-06-01 13:30:00',
					responseTime: 129,
					statusCode: 200
				},
				{
					id: 24,
					status: 'up',
					createdAt: '2023-06-01 13:45:00',
					responseTime: 108,
					statusCode: 200
				},
				{
					id: 25,
					status: 'up',
					createdAt: '2023-06-01 14:00:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 26,
					status: 'up',
					createdAt: '2023-06-01 14:15:00',
					responseTime: 110,
					statusCode: 200
				},
				{
					id: 27,
					status: 'up',
					createdAt: '2023-06-01 14:30:00',
					responseTime: 122,
					statusCode: 200
				},
				{
					id: 28,
					status: 'up',
					createdAt: '2023-06-01 14:45:00',
					responseTime: 107,
					statusCode: 200
				},
				{
					id: 29,
					status: 'up',
					createdAt: '2023-06-01 15:00:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 30,
					status: 'up',
					createdAt: '2023-06-01 15:15:00',
					responseTime: 109,
					statusCode: 200
				},
				{
					id: 1,
					status: 'up',
					createdAt: '2023-06-01 08:00:00',
					responseTime: 105,
					statusCode: 200
				},
				{
					id: 2,
					status: 'up',
					createdAt: '2023-06-01 08:15:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 3,
					status: 'up',
					createdAt: '2023-06-01 08:30:00',
					responseTime: 125,
					statusCode: 200
				},
				{
					id: 4,
					status: 'up',
					createdAt: '2023-06-01 08:45:00',
					responseTime: 112,
					statusCode: 200
				},
				{
					id: 5,
					status: 'up',
					createdAt: '2023-06-01 09:00:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 6,
					status: 'up',
					createdAt: '2023-06-01 09:15:00',
					responseTime: 108,
					statusCode: 200
				},
				{
					id: 7,
					status: 'up',
					createdAt: '2023-06-01 09:30:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 8,
					status: 'up',
					createdAt: '2023-06-01 09:45:00',
					responseTime: 115,
					statusCode: 200
				},
				{
					id: 9,
					status: 'up',
					createdAt: '2023-06-01 10:00:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 10,
					status: 'up',
					createdAt: '2023-06-01 10:15:00',
					responseTime: 107,
					statusCode: 200
				},
				{
					id: 11,
					status: 'up',
					createdAt: '2023-06-01 10:30:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 12,
					status: 'up',
					createdAt: '2023-06-01 10:45:00',
					responseTime: 110,
					statusCode: 200
				},
				{
					id: 13,
					status: 'up',
					createdAt: '2023-06-01 11:00:00',
					responseTime: 128,
					statusCode: 200
				},
				{
					id: 14,
					status: 'up',
					createdAt: '2023-06-01 11:15:00',
					responseTime: 113,
					statusCode: 200
				},
				{
					id: 15,
					status: 'up',
					createdAt: '2023-06-01 11:30:00',
					responseTime: 125,
					statusCode: 200
				},
				{
					id: 16,
					status: 'up',
					createdAt: '2023-06-01 11:45:00',
					responseTime: 109,
					statusCode: 200
				},
				{
					id: 17,
					status: 'up',
					createdAt: '2023-06-01 12:00:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 18,
					status: 'up',
					createdAt: '2023-06-01 12:15:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 19,
					status: 'up',
					createdAt: '2023-06-01 12:30:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 20,
					status: 'up',
					createdAt: '2023-06-01 12:45:00',
					responseTime: 106,
					statusCode: 200
				}
			]
		},
		{
			website: {
				id: 2,
				name: 'Goolg',
				url: 'https://google.com',
				checkInterval: 10
			},
			statuses: [
				{
					id: 1,
					status: 'up',
					createdAt: '2023-06-02 08:00:00',
					responseTime: 103,
					statusCode: 200
				},
				{
					id: 2,
					status: 'up',
					createdAt: '2023-06-02 08:15:00',
					responseTime: 118,
					statusCode: 200
				},
				{
					id: 3,
					status: 'up',
					createdAt: '2023-06-02 08:30:00',
					responseTime: 127,
					statusCode: 200
				},
				{
					id: 4,
					status: 'up',
					createdAt: '2023-06-02 08:45:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 5,
					status: 'up',
					createdAt: '2023-06-02 09:00:00',
					responseTime: 110,
					statusCode: 200
				},
				{
					id: 6,
					status: 'up',
					createdAt: '2023-06-02 09:15:00',
					responseTime: 105,
					statusCode: 200
				},
				{
					id: 7,
					status: 'up',
					createdAt: '2023-06-02 09:30:00',
					responseTime: 129,
					statusCode: 200
				},
				{
					id: 8,
					status: 'up',
					createdAt: '2023-06-02 09:45:00',
					responseTime: 112,
					statusCode: 200
				},
				{
					id: 9,
					status: 'up',
					createdAt: '2023-06-02 10:00:00',
					responseTime: 128,
					statusCode: 200
				},
				{
					id: 10,
					status: 'up',
					createdAt: '2023-06-02 10:15:00',
					responseTime: 109,
					statusCode: 200
				},
				{
					id: 11,
					status: 'up',
					createdAt: '2023-06-02 10:30:00',
					responseTime: 115,
					statusCode: 200
				},
				{
					id: 12,
					status: 'up',
					createdAt: '2023-06-02 10:45:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 13,
					status: 'up',
					createdAt: '2023-06-02 11:00:00',
					responseTime: 107,
					statusCode: 200
				},
				{
					id: 14,
					status: 'up',
					createdAt: '2023-06-02 11:15:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 15,
					status: 'up',
					createdAt: '2023-06-02 11:30:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 16,
					status: 'up',
					createdAt: '2023-06-02 11:45:00',
					responseTime: 106,
					statusCode: 200
				},
				{
					id: 17,
					status: 'up',
					createdAt: '2023-06-02 12:00:00',
					responseTime: 126,
					statusCode: 200
				},
				{
					id: 18,
					status: 'up',
					createdAt: '2023-06-02 12:15:00',
					responseTime: 108,
					statusCode: 200
				},
				{
					id: 19,
					status: 'up',
					createdAt: '2023-06-02 12:30:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 20,
					status: 'up',
					createdAt: '2023-06-02 12:45:00',
					responseTime: 114,
					statusCode: 200
				},
				{
					id: 21,
					status: 'up',
					createdAt: '2023-06-02 13:00:00',
					responseTime: 110,
					statusCode: 200
				},
				{
					id: 22,
					status: 'up',
					createdAt: '2023-06-02 13:15:00',
					responseTime: 128,
					statusCode: 200
				},
				{
					id: 23,
					status: 'up',
					createdAt: '2023-06-02 13:30:00',
					responseTime: 113,
					statusCode: 200
				},
				{
					id: 24,
					status: 'up',
					createdAt: '2023-06-02 13:45:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 25,
					status: 'up',
					createdAt: '2023-06-02 14:00:00',
					responseTime: 107,
					statusCode: 200
				},
				{
					id: 26,
					status: 'up',
					createdAt: '2023-06-02 14:15:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 27,
					status: 'up',
					createdAt: '2023-06-02 14:30:00',
					responseTime: 112,
					statusCode: 200
				},
				{
					id: 28,
					status: 'up',
					createdAt: '2023-06-02 14:45:00',
					responseTime: 109,
					statusCode: 200
				},
				{
					id: 29,
					status: 'up',
					createdAt: '2023-06-02 15:00:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 30,
					status: 'up',
					createdAt: '2023-06-02 15:15:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 1,
					status: 'up',
					createdAt: '2023-06-02 08:00:00',
					responseTime: 103,
					statusCode: 200
				},
				{
					id: 2,
					status: 'up',
					createdAt: '2023-06-02 08:15:00',
					responseTime: 118,
					statusCode: 200
				},
				{
					id: 3,
					status: 'up',
					createdAt: '2023-06-02 08:30:00',
					responseTime: 127,
					statusCode: 200
				},
				{
					id: 4,
					status: 'up',
					createdAt: '2023-06-02 08:45:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 5,
					status: 'up',
					createdAt: '2023-06-02 09:00:00',
					responseTime: 110,
					statusCode: 200
				},
				{
					id: 6,
					status: 'up',
					createdAt: '2023-06-02 09:15:00',
					responseTime: 105,
					statusCode: 200
				},
				{
					id: 7,
					status: 'up',
					createdAt: '2023-06-02 09:30:00',
					responseTime: 129,
					statusCode: 200
				},
				{
					id: 8,
					status: 'up',
					createdAt: '2023-06-02 09:45:00',
					responseTime: 112,
					statusCode: 200
				},
				{
					id: 9,
					status: 'up',
					createdAt: '2023-06-02 10:00:00',
					responseTime: 128,
					statusCode: 200
				},
				{
					id: 10,
					status: 'up',
					createdAt: '2023-06-02 10:15:00',
					responseTime: 109,
					statusCode: 200
				},
				{
					id: 11,
					status: 'up',
					createdAt: '2023-06-02 10:30:00',
					responseTime: 115,
					statusCode: 200
				},
				{
					id: 12,
					status: 'up',
					createdAt: '2023-06-02 10:45:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 13,
					status: 'up',
					createdAt: '2023-06-02 11:00:00',
					responseTime: 107,
					statusCode: 200
				},
				{
					id: 14,
					status: 'up',
					createdAt: '2023-06-02 11:15:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 15,
					status: 'up',
					createdAt: '2023-06-02 11:30:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 16,
					status: 'up',
					createdAt: '2023-06-02 11:45:00',
					responseTime: 106,
					statusCode: 200
				},
				{
					id: 17,
					status: 'up',
					createdAt: '2023-06-02 12:00:00',
					responseTime: 126,
					statusCode: 200
				},
				{
					id: 18,
					status: 'up',
					createdAt: '2023-06-02 12:15:00',
					responseTime: 108,
					statusCode: 200
				},
				{
					id: 19,
					status: 'up',
					createdAt: '2023-06-02 12:30:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 20,
					status: 'up',
					createdAt: '2023-06-02 12:45:00',
					responseTime: 114,
					statusCode: 200
				}
			]
		},
		{
			website: {
				id: 3,
				name: 'Github',
				url: 'https://github.com',
				checkInterval: 1
			},
			statuses: [
				{
					id: 1,
					status: 'up',
					createdAt: '2023-06-03 08:00:00',
					responseTime: 106,
					statusCode: 200
				},
				{
					id: 2,
					status: 'up',
					createdAt: '2023-06-03 08:15:00',
					responseTime: 125,
					statusCode: 200
				},
				{
					id: 3,
					status: 'up',
					createdAt: '2023-06-03 08:30:00',
					responseTime: 108,
					statusCode: 200
				},
				{
					id: 4,
					status: 'up',
					createdAt: '2023-06-03 08:45:00',
					responseTime: 113,
					statusCode: 200
				},
				{
					id: 5,
					status: 'up',
					createdAt: '2023-06-03 09:00:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 6,
					status: 'up',
					createdAt: '2023-06-03 09:15:00',
					responseTime: 110,
					statusCode: 200
				},
				{
					id: 7,
					status: 'up',
					createdAt: '2023-06-03 09:30:00',
					responseTime: 104,
					statusCode: 200
				},
				{
					id: 8,
					status: 'up',
					createdAt: '2023-06-03 09:45:00',
					responseTime: 128,
					statusCode: 200
				},
				{
					id: 9,
					status: 'up',
					createdAt: '2023-06-03 10:00:00',
					responseTime: 112,
					statusCode: 200
				},
				{
					id: 10,
					status: 'up',
					createdAt: '2023-06-03 10:15:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 11,
					status: 'up',
					createdAt: '2023-06-03 10:30:00',
					responseTime: 109,
					statusCode: 200
				},
				{
					id: 12,
					status: 'up',
					createdAt: '2023-06-03 10:45:00',
					responseTime: 115,
					statusCode: 200
				},
				{
					id: 13,
					status: 'up',
					createdAt: '2023-06-03 11:00:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 14,
					status: 'up',
					createdAt: '2023-06-03 11:15:00',
					responseTime: 107,
					statusCode: 200
				},
				{
					id: 15,
					status: 'up',
					createdAt: '2023-06-03 11:30:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 16,
					status: 'up',
					createdAt: '2023-06-03 11:45:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 17,
					status: 'up',
					createdAt: '2023-06-03 12:00:00',
					responseTime: 108,
					statusCode: 200
				},
				{
					id: 18,
					status: 'up',
					createdAt: '2023-06-03 12:15:00',
					responseTime: 128,
					statusCode: 200
				},
				{
					id: 19,
					status: 'up',
					createdAt: '2023-06-03 12:30:00',
					responseTime: 114,
					statusCode: 200
				},
				{
					id: 20,
					status: 'up',
					createdAt: '2023-06-03 12:45:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 21,
					status: 'up',
					createdAt: '2023-06-03 13:00:00',
					responseTime: 105,
					statusCode: 200
				},
				{
					id: 22,
					status: 'up',
					createdAt: '2023-06-03 13:15:00',
					responseTime: 112,
					statusCode: 200
				},
				{
					id: 23,
					status: 'up',
					createdAt: '2023-06-03 13:30:00',
					responseTime: 129,
					statusCode: 200
				},
				{
					id: 24,
					status: 'up',
					createdAt: '2023-06-03 13:45:00',
					responseTime: 110,
					statusCode: 200
				},
				{
					id: 25,
					status: 'up',
					createdAt: '2023-06-03 14:00:00',
					responseTime: 122,
					statusCode: 200
				},
				{
					id: 26,
					status: 'up',
					createdAt: '2023-06-03 14:15:00',
					responseTime: 109,
					statusCode: 200
				},
				{
					id: 27,
					status: 'up',
					createdAt: '2023-06-03 14:30:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 28,
					status: 'up',
					createdAt: '2023-06-03 14:45:00',
					responseTime: 113,
					statusCode: 200
				},
				{
					id: 29,
					status: 'up',
					createdAt: '2023-06-03 15:00:00',
					responseTime: 106,
					statusCode: 200
				},
				{
					id: 30,
					status: 'up',
					createdAt: '2023-06-03 15:15:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 1,
					status: 'up',
					createdAt: '2023-06-02 08:00:00',
					responseTime: 103,
					statusCode: 200
				},
				{
					id: 2,
					status: 'up',
					createdAt: '2023-06-02 08:15:00',
					responseTime: 118,
					statusCode: 200
				},
				{
					id: 3,
					status: 'up',
					createdAt: '2023-06-02 08:30:00',
					responseTime: 127,
					statusCode: 200
				},
				{
					id: 4,
					status: 'up',
					createdAt: '2023-06-02 08:45:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 5,
					status: 'up',
					createdAt: '2023-06-02 09:00:00',
					responseTime: 110,
					statusCode: 200
				},
				{
					id: 6,
					status: 'up',
					createdAt: '2023-06-02 09:15:00',
					responseTime: 105,
					statusCode: 200
				},
				{
					id: 7,
					status: 'up',
					createdAt: '2023-06-02 09:30:00',
					responseTime: 129,
					statusCode: 200
				},
				{
					id: 8,
					status: 'up',
					createdAt: '2023-06-02 09:45:00',
					responseTime: 112,
					statusCode: 200
				},
				{
					id: 9,
					status: 'up',
					createdAt: '2023-06-02 10:00:00',
					responseTime: 128,
					statusCode: 200
				},
				{
					id: 10,
					status: 'up',
					createdAt: '2023-06-02 10:15:00',
					responseTime: 109,
					statusCode: 200
				},
				{
					id: 11,
					status: 'up',
					createdAt: '2023-06-02 10:30:00',
					responseTime: 115,
					statusCode: 200
				},
				{
					id: 12,
					status: 'up',
					createdAt: '2023-06-02 10:45:00',
					responseTime: 120,
					statusCode: 200
				},
				{
					id: 13,
					status: 'up',
					createdAt: '2023-06-02 11:00:00',
					responseTime: 107,
					statusCode: 200
				},
				{
					id: 14,
					status: 'up',
					createdAt: '2023-06-02 11:15:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 15,
					status: 'up',
					createdAt: '2023-06-02 11:30:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 16,
					status: 'up',
					createdAt: '2023-06-02 11:45:00',
					responseTime: 106,
					statusCode: 200
				},
				{
					id: 17,
					status: 'up',
					createdAt: '2023-06-02 12:00:00',
					responseTime: 126,
					statusCode: 200
				},
				{
					id: 18,
					status: 'up',
					createdAt: '2023-06-02 12:15:00',
					responseTime: 108,
					statusCode: 200
				},
				{
					id: 19,
					status: 'up',
					createdAt: '2023-06-02 12:30:00',
					responseTime: 111,
					statusCode: 200
				},
				{
					id: 20,
					status: 'down',
					createdAt: '2023-06-02 12:45:00',
					responseTime: 114,
					statusCode: 503
				}
			]
		}
	] as unknown as { website: SelectWebsiteStatusCard; statuses: SelectUptimeCheck[] }[];
</script>

<Header title="Dashboard" />
<div class="w-full columns-sm gap-4">
	{#each data as { website, statuses }}
		<StatusCard {website} {statuses} />
	{/each}
</div>
