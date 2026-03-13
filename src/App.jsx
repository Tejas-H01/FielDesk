import { useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import DPRPage from "./pages/DPRPage";

const AUTH_KEY = "fielddesk_auth";

const RequireAuth = ({ isAuthed, children }) => {
  const location = useLocation();
  if (!isAuthed) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

const App = () => {
  const [isAuthed, setIsAuthed] = useState(
    () => localStorage.getItem(AUTH_KEY) === "true"
  );
  const navigate = useNavigate();
  const location = useLocation();

  const authActions = useMemo(
    () => ({
      login: () => {
        localStorage.setItem(AUTH_KEY, "true");
        setIsAuthed(true);
      },
      logout: () => {
        localStorage.removeItem(AUTH_KEY);
        setIsAuthed(false);
        navigate("/");
      },
    }),
    [navigate]
  );

  const showNavbar = isAuthed && location.pathname !== "/";

  return (
    <div className="min-h-screen">
      {showNavbar && (
        <Navbar isAuthed={isAuthed} onLogout={authActions.logout} />
      )}
      <LayoutGroup>
        <AnimatePresence mode="wait">
          <div key={location.pathname} className="page-fade">
            <Routes location={location}>
              <Route path="/" element={<LoginPage onLogin={authActions.login} />} />
              <Route
                path="/projects"
                element={
                  <RequireAuth isAuthed={isAuthed}>
                    <ProjectsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/dpr/:projectId"
                element={
                  <RequireAuth isAuthed={isAuthed}>
                    <DPRPage />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};

export default App;
