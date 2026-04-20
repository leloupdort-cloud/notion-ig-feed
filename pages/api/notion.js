import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DB_ID,
    });

    const posts = response.results.map((page) => {
      const files = page.properties.visuel?.files || [];

      const image =
        files[0]?.file?.url ||
        files[0]?.external?.url ||
        null;

      return { image };
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
