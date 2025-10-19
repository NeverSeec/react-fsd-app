import { useRef } from "react";
import { Block } from "shared/ui/Block";

interface ClickData {
  startTime: number | null;
  clickCount: number;
}

export function ClickTimer() {
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  });

  const onClick = () => {
    const currentTime = Date.now();
    const { startTime, clickCount } = clickDataRef.current;

    if (startTime === null) {
      clickDataRef.current.startTime = currentTime;
      clickDataRef.current.clickCount = 1;
      console.log("Первый клик! Время зафиксировано.");
      return;
    }

    const timeDifference = currentTime - startTime;
    const newClickCount = clickCount + 1;

    clickDataRef.current.clickCount = newClickCount;

    console.log(
      `Разница во времени: ${timeDifference}мс, Общее количество кликов: ${newClickCount}`,
    );
  };

  return (
    <Block title={"1. Компонент ClickTimer"}>
      <button onClick={onClick}>Нажми меня</button>
      <p>Откройте консоль для просмотра результатов</p>
    </Block>
  );
}
