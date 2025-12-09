import { useState } from "react";
import type { Record } from "@/server/api/routers/record";
import { DeleteRecordAlertDialogButton } from "./delete-record-alert-dialog-button";
import { EditRecordDialogButton } from "./edit-record-dialog-button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";
export const NoteItem = ({ item }: { item: Record }) => {
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
        <DeleteRecordAlertDialogButton id={item.id} />
      </ItemActions>
    </Item>
  );
};
