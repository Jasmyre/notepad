"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
	const onClick = () => {
		console.log("Hello World!");
	};

	return (
		<main
			className="flex min-h-screen items-center justify-center"
			onClick={onClick}
			onKeyDown={onClick}
		>
			<Button className="cursor-pointer">Click Me!</Button>
		</main>
	);
}
