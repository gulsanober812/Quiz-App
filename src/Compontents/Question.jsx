import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaLightbulb } from 'react-icons/fa';

const Quiz = ({ playerName, onQuizEnd, darkMode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const questions = [
    {
      id: 1,
      question: "Which programming language is known as the 'mother of all languages'?",
      options: ["C", "Fortran", "Assembly", "COBOL"],
      correctAnswer: "Assembly",
      hint: "This low-level language directly corresponds to machine code."
    },
    // Add more questions...
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isSmallScreen = windowWidth <= 240;

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleOptionSelect('');
    }
  }, [timer, isTimerActive]);

  const handleOptionSelect = (option) => {
    setIsTimerActive(false);
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
    
    const isCorrect = option === currentQuestion.correctAnswer;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetQuestionState();
    } else {
      onQuizEnd(score);
    }
  };

  const handleNextQuestion = () => {
    if (showResult) {
      moveToNextQuestion();
    } else if (selectedOptions[currentQuestionIndex]) {
      handleOptionSelect(selectedOptions[currentQuestionIndex]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      resetQuestionState();
    }
  };

  const resetQuestionState = () => {
    setShowResult(false);
    setTimer(10);
    setIsTimerActive(true);
    setShowHint(false);
    setAnswerStatus(null);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const renderQuestion = () => {
    if (isSmallScreen) {
      return (
        <div className="micro-question">
          <h2 className="micro-question-text">
            {currentQuestion.question.length > 30 
              ? `${currentQuestion.question.substring(0, 27)}...`
              : currentQuestion.question}
          </h2>
          
          {showHint && currentQuestion.hint && (
            <div className="micro-hint">
              {currentQuestion.hint.length > 30
                ? `${currentQuestion.hint.substring(0, 27)}...`
                : currentQuestion.hint}
            </div>
          )}
          
          <div className="micro-options">
            {currentQuestion.options.map((opt, i) => (
              <button
                key={i}
                className={`micro-option ${
                  selectedOptions[currentQuestionIndex] === opt ? 'selected' : ''
                } ${
                  showResult 
                    ? opt === currentQuestion.correctAnswer 
                      ? 'correct' 
                      : selectedOptions[currentQuestionIndex] === opt 
                        ? 'incorrect' 
                        : ''
                    : ''
                }`}
                onClick={() => !showResult && handleOptionSelect(opt)}
                disabled={showResult}
              >
                {opt.length > 15 ? `${opt.substring(0, 12)}...` : opt}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="question-container">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        {showHint && currentQuestion.hint && (
          <div className="hint-box">
            <p><strong>Hint:</strong> {currentQuestion.hint}</p>
          </div>
        )}
        
        <div className="options-container">
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              className={`option ${
                selectedOptions[currentQuestionIndex] === opt ? 'selected' : ''
              } ${
                showResult 
                  ? opt === currentQuestion.correctAnswer 
                    ? 'correct' 
                    : selectedOptions[currentQuestionIndex] === opt 
                      ? 'incorrect' 
                      : ''
                  : ''
              }`}
              onClick={() => !showResult && handleOptionSelect(opt)}
              disabled={showResult}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`quiz-container ${darkMode ? 'dark' : ''}`}>
      <div className="quiz-header">
        <div className="player-info">
          {isSmallScreen ? (
            <span className="player-name">{playerName.substring(0, 8)}{playerName.length > 8 ? '...' : ''}</span>
          ) : (
            <span className="player-name">Player: {playerName}</span>
          )}
          <span className="score-display">Score: {score}</span>
        </div>
        <div className="timer">Time: {timer}s</div>
      </div>
      
      <div className="progress-indicator">
        Q{currentQuestionIndex + 1}/{totalQuestions}
      </div>
      
      {renderQuestion()}
      
      {answerStatus && (
        <div className={`answer-status ${answerStatus}`}>
          {answerStatus === 'correct' 
            ? '✅ Correct!' 
            : `❌ Incorrect! Correct: ${currentQuestion.correctAnswer.substring(0, 20)}${currentQuestion.correctAnswer.length > 20 ? '...' : ''}`}
        </div>
      )}
      
      <div className="quiz-footer">
        {!isSmallScreen && currentQuestion.hint && (
          <button 
            className="hint-btn" 
            onClick={toggleHint}
            disabled={showResult}
          >
            <FaLightbulb /> Hint
          </button>
        )}
        
        <div className="navigation-buttons">
          <button 
            className="nav-btn prev-btn" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            {isSmallScreen ? <FaArrowLeft /> : <> <FaArrowLeft /> Previous </>}
          </button>
          
          <button 
            className="nav-btn next-btn" 
            onClick={handleNextQuestion}
            disabled={!selectedOptions[currentQuestionIndex] && !showResult}
          >
            {isSmallScreen ? (
              <FaArrowRight />
            ) : (
              currentQuestionIndex === questions.length - 1 && showResult ? 'Finish' : 'Next'
            )} {!isSmallScreen && <FaArrowRight />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;