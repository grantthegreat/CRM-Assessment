import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const questions = [
  {
    text: "How many active clients does your drone service business currently manage?",
    options: ["Less than 10", "11-15", "16-25", "More than 25"]
  },
  {
    text: "What's the size of your team (including yourself)?",
    options: ["1-2", "3-5", "6-10", "More than 10"]
  },
  {
    text: "What's your average project size in USD?",
    options: ["Less than $2,500", "$2,501 - $5,000", "$5,001 - $7,500", "$7,501 - $10,000", "More than $10,000"]
  },
  {
    text: "What's your average sales cycle length?",
    options: ["Less than 1 month", "1-3 months", "3-6 months", "More than 6 months"]
  },
  {
    text: "What's your client retention rate?",
    options: ["Less than 25%", "26-50%", "51-75%", "More than 75%"]
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
        
        <h3 className="text-xl font-bold mb-2 text-[#FFD43D]">Your Answers:</h3>
        <ul className="mb-4">
          {questions.map((question, index) => (
            <li key={index} className="mb-2">
              <p className="font-semibold">{question.text}</p>
              <p>Your answer: {answers[index]}</p>
            </li>
          ))}
        </ul>
        
        <h3 className="text-xl font-bold mb-2 text-[#FFD43D]">How We Calculate Your Score:</h3>
        <p className="mb-4">
          For each question, we assign a value from 0 to 3 based on your answer, with 0 representing the least need for a CRM and 3 representing the highest need. These values are then summed up to give your total score. The maximum possible score is {questions.length * 3}, indicating a strong need for a CRM system.
        </p>
        
        <button 
          onClick={() => window.open('https://app.apollo.io/#/meet/inbound-router/jve-d9j-9xk', '_blank')}
          className="bg-[#FFD43D] text-[#090B1A] px-4 py-2 rounded hover:bg-[#FFD43D]/80 transition-colors"
        >
          Get a Free Consultation
        </button>
      </div>
    );
  }

  // ... (rest of the component code remains the same)
};

export default CRMAssessment;
