import { ThemeToggle } from "@/components/custom-ui/theme-toggle";
import { ButtonGroup } from "@/components/ui/button-group";
import { ClearAllAlertDialogButton } from "../components/clear-all-alert-dialog-button";
import { CreateNewRecordDialogButton } from "../components/create-new-record-dialog-button";
import { NotesSection } from "../components/notes-section";

export default function Home() {
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
                <ClearAllAlertDialogButton />
              </ButtonGroup>
              <ButtonGroup>
                <ThemeToggle />
              </ButtonGroup>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <NotesSection />
    </main>
  );
}
