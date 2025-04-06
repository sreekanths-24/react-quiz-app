import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState(location.state?.questions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  const decodeHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.documentElement.textContent;
  };

  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate("/");
    }
  }, [questions, navigate]);

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 text-xl font-semibold text-indigo-700">
        Loading questions...
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...currentQuestion,
      selected_answer: selected,
    };

    setQuestions(updatedQuestions);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelected(null);
    } else {
      navigate("/result", { state: { questions: updatedQuestions } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-2xl rounded-3xl max-w-3xl w-full p-8 md:p-10 animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="text-gray-700 text-lg text-center mb-6">
          {decodeHtml(currentQuestion.question)}
        </p>
        <div className="space-y-4">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => setSelected(answer)}
              className={`w-full px-5 py-3 rounded-xl border transition-all duration-300 ease-in-out transform text-left text-base font-medium shadow-sm ${
                selected === answer
                  ? "bg-indigo-600 text-white scale-105"
                  : "bg-gray-100 text-gray-800 hover:bg-indigo-100 hover:scale-105"
              }`}
            >
              {decodeHtml(answer)}
            </button>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleNext}
            disabled={!selected}
            className={`px-8 py-3 rounded-xl font-semibold text-lg transition duration-300 transform ${
              selected
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
