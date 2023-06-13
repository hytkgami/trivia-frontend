import { useState } from 'react';

export const useInput = (
  initialValue: string
): [
  {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  },
  () => void
] => {
  const [value, setValue] = useState(initialValue);
  return [
    {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    },
    () => setValue(initialValue),
  ];
};

export const useTextArea = (
  initialValue: string
): [
  {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  },
  () => void
] => {
  const [value, setValue] = useState(initialValue);
  return [
    {
      value,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value),
    },
    () => setValue(initialValue),
  ];
};
