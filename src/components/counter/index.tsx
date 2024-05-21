import { useState } from "react";
import Counter from "./Counter";

function CounterWrapper() {
  const [count, setCount] = useState<number>(0);
  const [range, setRange] = useState<number>(0);

  return (
    <div className="container">
      <Counter count={count} setCount={setCount} range={range} setRange={setRange} />
    </div>
  );
}

export default CounterWrapper;