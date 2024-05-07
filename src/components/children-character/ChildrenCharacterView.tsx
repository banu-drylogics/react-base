import React, { useState } from 'react';
import _ from 'lodash';

interface ChildrenCharacterViewProps {
  onDelete?: () => void;
  onCharacterCountChange?: (e: React.ChangeEvent<HTMLInputElement>, childCount: number) => void;
}

const ChildrenCharacterView = ({ onDelete, onCharacterCountChange }: ChildrenCharacterViewProps) => {
  const [inputText, setInputText] = useState('');
  const [childTextCount, setChildTextCount] = useState(0);
  const [childComponents, setChildComponents] = useState<JSX.Element[]>([]);

  const countCharacters = (str: string): number => {
    return str.replace(/\s/g, '').length;
  };

  const getTotalCharacterCount = (): number => {
    let total = countCharacters(inputText);
    if (onCharacterCountChange) {
      total += childTextCount;
    }
    return total;
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
    if (onCharacterCountChange) {
      onCharacterCountChange(event, getTotalCharacterCount());
    }
  };

  const addChildComponent = () => {
    setChildComponents([
      ...childComponents,
      <ChildrenCharacterView key={_.uniqueId()} onCharacterCountChange={handleChildCharacterCountChange} />,
    ]);
  };

  const deleteLevel = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const handleChildCharacterCountChange = (e: React.ChangeEvent<HTMLInputElement>, childCount: number) => {
    if (onCharacterCountChange) {
      setChildTextCount(e.target.value.length);
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <p style={{ fontWeight: 'bold', fontSize: 'larger' }}>Characters in children: {getTotalCharacterCount()}</p>
      <input type="text" value={inputText} onChange={handleTextChange} />
      <button style={{ borderRadius: '50%', border: 'none', marginRight: '5px' }} onClick={addChildComponent} disabled={inputText === ''}>Add Child</button>
      {childComponents.map((child, index) => (
        <div key={index}>
          {React.cloneElement(child, {
            onCharacterCountChange: (e: React.ChangeEvent<HTMLInputElement>, childCount: number) => handleChildCharacterCountChange(e, childCount),
          })}
          <button style={{ borderRadius: '50%', border: 'none' }} onClick={deleteLevel}>Delete Element</button>
        </div>
      ))}
    </div>
  );
};

export default ChildrenCharacterView;
