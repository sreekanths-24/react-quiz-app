import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];
  const [showAnswers, setShowAnswers] = useState(false); // State to toggle visibility

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center mt-10">
        <p>No results to display.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

  // Calculate total correct and wrong answers
  const totalQuestions = questions.length;
  const totalCorrect = questions.filter(
    (q) => q.selected_answer === q.correct_answer
  ).length;
  const totalWrong = totalQuestions - totalCorrect;

  return (
    <div
      className="mx-auto p-4 min-h-screen" 
      style={{ background: 'linear-gradient(135deg, #ff7eb3, #ff758c, #ff6a5e)' }}
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-bold text-gray-700">Total Questions</h3>
          <p className="text-2xl font-semibold text-indigo-600">{totalQuestions}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-bold text-gray-700">Correct Answers</h3>
          <p className="text-2xl font-semibold text-green-600">{totalCorrect}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-bold text-gray-700">Wrong Answers</h3>
          <p className="text-2xl font-semibold text-red-600">{totalWrong}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="text-center mb-8">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mr-4"
        >
          Try Again
        </button>
        <button
          onClick={() => setShowAnswers(true)} // Show answers on click
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Show My Answers
        </button>
      </div>

      {/* Questions and Answers */}
      {showAnswers && (
        <div className="grid grid-cols-12 gap-y-6 md:gap-2">
          {questions.map((question, index) => (
            <div
              key={index}
              className="col-span-12 lg:col-span-6 xl:col-span-3 bg-white p-4 rounded-lg shadow"
            >
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                {index + 1}. {question.question}
              </h4>
              <div className="space-y-2">
                {question.answers.map((answer, i) => {
                  const isCorrect = answer === question.correct_answer;
                  const isSelected = answer === question.selected_answer;
                  const bgColor = isCorrect
                    ? 'bg-green-100 border-green-500'
                    : isSelected && !isCorrect
                    ? 'bg-red-100 border-red-500'
                    : 'bg-gray-100';

                  return (
                    <div
                      key={i}
                      className={`px-4 py-2 rounded-lg border ${bgColor}`}
                    >
                      {answer}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Result;