import type { APIRoute } from "astro";
import { db, eq, Learning } from "astro:db";

export const GET: APIRoute = async ({ params }) => {
	if (params.id) {
		try {
			const tils = await db
				.select()
				.from(Learning)
				.where(eq(Learning.id, Number(params.id)))
				.get();

			// if no matching tils, then throw error
			if (!tils) {
				throw new Error("No matching TIL found");
			}

			return new Response(JSON.stringify({ error: null, data: tils }), {
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

export const DELETE: APIRoute = async ({ params }) => {
	if (params.id) {
		await db.delete(Learning).where(eq(Learning.id, Number(params.id)));
	}

	return new Response(JSON.stringify({ message: "TIL deleted" }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const PATCH: APIRoute = async ({ params, request }) => {
	const { title, content } = await request.json();
	if (!title && !content) {
		return new Response(
			JSON.stringify({ error: "Title and content are required" }),
			{
				status: 400,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
	if (params.id) {
		await db
			.update(Learning)
			.set({
				...(title && { title }),
				...(content && { content }),
			})
			.where(eq(Learning.id, Number(params.id)));
	}

	return new Response(JSON.stringify({ message: "TIL updated" }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
