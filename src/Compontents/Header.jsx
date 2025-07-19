import React, { useState } from 'react';
import { FaLightbulb, FaMoon, FaQuestionCircle, FaTimes } from 'react-icons/fa';

const Header = ({ playerName, onToggleDarkMode, darkMode, onShowInstructions, onStartQuiz }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleInstructionsClick = () => {
    const newState = !showInstructions;
    setShowInstructions(newState);
    onShowInstructions(newState);
  };

  const handleStartQuiz = () => {
    setShowInstructions(false);
    onShowInstructions(false);
    onStartQuiz();
  };

  return (
    <header className={`header ${darkMode ? 'dark' : ''}`}>
      <div className="logo">QuizMaster</div>
      {playerName && <div className="player-name">Player: {playerName}</div>}
      <div className="header-controls">
        <button 
          className="instructions-btn" 
          onClick={handleInstructionsClick}
          aria-label="Instructions"
        >
          <FaQuestionCircle />
        </button>
        <button 
          className="theme-toggle" 
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaLightbulb /> : <FaMoon />}
        </button>
      </div>
      
      {showInstructions && (
        <div className="instructions-modal-overlay">
          <div className={`instructions-modal ${darkMode ? 'dark' : ''}`}>
            <div className="modal-header">
              <h2>QuizMaster</h2>
              <button className="close-btn" onClick={handleInstructionsClick}>
                <FaTimes />
              </button>
            </div>
          <div className="modal-body">
  <h3 className="modal-title">📚 Quiz Instructions</h3>
  <ul className="instructions-list">
    <li className="instruction-item">
      <span className="emoji-icon">🎯</span>
      <span><strong>Multiple Choice:</strong> Select one answer</span>
    </li>
    <li className="instruction-item">
      <span className="emoji-icon">⏱️</span>
      <span><strong>Timer:</strong> 10 sec/question</span>
    </li>
    <li className="instruction-item">
      <span className="emoji-icon">🔒</span>
      <span><strong>Locked Answers:</strong> No changes</span>
    </li>
    <li className="instruction-item">
      <span className="emoji-icon">💯</span>
      <span><strong>Scoring:</strong> 1 pt per correct</span>
    </li>
    <li className="instruction-item">
      <span className="emoji-icon">💡</span>
      <span><strong>Hints:</strong> Lightbulb button</span>
    </li>
    <li className="instruction-item">
      <span className="emoji-icon">🏆</span>
      <span><strong>Rewards:</strong> Earn coins</span>
    </li>
  </ul>

  <div className="rewards-section">
    <h4 className="rewards-title">💰 Reward Tiers</h4>
    <div className="reward-badges">
      <div className="reward-badge">
        <span className="gold">🥇 1st</span>
        <span>50 coins</span>
      </div>
      <div className="reward-badge">
        <span className="silver">🥈 2nd</span>
        <span>30 coins</span>
      </div>
      <div className="reward-badge">
        <span className="bronze">🥉 3rd</span>
        <span>20 coins</span>
      </div>
      <div className="reward-badge">
        <span>🎯 Part.</span>
        <span>5 coins</span>
      </div>
    </div>
  </div>

  <div className="pro-tip">
    <p>🌟 <strong>Pro Tip:</strong> Accuracy = Bonus coins!</p>
  </div>
</div>

<div className="modal-footer">
  <button 
    className="cancel-btn" 
    onClick={handleInstructionsClick}
    aria-label="Close instructions"
  >
    <span className="btn-icon">✖️</span>
    <span className="btn-text">Cancel</span>
  </button>
  <button 
    className="start-btn" 
    onClick={handleStartQuiz}
    aria-label="Begin quiz"
  >
    <span className="btn-icon">🚀</span>
    <span className="btn-text">Start</span>
  </button>
</div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;