<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Chart, registerables } from 'chart.js';
	import type { ScaleType } from 'chart.js';
	import { prettifyDate } from '$lib/utils';
	import { statusColorMap } from '$lib/components/ui/status/constants';
	import type { SelectUptimeCheck } from '$lib/db/schema';

	export let statuses: SelectUptimeCheck[];

	Chart.register(...registerables);
	let barChartElement: HTMLCanvasElement;
	const chartData = {
		labels: statuses.map(({ createdAt }) => createdAt),
		datasets: [
			{
				label: 'Response Time (ms)',
				labels: statuses.map(
					({ status, statusCode }) => `\n Status: ${status} \n Status Code: ${statusCode}`
				),
				data: statuses.map(({ responseTime }) => responseTime),
				backgroundColor: statuses.map((status) => statusColorMap[status.status])
			}
		]
	};

	onMount(() => {
		if (browser) {
			new Chart(barChartElement, {
				type: 'bar',
				data: chartData,
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							callbacks: {
								label: function (context) {
									let label = context.dataset.labels[context.dataIndex] || '';
									if (label) {
										label += ': ';
									}
									label += context.formattedValue;
									return label;
								}
							}
						}
					},
					scales: {
						x: {
							ticks: {
								display: false
							},
							grid: {
								color: 'transparent'
							}
						},
						y: {
							grid: {
								color: '#f5f5f5'
							}
						}
					}
				}
			});
		}
	});
</script>

<div class="h-32">
	<canvas bind:this={barChartElement} />
</div>
<div class="mt-1 flex items-center justify-between text-xs text-muted-foreground">
	<div>{prettifyDate(new Date(statuses[0].createdAt))}</div>
	<div>{prettifyDate(new Date(statuses[Math.ceil(statuses.length / 2)].createdAt))}</div>
	<div>{prettifyDate(new Date(statuses[statuses.length - 1].createdAt))}</div>
</div>
