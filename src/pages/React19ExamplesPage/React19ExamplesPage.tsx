import {
  ActionStateWithReducer,
  FormWithAsyncSave,
  TodoListOptimistic,
} from "features/react19Examples";

export function React19ExamplesPage() {
  return (
    <div>
      <FormWithAsyncSave />
      <TodoListOptimistic />
      <ActionStateWithReducer />
    </div>
  );
}
