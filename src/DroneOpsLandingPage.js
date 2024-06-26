import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const DroneOpsLandingPage = ({ startAssessment }) => {
  return (
    <div className="bg-[#090B1A] text-[#EDEEF0] min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#FFD43D] mb-4">Drone Ops Optimizer</h1>
          <p className="text-xl">Streamline Your Drone Service Operations in Minutes</p>
        </header>

        <main>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Discover How to:</h2>
            <ul className="space-y-2">
              {[
                "Boost lead conversion rates",
                "Streamline your sales pipeline",
                "Improve project management efficiency",
                "Enhance client relationships",
                "Make data-driven decisions"
              ].map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="text-[#FFD43D] mr-2" size={20} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-[#100F0D] p-6 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold mb-4">Why Take the Assessment?</h2>
            <p className="mb-4">
              Our Drone Ops Optimizer assessment is designed specifically for Drone Service Providers. 
              In just 5 minutes, you'll get personalized insights into your operations and learn how 
              you can leverage a CRM to supercharge your business growth.
            </p>
            <button 
              onClick={startAssessment}
              className="bg-[#FFD43D] text-[#090B1A] px-6 py-3 rounded-full font-semibold flex items-center hover:bg-[#FFD43D]/80 transition-colors"
            >
              Start Your Free Assessment
              <ArrowRight className="ml-2" size={20} />
            </button>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">What You'll Get:</h2>
            <ul className="space-y-2">
              {[
                "A comprehensive analysis of your current operations",
                "Personalized recommendations for improvement",
                "Insights into how a CRM can address your specific challenges",
                "A clear picture of your business's growth potential"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="text-[#FFD43D] mr-2" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <footer className="mt-12 text-center">
          <p>© 2023 Drone Pros. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DroneOpsLandingPage;
