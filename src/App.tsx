import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/AuthContext"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Upload from "@/pages/Upload"
import { ProtectedRoute } from "@/routes/ProtectedRoute"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

function App() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col font-sans">
        <Router>
          <Header />
          <main className="flex-1 flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-3xl">
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            </div>
          </main>
        </Router>
        <Toaster />
      </div>
    </AuthProvider>
  )
}

export default App
