import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];
  const [showAnswers, setShowAnswers] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <p className="text-lg text-indigo-700 font-semibold mb-4">No results to display.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const totalQuestions = questions.length;
  const totalCorrect = questions.filter(q => q.selected_answer === q.correct_answer).length;
  const totalWrong = totalQuestions - totalCorrect;

  const decodeHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.documentElement.textContent;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-2xl rounded-3xl max-w-5xl w-full p-8 md:p-10 animate-fade-in">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">Your Quiz Result</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-indigo-100 p-6 rounded-xl text-center shadow-md">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">Total Questions</h3>
            <p className="text-3xl font-bold text-indigo-800">{totalQuestions}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-xl text-center shadow-md">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Correct Answers</h3>
            <p className="text-3xl font-bold text-green-800">{totalCorrect}</p>
          </div>
          <div className="bg-red-100 p-6 rounded-xl text-center shadow-md">
            <h3 className="text-lg font-semibold text-red-700 mb-2">Wrong Answers</h3>
            <p className="text-3xl font-bold text-red-800">{totalWrong}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="text-center mb-10">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold transition mr-4"
          >
            Try Again
          </button>
          <button
            onClick={() => setShowAnswers(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold transition"
          >
            Show My Answers
          </button>
        </div>

        {/* Answers */}
        {showAnswers && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.map((question, index) => (
              <div key={index} className="bg-gray-100 p-5 rounded-xl shadow-md">
                <h4 className="text-md font-bold text-gray-800 mb-3">
                  {index + 1}. {decodeHtml(question.question)}
                </h4>
                <div className="space-y-2">
                  {question.answers.map((answer, i) => {
                    const isCorrect = answer === question.correct_answer;
                    const isSelected = answer === question.selected_answer;
                    const bgColor = isCorrect
                      ? 'bg-green-200 border-green-600 text-green-800'
                      : isSelected && !isCorrect
                      ? 'bg-red-200 border-red-600 text-red-800'
                      : 'bg-white border-gray-300 text-gray-700';

                    return (
                      <div
                        key={i}
                        className={`px-4 py-2 border rounded-lg ${bgColor}`}
                      >
                        {decodeHtml(answer)}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
