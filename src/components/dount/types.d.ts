export type Data = {
  "key": string,
  "id": string,
  "data_for": number,
  "data_for_start": number,
  "data_for_str": string,
  "value": number,
  "delta": number,
  [key: string]: string | number;
}

export type UpdtedData = {
  channelName: string,
  value: number,
  sharePercent: string
}