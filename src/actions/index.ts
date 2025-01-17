import { defineAction } from "astro:actions";
import { db, Learning } from "astro:db";
import { z } from "astro:schema";

export const server = {
	tils: defineAction({
		accept: "form",
		input: z.object({
			title: z.string().min(10),
			content: z.string().min(1),
		}),
		handler: async ({ title, content }) => {
			const learning = await db
				.insert(Learning)
				.values({
					title,
					content,
					createdAt: new Date(),
				})
				.returning({ id: Learning.id });

			return learning[0].id;
		},
	}),
};
