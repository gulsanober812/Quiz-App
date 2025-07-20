import React, { useState } from 'react';
import Results from './Compontents/Results';
import Quiz from './Compontents/Quiz'
import './App.css';
import StartScreen from './Compontents/StartScreen';
import Header from './Compontents/Header';

const App = () => {
  const [quizStage, setQuizStage] = useState('start'); // 'start', 'quiz', 'result'
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleStart = (name) => {
    setPlayerName(name);
    setQuizStage('quiz');
    setScore(0);
  };

  const handleQuizEnd = (finalScore) => {
    setScore(finalScore);
    setQuizStage('result');
  };

  const handleRestart = () => {
    setQuizStage('start');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleInstructions = (show) => {
    setShowInstructions(show);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Header   playerName={quizStage !== 'start' ? playerName : ''}
        onToggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        onShowInstructions={toggleInstructions}
      />
      
      <main className="main-content">
        {quizStage === 'start' && !showInstructions && (
          <StartScreen onStart={handleStart} />
        )}
        {quizStage === 'quiz' && !showInstructions && (
          <Quiz 
          playerName={playerName}
            onQuizEnd={handleQuizEnd}
            darkMode={darkMode}
          />
            
        )}
        {quizStage === 'result' && !showInstructions && (
          <Results 
          score={score}
            totalQuestions={5}
            playerName={playerName}
            onRestart={handleRestart}
            darkMode={darkMode}
          />
        )}
      </main>
    </div>
  );
};

export default App;