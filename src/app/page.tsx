"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ModeToggle } from "../components/ui/mode-toggle";

export default function Home() {
	const onClick = () => {
		console.log("Hello World!");
	};

	return (
		<main className="flex min-h-screen items-center justify-center">
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
		</main>
	);
}
