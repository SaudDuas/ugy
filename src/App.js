import './App.css';
import Timer from "./Timer";
import Settings from "./Settings";
import Home from "./Home";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SettingsContext from "./SettingsContext";
import Navbar from "./NavBar";

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <Router>
      <main>
        <h1>Pomodoro Timer</h1>
        <div className="container">
          <Navbar />
          <SettingsContext.Provider value={{
            showSettings,
            setShowSettings,
            workMinutes,
            breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </SettingsContext.Provider>
        </div>
      </main>
    </Router>
  );
}

export default App;
