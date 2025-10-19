import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskPage } from "pages/TaskPage";
import { RegisterPage } from "pages/RegisterPage";
import { AuthPage } from "pages/AuthPage";
import { Provider } from "react-redux";
import { store } from "app/store.ts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </Router>
  );
  return (
    <Provider store={store}>
      <TaskPage />
    </Provider>
  );
}

export default App;
