import { Trash } from "lucide-react";
import { useState } from "react";
import type { Record } from "@/server/api/routers/record";
import { EditRecordDialogButton } from "./edit-record-dialog-button";
import { Button } from "./ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";
export const NoteItem = ({
  item,
  remove,
}: {
  item: Record;
  remove: (item: string) => void;
}) => {
  const [isClamped, setIsClamped] = useState(true);

  const onSetIsClamped = () => {
    setIsClamped((prev) => !prev);
  };

  return (
    <Item key={item.id} variant="muted">
      <ItemContent>
        <ItemTitle
          className="cursor-pointer underline"
          onClick={onSetIsClamped}
        >
          {item.title}
        </ItemTitle>
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
        <div className={`${isClamped ? "line-clamp-1" : null}`}>
          {item.description}
        </div>
      </ItemContent>
      <ItemActions>
        <EditRecordDialogButton item={item} />
        <Button
          className="cursor-pointer hover:bg-destructive hover:dark:bg-destructive"
          onClick={() => remove(item.id)}
          size="icon"
          variant="ghost"
        >
          <Trash />
        </Button>
      </ItemActions>
    </Item>
  );
};
