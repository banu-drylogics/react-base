import { useState } from "react";
import BillingTable from "./BillingTable";

function TableWrapper() {
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  return (
    <div className="container">
      < BillingTable price={price} setPrice={setPrice} />
    </div>
  );
}

export default TableWrapper;