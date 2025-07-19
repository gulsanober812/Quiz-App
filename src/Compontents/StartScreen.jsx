import React, { useState } from 'react';

const StartScreen = ({ onStart }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      onStart(playerName);
    }
  };

  return (
    <div className="start-screen">
      <h1>Welcome to QuizMaster</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
        />
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default StartScreen;