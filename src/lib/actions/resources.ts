"use server";

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from "~/server/db_drizzle/resources";
import { db } from "~/server/db_drizzle/";
import { generateEmbeddings } from "../ai/embedding";
import { embeddings as embeddingsTable } from "~/server/db_drizzle/schema";

export const createResource = async (input: NewResourceParams) => {
  try {
    const { content } = insertResourceSchema.parse(input);

    const [resource] = await db
      .insert(resources)
      .values({ content })
      .returning();

    const embeddings = await generateEmbeddings(content);
    await db.insert(embeddingsTable).values(
      embeddings.map((embedding) => ({
        resourceId: resource.id,
        ...embedding,
      })),
    );

    return "Resource successfully created and embedded.";
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : "Error, please try again.";
  }
};
