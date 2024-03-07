import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import './slider.css'; // Import your CSS file
import SettingsContext from './SettingsContext';
import { useContext } from 'react';
import BackButton from './BackButton';
import IncreaseButton from './IncreaseButton'; // Import your IncreaseButton component
import DecreaseButton from './DecreaseButton'; // Import your DecreaseButton component

function Settings() {
  const settingsInfo = useContext(SettingsContext);
  const [showSettings, setShowSettings] = useState(true);

  const handleBackButtonClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div style={{ textAlign: 'left' }}>
      {showSettings && (
        <>
          {/* Wrap labels, sliders, and buttons in "slider-container" class */}
          <div className="slider-container">
            <label className='label-slider1'>Work Duration: {settingsInfo.workMinutes}:00</label>
            <ReactSlider
              className={'slider'}
              thumbClassName={'thumb'}
              trackClassName={'track'}
              value={settingsInfo.workMinutes}
              onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
              min={1}
              max={120}
            />
            {/* Use your IncreaseButton and DecreaseButton components directly */}
            <IncreaseButton className="incrswrk" onClick={() => settingsInfo.setWorkMinutes(settingsInfo.workMinutes + 1)} />
            <DecreaseButton className="dcrswrk" onClick={() => settingsInfo.setWorkMinutes(settingsInfo.workMinutes - 1)} />
          </div>

          <div className="slider-container">
            <label>Break Duration: {settingsInfo.breakMinutes}:00</label>
            <ReactSlider
              className={'slider green'}
              thumbClassName={'thumb'}
              trackClassName={'track'}
              value={settingsInfo.breakMinutes}
              onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
              min={1}
              max={120}
            />
            <IncreaseButton className="incrsbrk" onClick={() => settingsInfo.setBreakMinutes(settingsInfo.breakMinutes + 1)} />
            <DecreaseButton className="dcrsbrk" onClick={() => settingsInfo.setBreakMinutes(settingsInfo.breakMinutes - 1)} />
          </div>

          <BackButton onClick={handleBackButtonClick} />
        </>
      )}
    </div>
  );
}

export default Settings;