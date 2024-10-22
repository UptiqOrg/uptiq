import { db } from '$lib/db/drizzle';
import { uptimeChecks, type SelectPartialStatus } from '$lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { ServiceResponse } from '../types';
import type { StatusCode } from 'hono/utils/http-status';

export const getStatus = async (
	websiteId: number
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
		.limit(40)
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
