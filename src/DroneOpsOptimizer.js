import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const questions = [
  // Lead Generation
  {
    text: "How often do you feel that potential leads are slipping through the cracks due to poor tracking and follow-up?",
    options: ["Rarely", "Occasionally", "Frequently", "Very Frequently"]
  },
  {
    text: "How much time do you estimate your team spends on manual lead tracking and qualification each week?",
    options: ["Less than 2 hours", "2-5 hours", "6-10 hours", "More than 10 hours"]
  },
  {
    text: "How consistent are your marketing efforts in nurturing leads throughout the sales process?",
    options: ["Very Consistent", "Somewhat Consistent", "Inconsistent", "We don't have a structured nurturing process"]
  },
  
  // Sales and Pipeline Management
  {
    text: "How confident are you that your sales team is pursuing qualified opportunities that match your ideal client profile?",
    options: ["Very Confident", "Somewhat Confident", "Not Very Confident", "Not Confident at All"]
  },
  {
    text: "How would you rate the visibility into your current sales pipeline and deal progression?",
    options: ["Excellent", "Good", "Fair", "Poor"]
  },
  {
    text: "On average, how long is your sales cycle from initial contact to closing a deal?",
    options: ["Less than 1 month", "1-3 months", "3-6 months", "More than 6 months"]
  },
  
  // Forecasting and Reporting
  {
    text: "How easily can you track and report on key metrics like lead conversion rates and customer lifetime value?",
    options: ["Very Easily", "Somewhat Easily", "With Difficulty", "We Can't Track These Metrics"]
  },
  {
    text: "How confident are you in your ability to identify upselling/cross-selling opportunities with existing clients?",
    options: ["Very Confident", "Somewhat Confident", "Not Very Confident", "Not Confident at All"]
  },
  
  // Project Management and Deliverables
  {
    text: "How often do you experience project management issues like missed deadlines or miscommunication with clients?",
    options: ["Rarely", "Occasionally", "Frequently", "Very Frequently"]
  },
  {
    text: "How would you rate your ability to maintain personalized communication and follow-up with clients throughout projects?",
    options: ["Excellent", "Good", "Fair", "Poor"]
  }
];
const DroneOpsOptimizer = () => {
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
    if (score < 10) return "Your current operations seem well-organized, but there's always room for improvement. Consider exploring CRM options to further streamline your processes.";
    if (score < 20) return "You're facing some common challenges that a CRM could help address. It's time to seriously explore your options to improve efficiency and growth.";
    return "Based on your responses, implementing a CRM system should be a top priority. It could significantly enhance your lead management, client relationships, and overall business efficiency.";
  };

  if (showResults) {
    const score = calculateScore();
    const recommendation = getRecommendation(score);
    return (
      <div className="bg-[#090B1A] text-[#EDEEF0] p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#FFD43D]">Your Optimization Results</h2>
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
          For each question, we assign a value from 0 to 3 based on your answer, with 0 representing the least need for a CRM and 3 representing the highest need. These values are then summed up to give your total score. The maximum possible score is {questions.length * 3}, indicating a strong need for a CRM system to optimize your drone operations.
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

  return (
    <div className="bg-[#090B1A] text-[#EDEEF0] p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#FFD43D]">Drone Ops Optimizer</h1>
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

export default DroneOpsOptimizer;
