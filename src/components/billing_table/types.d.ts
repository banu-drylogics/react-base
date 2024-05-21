export type EditableField = "items" | "price" | "quantity";
export type NonEditableField = "s_no" | "total";
export type NonEditableColType = { label: string, id: NonEditableField, editable: false, sortable: boolean };
export type EditableColType = { label: string, id: EditableField, editable: true, sortable: boolean };
export type ColType = NonEditableColType | EditableColType;
export type ColState = { items: string, price: number, quantity: string, total: number, [key: string]: string | number; };
