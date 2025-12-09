// CRUD helpers for managing an array of `Record` items stored in localStorage using your useLocalStorage hook.
// Simple, typed, and works well with the hook.

import type { Record } from "@/server/api/routers/record";

// Generates a unique ID (simple and local-safe)
const uid = () => crypto.randomUUID();

export function useRecord(
  data: Record[] | null,
  setData: (
    updater: Record[] | null | ((prev: Record[] | null) => Record[] | null)
  ) => void
) {
  const add = (item: Omit<Record, "id" | "dateCreated">) => {
    const newRecord: Record = {
      id: uid(),
      dateCreated: new Date(),
      ...item,
    };

    setData((prev) => (prev ? [...prev, newRecord] : [newRecord]));
    return newRecord;
  };

  const update = (
    id: string,
    changes: Partial<Omit<Record, "id" | "dateCreated">>
  ) => {
    setData((prev) => {
      if (!prev) {
        return prev;
      }
      return prev.map((r) => (r.id === id ? { ...r, ...changes } : r));
    });
  };

  const remove = (id: string) => {
    setData((prev) => {
      if (!prev) {
        return prev;
      }
      return prev.filter((r) => r.id !== id);
    });
  };

  const get = (id: string) => data?.find((r) => r.id === id) ?? null;

  const clear = () => {
    setData(null);
  };

  return { add, update, remove, get, clear } as const;
}

/* =============================
   Example usage inside a component
   =============================

import { useLocalStorage } from "./useLocalStorage";
import { createRecordHelpers, RecordItem } from "./recordCrudHelpers";

export function RecordsDemo() {
  const [records, setRecords] = useLocalStorage<RecordItem[] | null>(
    "site:records",
    null,
    {
      deserializer: (value) => {
        const arr = JSON.parse(value) as RecordItem[];
        return arr.map((r) => ({ ...r, dateCreated: new Date(r.dateCreated) }));
      },
    }
  );

  const { add, update, remove, get, clear } = createRecordHelpers(records, setRecords);

  return (
    <div>
      <button onClick={() => add({ title: "Hello", description: "World" })}>
        Add record
      </button>

      <button onClick={() => clear()}>Clear all</button>

      <pre>{JSON.stringify(records, null, 2)}</pre>
    </div>
  );
}
*/
