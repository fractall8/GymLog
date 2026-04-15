import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
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
  ExerciseDetails,
} from "@/pages";

export const AppRouter = () => {
  return (
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
          <Route path="/exercises/:id" element={<ExerciseDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
