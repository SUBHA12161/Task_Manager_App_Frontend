// src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import CategoryList from './pages/CategoryList';
import MyNavbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddCategory from './pages/AddCategory';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      <ToastContainer />
      <Router>
        <MyNavbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={isLoggedIn ? <TaskList /> : <Navigate to="/login" />} />
          <Route path="/new/tasks" element={isLoggedIn ? <TaskForm /> : <Navigate to="/login" />} />
          <Route path="/categories" element={isLoggedIn ? <CategoryList /> : <Navigate to="/login" />} />
          <Route path="/new/categories" element={isLoggedIn ? <AddCategory /> : <Navigate to="/login" />} />
          <Route path="/home" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/tasks" : "/login"} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;