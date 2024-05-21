import React, { useEffect, useState } from 'react';
import './styles.scss';
import _ from 'lodash';

export interface TextBoxComponentProps {
  onTextCountChange?: (e: React.ChangeEvent<HTMLInputElement>, childCount: number, index: number) => void;
  index?: number;
}

const TextBoxComponent = ({ onTextCountChange, index = 0 }: TextBoxComponentProps) => {
  const [inputText, setInputText] = useState('');
  const [childTextLengths, setChildTextLengths] = useState<number[]>([]);
  const [childComponents, setChildComponents] = useState<JSX.Element[]>([]);
  const [inputModified, setInputModified] = useState(false);

  useEffect(() => {
    setInputModified(false);
  }, [inputText]);

  const getTotalCharacterCount = (): number => {
    const childCount = _.sum(childTextLengths)
    return inputText.length + childCount;
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
    setInputModified(true);
    if (onTextCountChange) {
      onTextCountChange(event, getTotalCharacterCount(), index);
    }
  };

  const addChild = () => {
    setChildComponents([
      ...childComponents,
      <TextBoxComponent onTextCountChange={handleTextCountChange} index={childComponents.length} />,
    ]);
    setChildTextLengths([...childTextLengths, 0]);
  };

  const handleDelete = (childIndex: number) => {
    if (childComponents.length > 0) {
      const updatedComponents = [...childComponents];
      const updatedTextLengths = [...childTextLengths];
      _.remove(updatedComponents, (_, index) => index === childIndex);
      setChildComponents(updatedComponents);
      _.remove(childTextLengths, (_, index) => index === childIndex);
      setChildTextLengths(updatedTextLengths);
      if (onTextCountChange) {
        getTotalCharacterCount();
      }
    }
  };

  const handleTextCountChange = (e: React.ChangeEvent<HTMLInputElement>, childCount: number, childIndex: number) => {
    const inputCount = e.target.value.length;
    childCount = childCount > inputCount ? childCount -= 1 : childCount += 1;
    const updatedTextLengths = [...childTextLengths];
    updatedTextLengths[childIndex] = childCount;
    setChildTextLengths(updatedTextLengths);
    if (!inputModified && onTextCountChange) {
      onTextCountChange(e, getTotalCharacterCount(), index);
    }
  };


  return (
    <div className='text-container'>
      <p className='text-container_header'>Characters in children: {getTotalCharacterCount()}</p>
      <input type="text" value={inputText} onChange={handleTextChange} />
      <button className='text-container_add' onClick={addChild} disabled={inputText === ''}>Add Child</button>
      {childComponents.map((child, index) => (
        <div key={index} className={'text-container'.concat(index % 2 === 0 ? ' even' : ' odd')} >
          {
            React.cloneElement(child, {
              onTextCountChange: (e: React.ChangeEvent<HTMLInputElement>,
                childCount: number, index: number) => handleTextCountChange(e, childCount, index),
            })
          }
          <button className='text-container_delete' onClick={() => handleDelete(index)}>Delete Element</button>
        </div>
      ))}
    </div>
  );
};

export default TextBoxComponent;
