import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskPage } from "pages/TaskPage";
import { RegisterPage } from "pages/RegisterPage";
import { AuthPage } from "pages/AuthPage";
import { RefExamplePage } from "pages/RefExamplePage";
import { PortalShowcase } from "pages/PortalShowcase";
import { ThemeProvider } from "shared/ui/Theme";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/ref-examples" element={<RefExamplePage />} />
          <Route path="/portal" element={<PortalShowcase />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
