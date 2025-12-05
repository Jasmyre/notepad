"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
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
						render={({ field, fieldState }) => {
							return (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="title">Title</FieldLabel>
									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										id="title"
										placeholder="Enter record title..."
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							);
						}}
					/>

					<Controller
						control={form.control}
						name="description"
						render={({ field, fieldState }) => {
							return (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="description">Description</FieldLabel>
									<Textarea
										{...field}
										aria-invalid={fieldState.invalid}
										id="description"
										placeholder="Enter record description..."
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							);
						}}
					/>
				</FieldGroup>
			</FieldSet>

			<div className="flex justify-end">
				<Button className="cursor-pointer" type="submit">
					Submit
				</Button>
			</div>
		</form>
	);
}
