import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaLightbulb } from 'react-icons/fa';
import questionsData from '../data/questions.json';

const Quiz = ({ playerName, onQuizEnd, darkMode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load questions from JSON file
    setQuestions(questionsData);
    setLoading(false);
    setIsTimerActive(true);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !showResult) {
      handleOptionSelect('');
    }
  }, [timer, isTimerActive, showResult]);

  const handleOptionSelect = (option) => {
    if (showResult) return;
    
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

  if (loading || !currentQuestion) {
    return <div className={`loading-screen ${darkMode ? 'dark' : ''}`}>Loading questions...</div>;
  }

  return (
    <div className={`quiz-container ${darkMode ? 'dark' : ''}`}>
      <div className="quiz-header">
        <div className="player-info">
          
          <span className="score-display">Score: {score}</span>
        </div>
        <div className="timer">Time left: {timer}s</div>
      </div>
      
      <div className="progress-indicator">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>
      
      <div className="question-container">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        {showHint && currentQuestion.hint && (
          <div className="hint-box">
            <p><strong>Hint:</strong> {currentQuestion.hint}</p>
          </div>
        )}
        
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option ${
                selectedOptions[currentQuestionIndex] === option ? 'selected' : ''
              } ${
                showResult 
                  ? option === currentQuestion.correctAnswer 
                    ? 'correct' 
                    : selectedOptions[currentQuestionIndex] === option 
                      ? 'incorrect' 
                      : ''
                  : ''
              }`}
              onClick={() => !showResult && handleOptionSelect(option)}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>
        
        {answerStatus && (
          <div className={`answer-status ${answerStatus}`}>
            {answerStatus === 'correct' 
              ? '✅ Correct!' 
              : `❌ Incorrect! The correct answer is: ${currentQuestion.correctAnswer}`}
          </div>
        )}
      </div>
      
      <div className="quiz-footer">
        {currentQuestion.hint && (
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
            <FaArrowLeft /> Previous
          </button>
          
          <button 
            className="nav-btn next-btn" 
            onClick={handleNextQuestion}
            disabled={!selectedOptions[currentQuestionIndex] && !showResult}
          >
            {currentQuestionIndex === questions.length - 1 && showResult ? 'Finish' : 'Next'} <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;