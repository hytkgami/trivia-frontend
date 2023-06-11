import { useState } from 'react';

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
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.target.value),
    },
    () => setValue(initialValue),
  ];
};
