import { Data } from "./types";

const _ = require('lodash');

export const dountData = [
  {
    "key": "Twitter",
    "id": "4018",
    "data_for": 1713312000,
    "data_for_start": 1713312000,
    "data_for_str": "2024-04-17",
    "value": 13545,
    "delta": -6917
  },
  {
    "key": "Instagram",
    "id": "4018",
    "data_for": 1713312000,
    "data_for_start": 1713312000,
    "data_for_str": "2024-04-17",
    "value": 97689,
    "delta": -90866
  },
  {
    "key": "Facebook",
    "id": "4018",
    "data_for": 1713312000,
    "data_for_start": 1713312000,
    "data_for_str": "2024-04-17",
    "value": 4188,
    "delta": -1555
  },
  {
    "key": "TikTok",
    "id": "4018",
    "data_for": 1713312000,
    "data_for_start": 1713312000,
    "data_for_str": "2024-04-17",
    "value": 21025,
    "delta": 107
  },
  {
    "key": "Instagram",
    "id": "4018",
    "data_for": 1713225600,
    "data_for_start": 1713225600,
    "data_for_str": "2024-04-16",
    "value": 188555,
    "delta": -88384
  },
  {
    "key": "Twitter",
    "id": "4018",
    "data_for": 1713225600,
    "data_for_start": 1713225600,
    "data_for_str": "2024-04-16",
    "value": 20462,
    "delta": -5755
  },
  {
    "key": "Facebook",
    "id": "4018",
    "data_for": 1713225600,
    "data_for_start": 1713225600,
    "data_for_str": "2024-04-16",
    "value": 5743,
    "delta": -6800
  },
  {
    "key": "TikTok",
    "id": "4018",
    "data_for": 1713225600,
    "data_for_start": 1713225600,
    "data_for_str": "2024-04-16",
    "value": 20918,
    "delta": 752
  },
  {
    "key": "Facebook",
    "id": "4018",
    "data_for": 1713139200,
    "data_for_start": 1713139200,
    "data_for_str": "2024-04-15",
    "value": 12543,
    "delta": 10273
  },
  {
    "key": "Instagram",
    "id": "4018",
    "data_for": 1713139200,
    "data_for_start": 1713139200,
    "data_for_str": "2024-04-15",
    "value": 276939,
    "delta": 98426
  },
  {
    "key": "Twitter",
    "id": "4018",
    "data_for": 1713139200,
    "data_for_start": 1713139200,
    "data_for_str": "2024-04-15",
    "value": 26217,
    "delta": 19945
  },
  {
    "key": "TikTok",
    "id": "4018",
    "data_for": 1713139200,
    "data_for_start": 1713139200,
    "data_for_str": "2024-04-15",
    "value": 20166,
    "delta": -378
  },
  {
    "key": "Facebook",
    "id": "4018",
    "data_for": 1713052800,
    "data_for_start": 1713052800,
    "data_for_str": "2024-04-14",
    "value": 2270,
    "delta": -3095
  },
  {
    "key": "TikTok",
    "id": "4018",
    "data_for": 1713052800,
    "data_for_start": 1713052800,
    "data_for_str": "2024-04-14",
    "value": 20544,
    "delta": -5221
  },
  {
    "key": "Instagram",
    "id": "4018",
    "data_for": 1713052800,
    "data_for_start": 1713052800,
    "data_for_str": "2024-04-14",
    "value": 178513,
    "delta": 82732
  },
  {
    "key": "Twitter",
    "id": "4018",
    "data_for": 1713052800,
    "data_for_start": 1713052800,
    "data_for_str": "2024-04-14",
    "value": 6272,
    "delta": 1276
  },
  {
    "key": "Twitter",
    "id": "4018",
    "data_for": 1712966400,
    "data_for_start": 1712966400,
    "data_for_str": "2024-04-13",
    "value": 4996,
    "delta": -5317
  },
  {
    "key": "TikTok",
    "id": "4018",
    "data_for": 1712966400,
    "data_for_start": 1712966400,
    "data_for_str": "2024-04-13",
    "value": 25765,
    "delta": -23841
  },
  {
    "key": "Instagram",
    "id": "4018",
    "data_for": 1712966400,
    "data_for_start": 1712966400,
    "data_for_str": "2024-04-13",
    "value": 95781,
    "delta": -64840
  },
  {
    "key": "Facebook",
    "id": "4018",
    "data_for": 1712966400,
    "data_for_start": 1712966400,
    "data_for_str": "2024-04-13",
    "value": 5365,
    "delta": -1277
  },
  {
    "key": "Facebook",
    "id": "4018",
    "data_for": 1712880000,
    "data_for_start": 1712880000,
    "data_for_str": "2024-04-12",
    "value": 6642,
    "delta": 1264
  },
  {
    "key": "Facebook",
    "id": "4018",
    "data_for": 1712880000,
    "data_for_start": 1712880000,
    "data_for_str": "2024-04-12",
    "value": 6642,
    "delta": 1264
  },
  {
    "key": "Facebook",
    "id": "4018",
    "data_for": 1712880000,
    "data_for_start": 1712880000,
    "data_for_str": "2024-04-12",
    "value": 6642,
    "delta": 1264
  },
  {
    "key": "Facebook",
    "id": "4018",
    "data_for": 1712880000,
    "data_for_start": 1712880000,
    "data_for_str": "2024-04-12",
    "value": 6642,
    "delta": 1264
  },
  {
    "key": "TikTok",
    "id": "4018",
    "data_for": 1712880000,
    "data_for_start": 1712880000,
    "data_for_str": "2024-04-12",
    "value": 49606,
    "delta": -33845
  },
  {
    "key": "Twitter",
    "id": "4018",
    "data_for": 1712880000,
    "data_for_start": 1712880000,
    "data_for_str": "2024-04-12",
    "value": 10313,
    "delta": 4595
  },
  {
    "key": "Instagram",
    "id": "4018",
    "data_for": 1712880000,
    "data_for_start": 1712880000,
    "data_for_str": "2024-04-12",
    "value": 160621,
    "delta": -28462
  },
  {
    "key": "Instagram",
    "id": "4018",
    "data_for": 1712793600,
    "data_for_start": 1712793600,
    "data_for_str": "2024-04-11",
    "value": 189083,
    "delta": 4032
  },
  {
    "key": "Facebook",
    "id": "4018",
    "data_for": 1712793600,
    "data_for_start": 1712793600,
    "data_for_str": "2024-04-11",
    "value": 5378,
    "delta": 1819
  },
  {
    "key": "TikTok",
    "id": "4018",
    "data_for": 1712793600,
    "data_for_start": 1712793600,
    "data_for_str": "2024-04-11",
    "value": 83451,
    "delta": -28586
  },
  {
    "key": "Twitter",
    "id": "4018",
    "data_for": 1712793600,
    "data_for_start": 1712793600,
    "data_for_str": "2024-04-11",
    "value": 5718,
    "delta": 4977
  }
]

export const updatedData = _.chain(dountData)
  .groupBy('key')
  .map((userViews: string[], username: string) => ({
    channelName: username,
    value: _.sumBy(userViews, 'value')
  }))
  .value();
const desiredOrder = ['Facebook', 'Twitter', 'Instagram', 'TikTok'];
export const colors = ["#43be19", "#0db0ad", '#da16dd', '#2b4a90', '#dd08f0'];
const ChannelNames = _.map(updatedData, (data: Data) => data.channelName);
export const legendNames = _.sortBy(ChannelNames, (item: string) => desiredOrder.indexOf(item));


export const formatNumber = (num: number) => {
  const formatLetters = ['', 'K', 'M', 'B', 'T'];
  const tier = Math.log10(num) / 3 | 0;

  if (tier === 0) return num.toString();

  const suffix = formatLetters[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;

  return scaled.toFixed(1) + suffix;
}
