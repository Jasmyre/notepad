"use client";

import { Trash } from "lucide-react";
import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useRecord } from "@/hooks/use-record";
import type { Record } from "@/server/api/routers/record";
import { Button } from "./ui/button";

export const DeleteRecordAlertDialogButton = ({ id }: { id: string }) => {
  const [isPending, setIsPending] = useTransition();
  const [records, setRecords] = useLocalStorage<Record[] | null>(
    "site:records",
    null,
    {
      serializer: (value) => JSON.stringify(value),
      deserializer: (value) => {
        const arr = JSON.parse(value) as Record[];

        return arr.map((item) => ({
          ...item,
          dateCreated: new Date(item.dateCreated),
        }));
      },
    }
  );
  const { remove } = useRecord(records, setRecords);
  const onClear = () => {
    setIsPending(() => {
      remove(id);
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="cursor-pointer hover:bg-destructive hover:dark:bg-destructive"
          disabled={isPending}
          size="icon"
          title="Delete record"
          variant="ghost"
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button className="cursor-pointer" variant={"outline"}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="cursor-pointer text-gray-100"
              onClick={onClear}
              onKeyDown={onClear}
              variant={"destructive"}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
