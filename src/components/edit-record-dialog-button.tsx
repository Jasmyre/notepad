"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useRecord } from "@/hooks/use-record";
import { formSchema } from "@/schemas/form-schema";
import type { Record } from "../server/api/routers/record";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const EditRecordDialogButton = ({ item }: { item: Record }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useTransition();
  const [records, setRecords] = useLocalStorage<Record[] | null>(
    "site:records",
    null,
    {
      serializer: (value) => JSON.stringify(value),
      deserializer: (value) => {
        const arr = JSON.parse(value) as Record[];

        return arr.map((_item) => ({
          ..._item,
          dateCreated: new Date(_item.dateCreated),
        }));
      },
    }
  );
  // biome-ignore lint/correctness/noUnusedVariables: lol
  const { add, update, remove, get, clear } = useRecord(records, setRecords);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: item.title,
      description: item.description,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsPending(() => {
      setIsOpen(false);
      update(item.id, values);
      form.reset();
    });
  };

  const onReset = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: item.title,
        description: item.description,
      });
    }
  }, [isOpen, item, form]);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          title="Edit record"
          type={"submit"}
          variant={"outline"}
        >
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogDescription>
            Update your note by editing the text and saving your changes.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldGroup>
                <Controller
                  control={form.control}
                  name="title"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="title">Title</FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        disabled={isPending}
                        id="title"
                        placeholder="Enter record title..."
                      />
                      {fieldState.invalid ? (
                        <FieldError errors={[fieldState.error]} />
                      ) : null}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="description">Description</FieldLabel>
                      <Textarea
                        {...field}
                        aria-invalid={fieldState.invalid}
                        disabled={isPending}
                        id="description"
                        placeholder="Enter record description..."
                      />
                      {fieldState.invalid ? (
                        <FieldError errors={[fieldState.error]} />
                      ) : null}
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup>
                <Button className="cursor-pointer" type="submit">
                  Confirm edit
                </Button>
                <Field>
                  <Button
                    className="cursor-pointer"
                    onClick={onReset}
                    type="button"
                    variant={"outline"}
                  >
                    Cancel
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
