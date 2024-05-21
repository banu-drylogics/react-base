import React from "react";
import './styles.scss'

interface Props {
  count: number;
  range: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setRange: React.Dispatch<React.SetStateAction<number>>
};

interface ButtonProps {
  name: string;
  onClick: () => void;
  className: string;
};

interface InputProps {
  value: number;
};

interface RangeProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  value?: number;
};

const Button = ({ onClick, name, className }: ButtonProps) => {
  return <div className="style-button-container">
    <button className={`style-button-container__${className}`} onClick={onClick}>{name}</button>
  </div >;
};

const RangeView = ({ onChange, value }: RangeProps) => {
  return (
    <div className="range-input-container">
      <label htmlFor="range" className="range-input-container__range">Range:</label>
      <input type="number" id="range" name="range" className="range-input-container__input"
        placeholder="Enter the Range" onChange={onChange} value={value} min={0} ></input>
    </div>
  );
}

const InputField = ({ value }: InputProps) => {
  return (
    <div className="input-container">
      <span className="input-container__label">{value}</span>
    </div>
  );
}

const Counter = ({ count, setCount, range, setRange }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setRange(parseInt(event.target.value))

  return (
    <div className="counter-container">
      <Button className='add-button' onClick={() => setCount(count + Number(range))} name="ADD" />
      {
        <InputField value={count} />
      }
      <RangeView onChange={handleChange} />
      <Button className='reset-button' onClick={() => setCount(0)} name="RESET" />
      <Button className='minus-button' onClick={() => ((count > Number(range))) ? setCount(count - Number(range)) : setCount(0)} name="MINUS" />
    </div>
  )
}

export default Counter;
