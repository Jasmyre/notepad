"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { CreateForm } from "../components/create-form";
import { NotesSection } from "../components/notes-section";
import { ModeToggle } from "../components/ui/mode-toggle";

export default function Home() {
	const onClick = () => {
		console.log("Hello World!");
	};

	return (
		<main className="space-y-8 py-32">
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

			<section>
				<div className="mx-auto max-w-3xl">
					<ButtonGroup>
						<Button
							className="cursor-pointer"
							onClick={onClick}
							onKeyDown={onClick}
						>
							Click Me!
						</Button>
						<ModeToggle />
					</ButtonGroup>
				</div>
			</section>
		</main>
	);
}
