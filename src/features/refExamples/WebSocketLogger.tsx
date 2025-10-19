import { useEffect, useRef } from "react";
import { Block } from "shared/ui/Block";

const webSocketUrl = `wss://echo.websocket.org`;

export function WebSocketLogger() {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(webSocketUrl);
    socketRef.current = socket;

    socket.addEventListener("message", (event) => {
      console.log("Получено сообщение:", event.data);
    });

    socket.addEventListener("open", () => {
      console.log("WebSocket соединение установлено");

      socket.send("Hello!");
    });

    socket.addEventListener("error", (error) => {
      console.error("Ошибка:", error);
    });

    socket.addEventListener("close", (event) => {
      console.log("Соединение закрыто:", event.code, event.reason);
    });

    return () => {
      if (!socketRef.current) return;

      console.log("Закрытие соединения...");
      socketRef.current.close(1000, "Компонент размонтирован");
      socketRef.current = null;
    };
  }, []);

  const onSendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = `Сообщение от ${new Date().toLocaleTimeString()}`;
      socketRef.current.send(message);
      console.log("Отправлено сообщение:", message);
    } else {
      console.warn("WebSocket не подключен");
    }
  };

  const getConnectionStatus = () => {
    if (!socketRef.current) return "Не инициализирован";

    switch (socketRef.current.readyState) {
      case WebSocket.CONNECTING:
        return "Подключение...";
      case WebSocket.OPEN:
        return "Подключено";
      case WebSocket.CLOSING:
        return "Закрывается...";
      case WebSocket.CLOSED:
        return "Закрыто";
      default:
        return "Неизвестно";
    }
  };

  return (
    <Block title={"5. Компонент WebSocketLogger"}>
      <p>
        Статус: <b>{getConnectionStatus()}</b>
      </p>

      <button
        onClick={onSendMessage}
        disabled={
          !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN
        }
      >
        Отправить тестовое сообщение
      </button>

      <p>Откройте консоль для просмотра WebSocket сообщений</p>
    </Block>
  );
}
