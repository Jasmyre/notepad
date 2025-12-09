import { v4 as uuidV4 } from "uuid";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export type Record = {
  id: string;
  title: string;
  description: string;
  dateCreated: Date;
};

const records: Record[] = [
  {
    id: uuidV4(),
    title: "first",
    description: "first",
    dateCreated: new Date(),
  },
];

export const recordRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(({ input }) => {
      const record: Record = {
        id: uuidV4(),
        title: input.title,
        description: input.description,
        dateCreated: new Date(),
      };
      records.push(record);
      return record;
    }),

  getRecords: publicProcedure.query(() => records),
});
