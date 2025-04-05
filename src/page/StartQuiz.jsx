import React from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

function StartQuiz() {
  const [questions, setQuestions] = useState({});


  const fetchQuestions = async () => { 
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple');
      const responseQuestions = response.data.results;

      const formatedQuestions = responseQuestions.map((question) => {        
        return {
          ...question,
          answers: [...question.incorrect_answers, question.correct_answer],
        };
      })

      setQuestions(formatedQuestions);
    }catch (error) {
      console.error('Error fetching questions:', error);
    }

    // console.log(response.data.results);
  };


  useEffect(() => { 
      fetchQuestions();
    
  }, []);

  return (
    <>
      <div className='quiz-background'>
        <div className='bg-white w-150 h-150  rounded-xl mx-3 text-black'>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl  mt-10">
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">📝 Quiz Instructions</h2>
            <p className="text-gray-700 text-base mb-6 text-center">
              Welcome to the Quiz! Please read the following instructions carefully before you begin:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-800">
              <li><strong>There are 10 questions</strong> in total. Each question has <strong>one correct answer</strong>.</li>
              <li><strong>Only one question</strong> will be shown at a time.</li>
              <li>Select your answer and click <strong>"Next"</strong> to move forward.</li>
              <li><strong>You cannot go back</strong> once you've answered a question.</li>
              <li>At the end, you’ll see your <strong>score and a summary</strong> of your answers.</li>
              <li>Make sure to <strong>read each question carefully</strong>.</li>
              <li>If a timer is present, <strong>answer within the time limit</strong>.</li>
            </ul>
            <div className="mt-6 text-center">
              <Link
                to="/quiz"
                state={{questions}}
                className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-indigo-700 transition duration-300">
                Start Quiz
              </Link>
            </div>
          </div>

        </div>  
      </div>
    </>
  )
}

export default StartQuiz