import type { StatusCode } from 'hono/utils/http-status';

export type ServiceResponse<T> = {
	data?: T;
	error?: string;
	status: StatusCode;
};