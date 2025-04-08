import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup.jsx";
import Project from "./pages/Project.jsx";
import ProjectDetails from './pages/ProjectDetails.jsx';
import User from './pages/User.jsx';
import UserDetails from './pages/UserDetails.jsx';
import store from "./redux/store.js";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Non-Protected Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes inside Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<User />} />
              <Route path="/user/:id" element={<UserDetails />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/tasks" element={<ProjectDetails />} />
              <Route path="/tasks/:id" element={<ProjectDetails />} />
            </Route>
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
