import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const prettifyDate = (dateString: string): string => {
	const date = new Date(dateString);

	const timeFormatter = new Intl.DateTimeFormat('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});

	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: 'short'
	});

	const time = timeFormatter.format(date);
	const formattedDate = dateFormatter.format(date);

	return `${time} - ${formattedDate}`;
};

export const getMinutesAgo = (dateTime: Date): { time: number; type: string } => {
	const now = new Date();
	const diffMs = now.getTime() - dateTime.getTime();
	const diffMins = Math.round(diffMs / 60000);
	const hours = Math.floor(diffMins / 60);
	const days = Math.floor(diffMins / 1440);

	switch (true) {
		case diffMins === 1:
			return { time: 1, type: 'min' };
		case diffMins < 60:
			return { time: diffMins, type: 'mins' };
		case diffMins < 1440:
			return { time: hours, type: hours === 1 ? 'hour' : 'hours' };
		default:
			return { time: days, type: days === 1 ? 'day' : 'days' };
	}
};
