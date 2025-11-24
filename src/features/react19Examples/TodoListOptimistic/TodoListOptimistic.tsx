import { useOptimistic, useState, useTransition } from "react";
import cn from "./TodoListOptimistic.module.css";
import { Input } from "shared/ui/Input";
import classNames from "classnames";

const uuid = () => Math.random().toString(36).substr(2, 9);

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const saveTodoToServer = async (todo: Todo): Promise<Todo> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { ...todo, id: uuid() };
};

export const TodoListOptimistic = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo],
  );

  const [_, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const newTodo = {
      id: uuid(),
      text: inputValue.trim(),
      completed: false,
    };

    setInputValue("");
    setIsLoading(true);

    try {
      startTransition(async () => {
        addOptimisticTodo(newTodo);
        const savedTodo = await saveTodoToServer(newTodo);
        setTodos((prev) => [...prev, savedTodo]);
      });
    } catch (error) {
      console.error("Failed to save todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  console.log(optimisticTodos);
  return (
    <div className={cn.container}>
      <h1>Optimistic Todo список</h1>

      <form onSubmit={handleSubmit} className={cn.form}>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Новая todo..."
          disabled={isLoading}
        />
        <button type="submit" disabled={!inputValue.trim() || isLoading}>
          {isLoading ? "Загрузка..." : "Добавить"}
        </button>
      </form>

      <div className={cn.todoList}>
        {optimisticTodos.length === 0 ? (
          <p>Пусто</p>
        ) : (
          optimisticTodos.map((todo) => (
            <div
              key={todo.id}
              className={classNames(
                cn.todoItem,
                todo.completed && cn.completed,
              )}
            >
              <div className={cn.todoContent}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
              </div>
              <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
