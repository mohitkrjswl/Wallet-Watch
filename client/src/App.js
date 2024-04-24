import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export function ProtectedRoute({ children }) {
  if (localStorage.getItem('user')) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default App;