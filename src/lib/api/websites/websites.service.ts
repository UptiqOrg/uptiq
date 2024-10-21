import { db } from '$lib/db/drizzle';
import { websites, type InsertWebsite, type SelectWebsitePartial } from '$lib/db/schema';
import { and, count, eq } from 'drizzle-orm';
import type { ServiceResponse } from '../types';
import type { StatusCode } from 'hono/utils/http-status';
import { isUserPro } from '../user/user.service';
import { prettifyErrors } from '$lib/db/utils';
import { getProjectBySlug } from '../projects/projects.service';

export const canPorojectHaveMoreWebsite = async (
	userId: string,
	projectId: number
): Promise<boolean> => {
	if (await isUserPro(userId)) return true;

	return (await getWebsiteCount(projectId)) < 2;
};

export const getWebsiteCount = async (projectId: number): Promise<number> => {
	return await db
		.select({ count: count(websites.id) })
		.from(websites)
		.where(eq(websites.projectId, projectId))
		.then((response) => response[0].count);
};

export const getWebsite = async (
	userId: string,
	websiteId: number
): Promise<ServiceResponse<SelectWebsitePartial>> => {
	return await db
		.select({
			id: websites.id,
			name: websites.name,
			checkInterval: websites.checkInterval,
			url: websites.url
		})
		.from(websites)
		.where(and(eq(websites.userId, userId), eq(websites.id, websiteId)))
		.limit(1)
		.then((response) => {
			if (response.length === 0)
				return {
					status: 404 as StatusCode,
					error: 'Website not found'
				};

			return {
				status: 200 as StatusCode,
				data: response[0]
			};
		})
		.catch((error) => {
			return {
				status: 400 as StatusCode,
				error: error.message
			};
		});
};

export const getWebsites = async (
	userId: string,
	slug: string
): Promise<ServiceResponse<SelectWebsitePartial[]>> => {
	const project = await getProjectBySlug(userId, slug);

	if (!project) return { status: 404, error: 'Project not found!' };

	return await db
		.select({
			id: websites.id,
			name: websites.name,
			checkInterval: websites.checkInterval,
			url: websites.url
		})
		.from(websites)
		.where(and(eq(websites.userId, userId), eq(websites.projectId, project.id)))
		.then((response) => {
			return {
				status: 200 as StatusCode,
				data: response
			};
		})
		.catch((error) => {
			return {
				status: 400 as StatusCode,
				error: error.message
			};
		});
};

export const createWebsite = async (
	website: InsertWebsite
): Promise<ServiceResponse<SelectWebsitePartial>> => {
	if (!(await canPorojectHaveMoreWebsite(website.userId, website.projectId)))
		return {
			status: 403,
			error: 'Hobby users can create 2 websites per project!'
		};

	return await db
		.insert(websites)
		.values(website)
		.returning({
			id: websites.id,
			name: websites.name,
			checkInterval: websites.checkInterval,
			url: websites.url
		})
		.then((response) => {
			return {
				status: 200 as StatusCode,
				data: response[0]
			};
		})
		.catch((error) => {
			return {
				status: 400 as StatusCode,
				error: prettifyErrors(error)
			};
		});
};

export const updateWebsite = async (
	userId: string,
	websiteId: number,
	updatedWebsite: InsertWebsite
): Promise<ServiceResponse<SelectWebsitePartial>> => {
	return await db
		.update(websites)
		.set(updatedWebsite)
		.where(and(eq(websites.userId, userId), eq(websites.id, websiteId)))
		.returning({
			id: websites.id,
			name: websites.name,
			checkInterval: websites.checkInterval,
			url: websites.url
		})
		.then((response) => {
			return {
				status: 200 as StatusCode,
				data: response[0]
			};
		})
		.catch((error) => {
			return {
				status: 400 as StatusCode,
				error: error.message
			};
		});
};

export const deleteWebsite = async (
	userId: string,
	websiteId: number
): Promise<ServiceResponse<{ deletedId: number }>> => {
	return await db
		.delete(websites)
		.where(and(eq(websites.userId, userId), eq(websites.id, websiteId)))
		.returning({ deletedId: websites.id })
		.then((response) => {
			if (response.length === 0) {
				return {
					status: 404 as StatusCode,
					error: 'Website not found'
				};
			}
			return {
				status: 200 as StatusCode,
				data: response[0]
			};
		})
		.catch((error) => {
			return {
				status: 400 as StatusCode,
				error: error.message
			};
		});
};
