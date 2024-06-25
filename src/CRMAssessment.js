import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const questions = [
  {
    text: "How many active clients does your drone service business currently manage?",
    options: ["Less than 10", "10-20", "21-50", "More than 50"]
  },
  {
    text: "How often do you experience data inconsistencies or communication gaps with clients?",
    options: ["Rarely", "Occasionally", "Frequently", "Very Frequently"]
  },
  {
    text: "How challenging is it to track multiple project progresses simultaneously?",
    options: ["Not Challenging", "Somewhat Challenging", "Very Challenging", "Extremely Challenging"]
  },
  {
    text: "How much time do you spend on manual tasks like follow-ups and project updates?",
    options: ["Less than 1 hour/day", "1-2 hours/day", "2-4 hours/day", "More than 4 hours/day"]
  },
  {
    text: "How difficult is it to generate reports or gain insights from your current data?",
    options: ["Not Difficult", "Somewhat Difficult", "Very Difficult", "Extremely Difficult"]
  }
];

const CRMAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return answers.reduce((total, answer, index) => {
      if (answer === null) return total;
      return total + questions[index].options.indexOf(answer);
    }, 0);
  };

  const getRecommendation = (score) => {
    if (score < 5) return "Your current spreadsheet setup seems to be working well for now. Keep monitoring your growth!";
    if (score < 10) return "You're approaching the point where a CRM could significantly benefit your operations. Consider exploring options.";
    return "It's time to seriously consider implementing a CRM. Your business could greatly benefit from the enhanced organization and automation.";
  };

  if (showResults) {
    const score = calculateScore();
    const recommendation = getRecommendation(score);
    return (
      <div className="bg-[#090B1A] text-[#EDEEF0] p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#FFD43D]">Your CRM Readiness Results</h2>
        <p className="mb-4">Based on your responses, here's our assessment:</p>
        <p className="font-semibold mb-2 text-[#FFD43D]">{recommendation}</p>
        <p className="mb-4">Score: {score} out of {questions.length * 3}</p>
        <button 
          onClick={() => window.location.href='https://dronepros.co/contact'}
          className="bg-[#FFD43D] text-[#090B1A] px-4 py-2 rounded hover:bg-[#FFD43D]/80 transition-colors"
        >
          Get a Free Consultation
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#090B1A] text-[#EDEEF0] p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#FFD43D]">DSP CRM Readiness Assessment</h1>
      <div className="mb-4">
        <p className="font-semibold mb-2">{questions[currentQuestion].text}</p>
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-2 rounded ${
                answers[currentQuestion] === option 
                  ? 'bg-[#FFD43D] text-[#090B1A]' 
                  : 'bg-[#100F0D] hover:bg-[#100F0D]/80'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={prev}
          disabled={currentQuestion === 0}
          className="flex items-center px-4 py-2 bg-[#100F0D] rounded disabled:opacity-50"
        >
          <ChevronLeft className="mr-2" size={16} />
          Previous
        </button>
        <button
          onClick={next}
          disabled={answers[currentQuestion] === null}
          className="flex items-center px-4 py-2 bg-[#FFD43D] text-[#090B1A] rounded disabled:opacity-50"
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          <ChevronRight className="ml-2" size={16} />
        </button>
      </div>
      <div className="mt-4 flex justify-center">
        {questions.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === currentQuestion ? 'bg-[#FFD43D]' : 'bg-[#100F0D]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CRMAssessment;
