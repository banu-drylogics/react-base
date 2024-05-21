import React from "react";
import './styles.css'

interface Props {
  count: number;
  range: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setRange: React.Dispatch<React.SetStateAction<number>>
};

interface ButtonProps {
  name: string;
  onClick: () => void;
};

interface InputProps {
  value: number;
};

interface RangeProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  value?: number;
};

const Button = ({ onClick, name }: ButtonProps) => {
  return <div className="style-button-container">
    <button className="color-button" onClick={onClick}>{name}</button>
  </div>;
};

const RangeView = ({ onChange, value }: RangeProps) => {
  return (
    <div className="range-input-container">
      <label htmlFor="range">Range:</label>
      <input type="number" id="range" name="range" placeholder="Enter the Range" onChange={onChange} value={value} ></input>
    </div>
  );
}

const InputField = ({ value }: InputProps) => {
  return (
    <div className="input-container">
      <span className="button-input-container">{value}</span>
    </div>
  );
}

const Counter = ({ count, setCount, range, setRange }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setRange(parseInt(event.target.value))

  return (
    <div className="button-container">
      <Button onClick={() => setCount(count + Number(range))} name="ADD" />
      {
        <InputField value={count} />
      }
      <RangeView onChange={handleChange} />
      <Button onClick={() => setCount(0)} name="RESET" />
      <Button onClick={() => ((count > Number(range))) ? setCount(count - Number(range)) : setCount(0)} name="MINUS" />
    </div>
  )
}

export default Counter