import React, { useState, useEffect, useRef } from "react";
import { Block } from "shared/ui/Block";
import { Input } from "shared/ui/Input";

export function PreviousInput() {
  const [currentValue, setCurrentValue] = useState("");
  const previousValueRef = useRef("");

  useEffect(() => {
    previousValueRef.current = currentValue;
  }, [currentValue]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  return (
    <Block title={"2. Компонент PreviousInput"}>
      <Input value={currentValue} onChange={onInputChange} />
      <div>
        <p>
          <b>Текущее значение:</b> {currentValue || "(пусто)"}
        </p>
        <p>
          <b>Предыдущее значение:</b> {previousValueRef.current || "(пусто)"}
        </p>
      </div>
    </Block>
  );
}
