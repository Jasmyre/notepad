"use client";

import { Trash } from "lucide-react";
import { Suspense } from "react";
import { ThemeToggle } from "@/components/custom-ui/theme-toggle";
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
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Spinner } from "@/components/ui/spinner";
import { CreateNewRecordDialogButton } from "../components/create-new-record-dialog-button";
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
              <ButtonGroup>
                <CreateNewRecordDialogButton />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="cursor-pointer hover:bg-destructive hover:dark:bg-destructive"
                      onClick={onClick}
                      onKeyDown={onClick}
                      title="Clear all record"
                      variant={"outline"}
                    >
                      <Trash />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your records.
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
                          variant={"destructive"}
                        >
                          Clear all
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </ButtonGroup>
              <ButtonGroup>
                <ThemeToggle />
              </ButtonGroup>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <Suspense fallback={<Spinner />}>
        <NotesSection />
      </Suspense>
    </main>
  );
}
