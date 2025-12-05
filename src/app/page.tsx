"use client";

import { ThemeToggle } from "@/components/custom-ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { CreateForm } from "../components/create-form";
import { NotesSection } from "../components/notes-section";

export default function Home() {
	const onClick = () => {
		console.log("Hello World!");
	};

	return (
		<main className="space-y-8 px-4 py-10">
			<section>
				<div className="mx-auto max-w-3xl">
					<div className="flex flex-wrap justify-between">
						<div>
							<h1 className="font-bold text-2xl">Notepad</h1>
						</div>
						<ButtonGroup>
							<Button
								className="cursor-pointer hover:bg-destructive hover:dark:bg-destructive"
								onClick={onClick}
								onKeyDown={onClick}
								variant={"outline"}
							>
								Clear all
							</Button>
							<ThemeToggle />
						</ButtonGroup>
					</div>
				</div>
			</section>

			<section>
				<div className="mx-auto max-w-3xl">
					<Card>
						<CardContent>
							<CreateForm />
						</CardContent>
					</Card>
				</div>
			</section>

			<NotesSection />
		</main>
	);
}
