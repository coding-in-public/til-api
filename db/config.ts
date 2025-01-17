import { column, defineDb, defineTable } from "astro:db";

const Learning = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		title: column.text(),
		text: column.text(),
		createdAt: column.date(),
	},
});

// https://astro.build/db/config
export default defineDb({
	tables: { Learning },
});
