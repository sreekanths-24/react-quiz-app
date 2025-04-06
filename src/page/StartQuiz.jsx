import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function StartQuiz() {
  const [questions, setQuestions] = useState({});

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple');
      const responseQuestions = response.data.results;

      const formatedQuestions = responseQuestions.map((question) => ({
        ...question,
        answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
      }));

      setQuestions(formatedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl max-w-3xl w-full p-8 md:p-10 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 text-center mb-4">
          📝 Quiz Instructions
        </h2>
        <p className="text-gray-600 text-lg text-center mb-6">
          Welcome to the Quiz! Please read the following instructions carefully before you begin:
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-700 text-base leading-relaxed">
          <li><strong>10 questions</strong> total. Each has <strong>1 correct answer</strong>.</li>
          <li><strong>One question</strong> shown at a time.</li>
          <li>Select an answer and click <strong>"Next"</strong>.</li>
          <li><strong>No going back</strong> after answering.</li>
          <li>Final page shows your <strong>score & summary</strong>.</li>
          <li><strong>Read questions carefully</strong>.</li>
          <li>If there's a timer, <strong>stay within time limit</strong>.</li>
        </ul>
        <div className="mt-8 text-center">
          <Link
            to="/quiz"
            state={{ questions }}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 px-8 rounded-xl shadow-md transition duration-300 transform hover:scale-105"
          >
            🚀 Start Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StartQuiz;
