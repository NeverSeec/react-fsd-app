import { TaskPage } from "pages/TaskPage";
import { Provider } from "react-redux";
import { store } from "app/store.ts";

function App() {
  return (
    <Provider store={store}>
      <TaskPage />
    </Provider>
  );
}

export default App;
