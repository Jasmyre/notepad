"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useRecord } from "@/hooks/use-record";
import type { Record } from "@/server/api/routers/record";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(64, {
      message: "Can not exceed max 64 characters.",
    }),

  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." })
    .max(255, { message: "Can not exceed max 255 characters." }),
});

export function CreateForm() {
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
  // biome-ignore lint/correctness/noUnusedVariables: lol
  const { add, update, remove, get, clear } = useRecord(records, setRecords);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(() => {
      add(values);
    });
  }

  return (
    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend>Create Record</FieldLegend>
        <FieldDescription>What do you have in mind?</FieldDescription>

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
      </FieldSet>

      <div className="flex justify-end">
        <Button className="cursor-pointer" disabled={isPending} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
