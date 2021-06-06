import { useEffect, useState } from 'react';

const PREFIX = 'jira-';

export const useLocalStorage = (key: string, initialValue: any) => {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    const jsonValue = window.localStorage.getItem(prefixedKey);

    if (jsonValue !== null) {
      setValue(JSON.parse(jsonValue));
    }
  }, [prefixedKey]);

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
};
