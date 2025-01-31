import { defineAction } from "astro:actions";
import { db, Learning } from "astro:db";
import { z } from "astro:schema";
import sanitizeHtml from "sanitize-html";

export const server = {
	tils: defineAction({
		accept: "form",
		input: z.object({
			title: z.string().min(2),
			content: z.string().min(10),
		}),
		handler: async ({ title, content }) => {
			const learning = await db
				.insert(Learning)
				.values({
					title: sanitizeHtml(title),
					content: sanitizeHtml(content),
					createdAt: new Date(),
				})
				.returning({ id: Learning.id });

			return learning[0].id;
		},
	}),
};
