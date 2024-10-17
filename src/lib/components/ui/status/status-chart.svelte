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
								maxRotation: 0,
								minRotation: 0,
								callback: function (
									this: ScaleType,
									value: string | number,
									index: number,
									ticks: unknown[]
								): string | null {
									if (
										index === 0 ||
										index === Math.floor((ticks.length - 1) / 2) ||
										index === ticks.length - 1
									) {
										return prettifyDate(this.getLabelForValue(value));
									}
									return '';
								}
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

<canvas bind:this={barChartElement} />
