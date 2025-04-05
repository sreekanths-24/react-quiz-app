import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState(location.state?.questions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  const decodeHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.documentElement.textContent;
  };

  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate('/'); // Redirect to home if no questions are available
    }
  }, [questions, navigate]);

  if (!questions || questions.length === 0) {
    return <p>Loading questions...</p>; // Handle empty questions gracefully
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    // Update the current question with the selected answer
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...currentQuestion,
      selected_answer: selected,
    };

    setQuestions(updatedQuestions); // Update the questions array

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelected(null); // Reset selected answer for the next question
    } else {
      navigate('/result', { state: { questions: updatedQuestions } }); // Pass updated questions to the result page
    }
  };
  useEffect(() => {
    console.log('Updated questions:', questions);
  }, [questions]);
  
  return (
    <div className="quiz-background">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl mt-10 min-w-100">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="text-gray-700 text-lg mb-6 text-center">
          {decodeHtml(currentQuestion.question)}
        </p>
        <div className="space-y-4">
          {[...currentQuestion.answers]
          .sort(() => Math.random() - 0.5) // Shuffle the answers
          .map((answer, index) => (
            <button
              key={index}
              onClick={() => setSelected(answer)}
              className={`block w-full px-4 py-2 text-left rounded-lg border ${
                selected === answer
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              } hover:bg-indigo-100`}
            >
              {decodeHtml(answer)}
            </button>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleNext}
            disabled={!selected} // Disable until an answer is selected
            className={`px-6 py-2 rounded-xl font-semibold ${
              selected
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            } transition duration-300`}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;