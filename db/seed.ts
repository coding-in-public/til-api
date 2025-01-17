import { db, Learning } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Learning).values({
		title: "Learning",
		text: "soemthign here",
		createdAt: new Date(),
	});
}
