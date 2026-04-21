import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Protected from "./protected/Protected.jsx";
import { CrudProvider } from "./context/CrudContext.jsx";
import { Auth, Home } from "./pages/index.js";
import { Layout } from "./components/index.js";

function App() {
  return (
    <main className="h-screen bg-[#1b1b1f] relative">
      <CrudProvider>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <Protected>
                    <Home />
                  </Protected>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </CrudProvider>
    </main>
  );
}

export default App;
