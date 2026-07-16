import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Protected from "./protected/Protected.jsx";
import { CrudProvider } from "./context/CrudContext.jsx";
import { Auth, Home, PostDetail } from "./pages/index.js";
import { Layout, Loader } from "./components/index.js";
import { Suspense } from "react";

function App() {
  return (
    <main className="h-screen bg-[#1b1b1f] relative">
      <AuthProvider>
        <CrudProvider>
          <Suspense>
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
                <Route
                  path="post/:postId"
                  element={
                    <Protected>
                      <PostDetail />
                    </Protected>
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        </CrudProvider>
      </AuthProvider>
    </main>
  );
}

export default App;
