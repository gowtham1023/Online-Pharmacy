import React from 'react';
import './HealthTips.css';

const tips = [
  "💧 Stay Hydrated: Drink at least 8 glasses of water every day.",
  "🥗 Eat a Balanced Diet: Include fruits, vegetables, protein, and whole grains.",
  "🏃‍♂️ Exercise Regularly: Aim for at least 30 minutes of physical activity daily.",
  "😴 Get Enough Sleep: 7-9 hours of quality sleep supports your immune system.",
  "🧘 Manage Stress: Practice meditation, deep breathing, or yoga to relax.",
  "🦷 Maintain Oral Hygiene: Brush twice a day and floss regularly.",
  "🚭 Avoid Smoking & Alcohol: These increase the risk of chronic diseases.",
  "🧴 Use Sunscreen: Protect your skin from harmful UV rays.",
  "🩺 Regular Checkups: Visit your doctor for routine health screenings.",
  "💊 Take Medicines as Prescribed: Follow dosage and schedule strictly.",
];

const HealthTips = () => {
  return (
    <div className="health-page">
      <div className="health-header">
        <h1>Health & Wellness Tips</h1>
        <p>Simple habits that make a big difference in your life.</p>
      </div>

      <ul className="tips-list">
        {tips.map((tip, index) => (
          <li key={index} className="tip-item">
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthTips;
