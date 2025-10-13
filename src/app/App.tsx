import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskPage } from "pages/TaskPage";
import { RegisterPage } from "pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
