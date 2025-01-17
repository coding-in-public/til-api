import type { APIRoute } from "astro";
import { db, eq, Learning } from "astro:db";

export const GET: APIRoute = async ({ params }) => {
	if (params.id) {
		try {
			const tils = await db
				.select()
				.from(Learning)
				.where(eq(Learning.id, Number(params.id)))
				.limit(1);

			// if no matching tils, then throw error
			if (!tils || tils.length === 0) {
				throw new Error("No matching TIL found");
			}

			return new Response(JSON.stringify({ error: null, data: tils[0] }), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
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
	}

	// otherwise, grab all
	const tils = await db.select().from(Learning);

	return new Response(
		JSON.stringify({
			message: "This was a GET!",
		}),
	);
};
