import { db } from '$lib/db/drizzle';
import {
	projects,
	uptimeChecks,
	websites,
	type SelectPartialStatus,
	type SelectProjectPartial
} from '$lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { ServiceResponse, StatusPageResponse } from '../types';
import type { StatusCode } from 'hono/utils/http-status';

export const getStatus = async (
	websiteId: number,
	limit = 40
): Promise<ServiceResponse<SelectPartialStatus[]>> => {
	return await db
		.select({
			status: uptimeChecks.status,
			responseTime: uptimeChecks.responseTime,
			statusCode: uptimeChecks.statusCode,
			createdAt: uptimeChecks.createdAt
		})
		.from(uptimeChecks)
		.where(eq(uptimeChecks.websiteId, websiteId))
		.limit(limit)
		.orderBy(desc(uptimeChecks.createdAt))
		.then((response) => {
			return {
				status: 200 as StatusCode,
				data: response
			};
		})
		.catch((error) => {
			console.error(error);
			return {
				status: 500 as StatusCode,
				data: []
			};
		});
};

export const getStatusByProject = async (
	projectSlug: string
): Promise<ServiceResponse<SelectProjectPartial>> => {
	return await db
		.select({
			id: projects.id,
			name: projects.name,
			description: projects.description,
			slug: projects.slug
		})
		.from(projects)
		.where(eq(projects.slug, projectSlug))
		.limit(1)
		.then((response) => {
			if (response.length === 0) {
				return {
					status: 404 as StatusCode,
					error: 'Project not found!'
				};
			}

			return {
				status: 200 as StatusCode,
				data: response[0]
			};
		})
		.catch((error) => {
			console.error(error);
			return {
				status: 500 as StatusCode,
				error: 'Error fetching project!'
			};
		});
};

export const getStatusPage = async (
	projectId: number
): Promise<ServiceResponse<StatusPageResponse[]>> => {
	const response: StatusPageResponse[] = [];

	const websitesResponse = await db
		.select({
			id: websites.id,
			name: websites.name,
			url: websites.url,
			checkInterval: websites.checkInterval
		})
		.from(websites)
		.where(eq(websites.projectId, projectId));

	for (const website of websitesResponse) {
		const statusResponse = await getStatus(website.id, 50);

		if (statusResponse.status !== 200 || !statusResponse.data) {
			return {
				status: 500 as StatusCode,
				error: 'Error fetching status'
			};
		}

		response.push({
			...website,
			statuses: statusResponse.data
		});
	}

	return { status: 200, data: response };
};
