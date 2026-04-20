import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async function handler(req, res) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DB_ID,
  });

  const posts = response.results.map((page) => {
    const image =
      page.properties.Image.files[0]?.file?.url ||
      page.properties.Image.files[0]?.external?.url;

    return {
      image,
    };
  });

  res.status(200).json(posts);
}
