import React, { forwardRef, KeyboardEvent, useState } from 'react';
import { StyledInput } from './Input.styled';

type T = boolean | string;

interface IProps {
  type: string;
  provideInpValue: (val: T, id: string, submitVal?: boolean) => void;
  dataTestID: string;
  value?: string;
  checked?: boolean;
  id: string;
  required?: boolean;
  placeholder?: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
  maxInputLength?: number;
  switchToNextInput: (ref: React.ForwardedRef<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Input: React.FC<IProps> = forwardRef((props, ref) => {
  const {
    type,
    value,
    dataTestID,
    placeholder,
    checked,
    required,
    id,
    provideInpValue,
    maxInputLength,
    switchToNextInput,
    disabled,
  } = props;
  const [inpState, setInpState] = useState<T>(() =>
    type === 'checkbox' ? true : value !== undefined ? value : ''
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case 'checkbox':
        setInpState((prevVal) => !prevVal);
        provideInpValue(inpState, id);
        break;
      case 'text':
        setInpState(e.target.value);
        provideInpValue(e.target.value, id);
        break;
      default:
        provideInpValue(inpState, id);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      switchToNextInput(ref);
      provideInpValue(inpState, id, true);
    }
  };

  return (
    <StyledInput
      data-testid={dataTestID}
      type={type}
      value={inpState as string}
      onChange={handleChange}
      placeholder={placeholder}
      checked={checked}
      required={required}
      id={id}
      onKeyDown={handleKeyPress}
      ref={ref}
      maxLength={maxInputLength}
      disabled={disabled}
    />
  );
});

export default Input;
