"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Record } from "@/server/api/routers/record";
import { NoteItem } from "./note-item";

export const NotesSection = () => {
  // prevent SSR mismatch
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  const [records] = useLocalStorage<Record[] | null>("site:records", null, {
    serializer: (value) => JSON.stringify(value),
    deserializer: (value) => {
      const arr = JSON.parse(value) as Record[];
      return arr.map((item) => ({
        ...item,
        dateCreated: new Date(item.dateCreated),
      }));
    },
  });

  if (!ready) {
    return null;
  }

  return (
    <section>
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-4">
          {records?.map((item) => (
            <NoteItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};
