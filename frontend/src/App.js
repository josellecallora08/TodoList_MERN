import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Content from './pages/_content'
import Login from './pages/Login';
import Signup from './pages/Signup'
import { useUserContext } from './hooks/useUserContext';
function App() {

  const { users } = useUserContext()

  return (
   <Router>
    <Routes>
      <Route path='/' element={users ? <Content /> : <Navigate to="/login"/>} />
      <Route path='/login' element={users ? <Navigate to="/"/> : <Login />} />
      <Route path='/signup' element={users ? <Navigate to="/" /> : <Signup />} />
    </Routes>
   </Router>
  );
}

export default App;
