import type { APIRoute } from "astro";
import { db, eq, Learning } from "astro:db";

export const GET: APIRoute = async () => {
	try {
		const tils = await db.select().from(Learning);

		return new Response(JSON.stringify({ error: null, data: tils }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({
				error: error instanceof Error ? error.message : "Unknown error",
				data: null,
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
};
