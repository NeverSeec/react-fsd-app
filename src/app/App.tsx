import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskPage } from "pages/TaskPage";
import { RegisterPage } from "pages/RegisterPage";
import { AuthPage } from "pages/AuthPage";
import { RefExamplePage } from "pages/RefExamplePage";
import { AuthProvider, ProtectedRoute } from "features/authRouting";
import { Provider } from "react-redux";
import { store } from "app/store.ts";
import { ProfilePage } from "pages/ProfilePage/ProfilePage.tsx";
import { PublicPage } from "pages/PublicPage/PublicPage.tsx";
import { PortalShowcase } from "pages/PortalShowcase";
import { ThemeProvider } from "shared/ui/Theme";

function App() {
  return (
      <ThemeProvider>

      <Router>
      <AuthProvider>
        <Provider store={store}>
          <Routes>
              <Route path="/portal" element={<PortalShowcase />} />
              <Route path="/login" element={<AuthPage />} />
            <Route path="/public" element={<PublicPage />} />
            <Route path="/" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/ref-examples" element={<RefExamplePage />} />
            </Route>
          </Routes>
        </Provider>
      </AuthProvider>
    </Router>
      </ThemeProvider>

  );
}

export default App;
