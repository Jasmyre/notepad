"use client";

import { SquarePen, Trash } from "lucide-react";
import { api } from "@/trpc/react";
import { Button } from "./ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "./ui/item";

export const NotesSection = () => {
	const records = api.record.getRecords.useQuery().data;

	return (
		<section>
			<div className="mx-auto max-w-3xl">
				<div className="flex flex-col gap-4">
					{records?.map((item) => {
						return (
							<Item key={item.id} variant={"muted"}>
								<ItemContent>
									<ItemTitle>{item.title}</ItemTitle>
									<ItemDescription>
										{item.dateCreated.toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
											hour: "2-digit",
											minute: "2-digit",
											second: "2-digit",
										})}
									</ItemDescription>
								</ItemContent>
								<ItemActions>
									<Button
										className="cursor-pointer"
										size={"icon"}
										variant={"outline"}
									>
										<SquarePen />
									</Button>
									<Button
										className="cursor-pointer hover:bg-destructive hover:dark:bg-destructive"
										size={"icon"}
										variant={"ghost"}
									>
										<Trash />
									</Button>
								</ItemActions>
							</Item>
						);
					})}
				</div>
			</div>
		</section>
	);
};
