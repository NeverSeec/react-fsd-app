import React, { useRef } from "react";
import { Block } from "shared/ui/Block";
import { Input } from "shared/ui/Input";

export function FocusTracker() {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const focusTransitionCountRef = useRef(0);

  const onFocusFirst = () => {
    if (!firstInputRef.current) return;

    firstInputRef.current.focus();
  };

  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget) {
      focusTransitionCountRef.current += 1;
      console.log(
        `Количество переходов фокуса: ${focusTransitionCountRef.current}`,
      );
    }
  };

  return (
    <Block title={"3. Компонент FocusTracker"}>
      <div>
        <label htmlFor="first-input">Первое поле: </label>
        <Input id="first-input" ref={firstInputRef} onFocus={onFocus} />
      </div>
      <div>
        <label htmlFor="second-input">Второе поле: </label>
        <Input
          id="second-input"
          ref={secondInputRef}
          onFocus={onFocus}
          placeholder="Второе поле"
        />
      </div>
      <button onClick={onFocusFirst}>Сфокусировать на первом</button>
      <p>Откройте консоль для просмотра количества переходов фокуса</p>
    </Block>
  );
}
