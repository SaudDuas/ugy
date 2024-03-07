import React, { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";
import { Gauge } from 'react-circular-gauge'
import chroma from 'chroma-js'
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import RestartButton from "./RestartButton";

function Timer() {
    const settingsInfo = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work'); // work/break/null
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {

        function switchMode() {
            const nextMode = modeRef.current === 'work' ? 'break' : 'work';
            const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

            setMode(nextMode);
            modeRef.current = nextMode;

            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        secondsLeftRef.current = settingsInfo.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [settingsInfo]);

    const totalSeconds = mode === 'work'
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60;

    const percentage = Math.round(secondsLeft / totalSeconds * 100);
    /* when the percentage is 100 the sound will play */
    return (
        <div>
            <h2>{mode === 'work' ? 'Work Hard!' : 'Take A Break :)'}</h2> {/* Display mode here */}
            <div>
                <Gauge
                    animated={true}
                    value={secondsLeft}
                    valueStyle={{ fontSize: 0.0000000001, backgroundColor: 'transparent',color: 'transparent'}}
                    minValue={0}
                    maxValue={totalSeconds}
                    trackWidth={0.2}
                    arcWidth={0.2}
                    renderTopLabel={() => `${Math.floor(secondsLeft / 60)}:${secondsLeft % 60 < 10 ? '0' : ''}${secondsLeft % 60}`}
                    topLabelStyle={{ fontSize: '0.8em', color: 'white', fontWeight: 'bold', marginTop: '70px'}}

                    renderBottomLabel="Time left"
                    bottomLabelStyle={{ fontSize: '0.35em', color: 'white', fontWeight: 'bold', marginTop: '20px'}}
                    arcColor={({ normValue }) => chroma.scale(['red', 'green'])(normValue).css()}
                />
            </div>

            <div style={{ marginTop: "12px"}}>
                {isPaused ? (
                    <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
                ) : (
                    <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />
                )}
                <RestartButton onClick={() => {
                    if (mode === 'work') {
                        setSecondsLeft(settingsInfo.workMinutes * 60);
                        secondsLeftRef.current = settingsInfo.workMinutes * 60;
                    } else {
                        setSecondsLeft(settingsInfo.breakMinutes * 60);
                        secondsLeftRef.current = settingsInfo.breakMinutes * 60;
                    }
                }} />
            </div>
            <div style={{ marginTop: '20px' }}>

            </div>
        </div>
    );
}// Usage

export default Timer;
