import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthUI from './components/Auth/AuthUI';
import Quotify from './components/Quotify/Quotify';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthUI />} />
        <Route path="/reset-password" element={<AuthUI />} />
        <Route path="/quotify" element={<Quotify />} />
      </Routes>
    </Router>
  );
}

export default App;