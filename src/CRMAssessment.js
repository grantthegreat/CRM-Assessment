import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const questions = [
  {
    text: "How many active clients does your drone service business currently manage?",
    options: ["Less than 10", "10-20", "21-50", "More than 50"]
  },
  {
    text: "What's the size of your team (including yourself)?",
    options: ["1-2", "3-5", "6-10", "More than 10"]
  },
  {
    text: "What's your average project size in USD?",
    options: ["Less than $1,000", "$1,000 - $5,000", "$5,001 - $10,000", "More than $10,000"]
  },
  {
    text: "What's your average sales cycle length?",
    options: ["Less than 1 week", "1-2 weeks", "2-4 weeks", "More than 4 weeks"]
  },
  {
    text: "What's your client retention rate?",
    options: ["Less than 50%", "50-70%", "71-90%", "More than 90%"]
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
    if (score < 10) return "Your current setup seems to be working well for now. However, as you grow, consider exploring CRM options to streamline your processes.";
    if (score < 20) return "You're at a stage where a CRM could significantly benefit your operations. It's time to seriously explore your options.";
    return "Based on your responses, implementing a CRM system should be a top priority. It could greatly enhance your organization, client management, and overall business efficiency.";
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
          onClick={() => window.open('https://app.apollo.io/#/meet/inbound-router/jve-d9j-9xk', '_blank')}
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
