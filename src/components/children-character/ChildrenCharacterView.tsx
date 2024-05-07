import React, { useEffect, useState } from 'react';
import _ from 'lodash';

interface ChildrenCharacterViewProps {
  onCharacterCountChange?: (childCount: number, index: number) => void;
  index?: number;
}

const ChildrenCharacterView = ({ onCharacterCountChange, index = 0 }: ChildrenCharacterViewProps) => {
  const [inputText, setInputText] = useState('');
  const [childTextLengths, setChildTextLengths] = useState<number[]>([]);
  const [childComponents, setChildComponents] = useState<JSX.Element[]>([]);
  const [inputModified, setInputModified] = useState(false);

  useEffect(() => {
    setInputModified(false);
  }, [inputText]);

  const getTotalCharacterCount = (): number => {
    const childCount = childTextLengths.reduce((acc, length) => acc + length, 0);
    return inputText.length + childCount;
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
    setInputModified(true);
    if (onCharacterCountChange) {
      onCharacterCountChange(getTotalCharacterCount(), index);
    }
  };

  const addChildComponent = () => {
    setChildComponents([
      ...childComponents,
      <ChildrenCharacterView key={_.uniqueId()} onCharacterCountChange={handleChildCharacterCountChange} index={childComponents.length} />,
    ]);
    setChildTextLengths([...childTextLengths, 0]);
  };

  const removeChildComponent = (childIndex: number) => {
    if (childComponents.length > 0) {
      const updatedComponents = [...childComponents];
      const updatedTextLengths = [...childTextLengths];

      updatedComponents.splice(childIndex, 1);
      updatedTextLengths.splice(childIndex, 1);

      setChildComponents(updatedComponents);
      setChildTextLengths(updatedTextLengths);

      if (onCharacterCountChange) {
        onCharacterCountChange(getTotalCharacterCount(), index - 1);
      }
    }
  };

  const handleChildCharacterCountChange = (childCount: number, childIndex: number) => {
    const updatedTextLengths = [...childTextLengths];
    updatedTextLengths[childIndex] = childCount;
    setChildTextLengths(updatedTextLengths);
    if (!inputModified && onCharacterCountChange) {
      onCharacterCountChange(getTotalCharacterCount(), index);
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <p style={{ fontWeight: 'bold', fontSize: 'larger' }}>Characters in children: {getTotalCharacterCount()}</p>
      <input type="text" value={inputText} onChange={handleTextChange} />
      <button style={{ borderRadius: '20%', border: 'none', marginRight: '5px' }} onClick={addChildComponent} disabled={inputText === ''}>Add Child</button>
      {childComponents.map((child, index) => (
        <div key={index} style={{ backgroundColor: index % 2 === 0 ? 'grey' : 'white' }}>
          {React.cloneElement(child, {
            onCharacterCountChange: handleChildCharacterCountChange,
            index,
          })}
          <button style={{ borderRadius: '20%', border: 'none' }} onClick={() => removeChildComponent(index)}>Delete Element</button>
        </div>
      ))}
    </div>
  );
};

export default ChildrenCharacterView;

