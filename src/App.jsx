import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import Protected from "./protected/Protected.jsx";
import { CrudProvider } from "./context/CrudContext.jsx";

function App() {
  return (
    <main className="h-screen flex items-center justify-center bg-[#1b1b1f] px-8">
      <CrudProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route
              path="/home"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
          </Routes>
        </AuthProvider>
      </CrudProvider>
    </main>
  );
}

export default App;
