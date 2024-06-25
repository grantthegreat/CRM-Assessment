import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const questions = [
  {
    text: "How many active clients does your drone service business currently manage?",
    options: ["Less than 10", "10-20", "21-50", "More than 50"],
    category: "Client Management"
  },
  {
    text: "How many team members are involved in your sales and client management processes?",
    options: ["1-2", "3-5", "6-10", "More than 10"],
    category: "Team Size"
  },
  {
    text: "What's your average project size in dollars?",
    options: ["Less than $1,000", "$1,000 - $5,000", "$5,001 - $10,000", "More than $10,000"],
    category: "Project Value"
  },
  {
    text: "What's your typical sales cycle length?",
    options: ["Less than 1 week", "1-2 weeks", "2-4 weeks", "More than 4 weeks"],
    category: "Sales Process"
  },
  {
    text: "What's your current client retention rate?",
    options: ["Less than 50%", "50-70%", "71-90%", "More than 90%"],
    category: "Client Retention"
  },
  {
    text: "How often do you experience data inconsistencies or communication gaps with clients?",
    options: ["Rarely", "Occasionally", "Frequently", "Very Frequently"],
    category: "Data Management"
  },
  {
    text: "How challenging is it to track multiple project progresses simultaneously?",
    options: ["Not Challenging", "Somewhat Challenging", "Very Challenging", "Extremely Challenging"],
    category: "Project Management"
  },
  {
    text: "How much time do you spend on manual tasks like follow-ups and project updates?",
    options: ["Less than 1 hour/day", "1-2 hours/day", "2-4 hours/day", "More than 4 hours/day"],
    category: "Process Efficiency"
  },
  {
    text: "How difficult is it to generate reports or gain insights from your current data?",
    options: ["Not Difficult", "Somewhat Difficult", "Very Difficult", "Extremely Difficult"],
    category: "Reporting and Analytics"
  },
  {
    text: "What's your current lead conversion rate?",
    options: ["Less than 10%", "10-20%", "21-30%", "More than 30%"],
    category: "Sales Efficiency"
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
    const maxScore = questions.length * 3;
    const percentage = (score / maxScore) * 100;

    if (percentage < 30) return "Your current setup seems to be working well for now. Keep monitoring your growth and be prepared to implement a CRM as you scale.";
    if (percentage < 60) return "You're at a stage where a CRM could significantly benefit your operations. Consider exploring options to streamline your processes and improve client management.";
    return "It's crucial to implement a robust CRM system. Your business could greatly benefit from enhanced organization, automation, and data insights that a CRM provides.";
  };

  const getAreaFeedback = () => {
    const feedback = [];
    answers.forEach((answer, index) => {
      if (answer !== null) {
        const score = questions[index].options.indexOf(answer);
        if (score >= 2) {
          feedback.push({
            category: questions[index].category,
            issue: questions[index].text,
            answer: answer
          });
        }
      }
    });
    return feedback;
  };

  if (showResults) {
    const score = calculateScore();
    const recommendation = getRecommendation(score);
    const areaFeedback = getAreaFeedback();
    return (
      <div className="bg-[#090B1A] text-[#EDEEF0] p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#FFD43D]">Your CRM Readiness Results</h2>
        <p className="mb-4">Based on your responses, here's our assessment:</p>
        <p className="font-semibold mb-2 text-[#FFD43D]">{recommendation}</p>
        <p className="mb-4">Score: {score} out of {questions.length * 3}</p>
        
        <h3 className="text-xl font-bold mb-2 text-[#FFD43D]">Areas for Improvement:</h3>
        {areaFeedback.length > 0 ? (
          <ul className="list-disc pl-5 mb-4">
            {areaFeedback.map((item, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{item.category}:</span> {item.issue} (Your answer: {item.answer})
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4">Great job! You're doing well across all areas we assessed.</p>
        )}
        
        <p className="mb-4">A CRM system could help address these challenges by providing better organization, automation, and insights into your business processes.</p>
        
        <button 
          onClick={() => window.open('https://app.apollo.io/#/meet/inbound-router/jve-d9j-9xk', '_blank')}
          className="bg-[#FFD43D] text-[#090B1A] px-4 py-2 rounded hover:bg-[#FFD43D]/80 transition-colors"
        >
          Get a Free Consultation
        </button>
      </div>
    );
  }

  // ... rest of the component remains the same

};

export default CRMAssessment;
