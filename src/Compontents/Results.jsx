import React, { useState } from 'react';
import { FaTrash, FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

const Result = ({ score, totalQuestions, playerName, onRestart, darkMode }) => {
  const [highScores, setHighScores] = useState(() => {
    const savedScores = JSON.parse(localStorage.getItem('quizHighScores')) || [];
    // Ensure we have proper score objects
    return savedScores.map(score => ({
      name: score.name || 'Anonymous',
      score: score.score || 0,
      date: score.date || new Date().toLocaleDateString()
    }));
  });

  const percentage = Math.round((score / totalQuestions) * 100);

  // Save the current score if it qualifies
  if (playerName && !highScores.some(s => s.name === playerName && s.score === score)) {
    const newScore = {
      name: playerName,
      score: score,
      date: new Date().toLocaleDateString()
    };
    const updatedScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    localStorage.setItem('quizHighScores', JSON.stringify(updatedScores));
    setHighScores(updatedScores);
  }

  const getResultMessage = () => {
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Not bad! 😊";
    return "Keep practicing! 📚";
  };

  const getPositionIcon = (position) => {
    switch(position) {
      case 1: return <FaTrophy className="gold-icon" />;
      case 2: return <FaMedal className="silver-icon" />;
      case 3: return <FaAward className="bronze-icon" />;
      default: return <span className="position-number">{position}.</span>;
    }
  };

  return (
    <div className={`result-container ${darkMode ? 'dark' : ''}`}>
      <h2>Quiz Completed!</h2>
      <p className="result-message">{getResultMessage()}</p>
      
      <div className="score-summary">
        <p>
          {playerName}, you scored <span className="highlight">{score}</span> out of{' '}
          <span className="highlight">{totalQuestions}</span>
        </p>
        <p>That's <span className="highlight">{percentage}%</span> correct!</p>
      </div>
      
      <div className="high-scores">
        <h3>High Scores</h3>
        <ul>
          {highScores.length > 0 ? (
            highScores.map((highScore, index) => (
              <li key={index}>
                <div className="position-icon">
                  {getPositionIcon(index + 1)}
                </div>
                <div className="score-details">
                  <span className="score-name">{highScore.name}</span>
                  <span className="score-value">{highScore.score}/{totalQuestions}</span>
                  <span className="score-date">{highScore.date}</span>
                </div>
                <button 
                  className="delete-score-btn"
                  onClick={() => handleDeleteScore(index)}
                  aria-label="Delete score"
                >
                  <FaTrash />
                </button>
              </li>
            ))
          ) : (
            <li className="no-scores">No high scores yet!</li>
          )}
        </ul>
      </div>
      
      <button className="restart-btn" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );

  function handleDeleteScore(index) {
    if (window.confirm("Are you sure you want to delete this score?")) {
      const updatedScores = [...highScores];
      updatedScores.splice(index, 1);
      localStorage.setItem('quizHighScores', JSON.stringify(updatedScores));
      setHighScores(updatedScores);
    }
  }
};

export default Result;