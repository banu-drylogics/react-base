export type ColState = {
    "Complaint ID": number,
    "Submitted via": string,
    "Date submitted": number,
    "Date received": number,
    "State": string,
    "Product": string,
    "Sub-product": string,
    "Issue": string,
    "Company response to consumer": string,
    "Timely response?": string,
    [key: string]: string | number;
}
