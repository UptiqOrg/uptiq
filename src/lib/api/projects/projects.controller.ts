import { Hono, type Context } from 'hono';
import { verifyAuth } from '@hono/auth-js';
import {
	createProject,
	deleteProject,
	getAllProjects,
	getProject,
	updateProject
} from './projects.service';
import { InsertProjectSchema } from '$lib/db/schema';
import { validateRequestBody } from '../middlewares';

export const projectsRouter = new Hono();

export const getProjectsController = async (context: Context) => {
	const { token } = context.get('authUser');
	if (!token) return context.status(401);

	const projects = await getAllProjects(token.id);

	return context.json({ projects });
};

export const getProjectController = async (context: Context) => {
	const { token } = context.get('authUser');
	if (!token) return context.status(401);

	const { slug } = context.req.param();
	if (!slug) return context.json({ error: 'Invalid slug' }, 400);

	const project = await getProject(token.id, slug);
	if (!project) return context.json({ error: 'Project not found' }, 404);

	return context.json(project);
};

export const postProjectController = async (context: Context) => {
	const { token } = context.get('authUser');
	if (!token) return context.status(401);

	const requestBody = await context.req.json();

	return await createProject({
		userId: token.id,
		name: requestBody.name as string,
		description: requestBody.description as string,
		slug: requestBody.slug as string
	})
		.then((response) => {
			if (response.error) {
				return context.json({ error: response.error }, response.status);
			}

			return context.json(response.data, response.status);
		})
		.catch((error) => {
			return context.json({ error }, 400);
		});
};

export const putProjectController = async (context: Context) => {
	const { token } = context.get('authUser');
	if (!token) return context.status(401);

	const { slug } = context.req.param();
	if (!slug) return context.json({ error: 'Invalid slug' }, 400);

	const requestBody = context.get('requestBody');
	const updatedProject = await updateProject(token.id, slug, requestBody);

	return context.json(
		updatedProject.data ?? { error: updatedProject.error },
		updatedProject.status
	);
};

export const deleteProjectController = async (context: Context) => {
	const { token } = context.get('authUser');
	if (!token) return context.status(401);

	const { slug } = context.req.param();
	if (!slug) return context.json({ error: 'Invalid slug' }, 400);

	const deletedProject = await deleteProject(token.id, slug);
	return context.json(
		deletedProject.data ?? { error: deletedProject.error },
		deletedProject.status
	);
};

const PartialInsertProjectSchema = InsertProjectSchema.pick({
	name: true,
	description: true,
	slug: true
});

projectsRouter.use(verifyAuth());
projectsRouter.get('/:slug', getProjectController);
projectsRouter.get('/', getProjectsController);
projectsRouter.post('/', validateRequestBody(PartialInsertProjectSchema), postProjectController);
projectsRouter.put('/:slug', validateRequestBody(PartialInsertProjectSchema), putProjectController);
projectsRouter.delete('/:slug', deleteProjectController);
