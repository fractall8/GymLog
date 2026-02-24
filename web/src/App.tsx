import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context";
import { ProtectedRoute, PublicRoute } from "@/components";
import { Layout } from "@/layouts";
import {
  Home,
  Login,
  Register,
  Workouts,
  History,
  Exercises,
  WorkoutDetails,
  NotFound,
} from "@/pages";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <Layout>
                  <Outlet />
                </Layout>
              </ProtectedRoute>
            }
          >
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/workouts/:id" element={<WorkoutDetails />} />
            <Route path="/history" element={<History />} />
            <Route path="/exercises" element={<Exercises />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
