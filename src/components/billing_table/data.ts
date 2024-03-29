import { ColType } from "./types";

export const columnConfig: ColType[] = [
  { label: "S.No", id: "s_no", editable: false },
  { label: "Items", id: "items", editable: true },
  { label: "Price", id: "price", editable: true },
  { label: "Quantity", id: "quantity", editable: true },
  { label: "Total", id: "total", editable: false }
]