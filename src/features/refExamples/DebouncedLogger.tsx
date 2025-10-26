import React, { useState, useRef } from "react";
import { Block } from "shared/ui/Block";
import { Input } from "shared/ui/Input";

export function DebouncedLogger() {
  const [inputValue, setInputValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      console.log(`Введенный текст: "${value}"`);
      timeoutRef.current = null;
    }, 1000);
  };

  return (
    <Block title={"4. Компонент DebouncedLogger с useRef"}>
      <Input value={inputValue} onChange={onInputChange} />
      <p>Текст появится в консоли через 1 секунду после окончания ввода</p>
    </Block>
  );
}
