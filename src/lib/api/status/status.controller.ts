import { Hono, type Context } from 'hono';
import { getStatus } from './status.service';

export const statusRouter = new Hono();

export const getStatusController = async (context: Context) => {
	const { websiteId } = context.req.param();
	if (!websiteId) return context.json({ error: 'Missing website ID' }, 400);

	const websiteResponse = await getStatus(+websiteId);

	return context.json(
		websiteResponse.error ? { error: websiteResponse.error } : websiteResponse.data,
		websiteResponse.status
	);
};

statusRouter.get('/:websiteId', getStatusController);
