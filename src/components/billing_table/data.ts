import React, { useEffect } from "react";
import { ColState, ColType } from "./types";

export const columnConfig: ColType[] = [
  { label: "S.No", id: "s_no", editable: false, sortable: false },
  { label: "Items", id: "items", editable: true, sortable: true },
  { label: "Price", id: "price", editable: true, sortable: true },
  { label: "Quantity", id: "quantity", editable: true, sortable: true },
  { label: "Total", id: "total", editable: false, sortable: true }
]

interface FetchProps {
  setCollectedRecords: React.Dispatch<React.SetStateAction<ColState[]>>;
};

export const useFetchData = ({ setCollectedRecords }: FetchProps) => {
  const [isTableFetching, setIsTableFetching] = React.useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const fetch = () => {
        return new Promise<ColState[]>((resolve) =>
          setTimeout(() => {
            resolve(allReports);
          }, 2000
          )
        )
      };
      setCollectedRecords(await fetch());
      setIsTableFetching(false);
    })();
  }, [])
  return isTableFetching;
}

export const allReports: ColState[] =
  [
    {
      items: "Apple",
      price: 2,
      quantity: "1",
      total: 84
    },
    {
      items: "Orange",
      price: 4,
      quantity: "3",
      total: 21
    },
    {
      items: "Pinapple",
      price: 6,
      quantity: "6",
      total: 12
    },
    {
      items: "Watermelon",
      price: 8,
      quantity: "2",
      total: 98
    },
    {
      items: "Tomato",
      price: 9,
      quantity: "5",
      total: 45
    },
    {
      items: "Chilly",
      price: 10,
      quantity: "8",
      total: 34
    },
    {
      items: "Cucumber",
      price: 15,
      quantity: "1",
      total: 12
    }
  ]
