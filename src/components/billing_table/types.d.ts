export type EditableField = "items" | "price" | "quantity";
export type NonEditableField = "s_no" | "total";
export type NonEditableColType = { label: string, id: NonEditableField, editable: false };
export type EditableColType = { label: string, id: EditableField, editable: true };
export type ColType = NonEditableColType | EditableColType;
export type ColState = { items: string, price: number, quantity: string, total: number };
