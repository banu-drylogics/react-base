export type Data = {
  "key": string,
  "id": string,
  "data_for": number,
  "data_for_start": number,
  "data_for_str": string,
  "value": number | null,
  "delta": number | null,
}
export type transformedDataType = {
  channelName: string,
  value: number,
  color: string,
}
