import './App.css';
import {ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Routes/Login';
import Menu from './Routes/Menu';
import { AuthProvider } from './context/useAuth';
import PrivateRoute from './components/PrivateRoute';
import Register from './Routes/Register';

function App() {
  return (
    <ChakraProvider className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/menu' element={<PrivateRoute><Menu/></PrivateRoute>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
