import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './pages/Header';
import { Home } from './pages/Home';
import { ReadText } from './pages/ReadText';
import { Describe } from './pages/Describe';

function App() {
  return (
    <div className="App h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="read-text" element={<ReadText />}/>
        <Route path="describe" element={<Describe />}/>
      </Routes>
    </div>
  );
}

export default App;
