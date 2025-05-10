import React, { useState, useEffect, useCallback, useMemo } from 'react';

const HealthCalculator = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(175); 
  const [weight, setWeight] = useState(70); 
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState('');
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [targetCalories, setTargetCalories] = useState(0);
  const [idealWeight, setIdealWeight] = useState(0);
  const [bodyFat, setBodyFat] = useState(0);
  
  const activityMultipliers = useMemo(() => ({
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  }), []);
  
  const goalAdjustments = useMemo(() => ({
    lose: -500,
    maintain: 0,
    gain: 500
  }), []);
  
  const calculateMetrics = useCallback(() => {
    const numericHeight = parseFloat(height) || 0;
    const numericWeight = parseFloat(weight) || 0;
    const numericAge = parseInt(age) || 0;
    
    const heightInMeters = Math.max(numericHeight, 1) / 100;
    const calculatedBmi = numericWeight / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi);
    
    if (calculatedBmi < 18.5) {
      setBmiCategory('Underweight');
    } else if (calculatedBmi < 25) {
      setBmiCategory('Normal weight');
    } else if (calculatedBmi < 30) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obese');
    }
    
    let calculatedBmr;
    if (gender === 'male') {
      calculatedBmr = 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge + 5;
    } else {
      calculatedBmr = 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge - 161;
    }
    setBmr(Math.max(0, calculatedBmr));
    
    const activityMultiplier = activityMultipliers[activityLevel] || activityMultipliers.moderate;
    const calculatedTdee = calculatedBmr * activityMultiplier;
    setTdee(Math.max(0, calculatedTdee));
    
    const goalAdjustment = goalAdjustments[goal] || goalAdjustments.maintain;
    setTargetCalories(Math.max(1200, calculatedTdee + goalAdjustment));
    
    let baseIdealWeight;
    if (gender === 'male') {
      baseIdealWeight = 48 + 2.7 * (numericHeight - 152.4) / 2.54;
    } else {
      baseIdealWeight = 45.5 + 2.2 * (numericHeight - 152.4) / 2.54;
    }
    setIdealWeight(Math.max(0, baseIdealWeight));
    
    let calculatedBodyFat;
    if (gender === 'male') {
      calculatedBodyFat = 1.20 * calculatedBmi + 0.23 * numericAge - 16.2;
    } else {
      calculatedBodyFat = 1.20 * calculatedBmi + 0.23 * numericAge - 5.4;
    }
    calculatedBodyFat = Math.max(calculatedBodyFat, 3); 
    setBodyFat(calculatedBodyFat);
  }, [gender, age, height, weight, activityLevel, goal, activityMultipliers, goalAdjustments]);
  
  useEffect(() => {
    calculateMetrics();
  }, [calculateMetrics]);

  const handleAgeChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setAge(Math.max(0, value));
  };

  const handleHeightChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setHeight(Math.max(0, value));
  };

  const handleWeightChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setWeight(Math.max(0, value));
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 mt-25">
      <h1 className="text-3xl font-bold text-indigo-700">Health Metrics Calculator</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mt-6">
        <p className="text-lg text-gray-700 text-center">Enter your details below to calculate your health metrics.</p>
        
        <div className="mt-4">
          <label className="block text-gray-700">Gender:</label>
          <select className="w-full p-2 border rounded mt-1" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        
        <div className="mt-4">
          <label className="block text-gray-700">Age:</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded mt-1" 
            value={age} 
            min="0"
            onChange={handleAgeChange} 
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-gray-700">Height (cm):</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded mt-1" 
            value={height} 
            min="0"
            step="0.1"
            onChange={handleHeightChange} 
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-gray-700">Weight (kg):</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded mt-1" 
            value={weight} 
            min="0"
            step="0.1"
            onChange={handleWeightChange} 
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-gray-700">Activity Level:</label>
          <select className="w-full p-2 border rounded mt-1" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (light exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
            <option value="active">Active (hard exercise 6-7 days/week)</option>
            <option value="veryActive">Very Active (very hard exercise & physical job)</option>
          </select>
        </div>
        
        <div className="mt-4">
          <label className="block text-gray-700">Goal:</label>
          <select className="w-full p-2 border rounded mt-1" value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-bold text-indigo-700">Results:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <p className="text-gray-700">BMI: <span className="font-medium">{bmi.toFixed(1)}</span> <span className="text-indigo-600">({bmiCategory})</span></p>
            <p className="text-gray-700">BMR: <span className="font-medium">{Math.round(bmr)}</span> kcal/day</p>
            <p className="text-gray-700">TDEE: <span className="font-medium">{Math.round(tdee)}</span> kcal/day</p>
            <p className="text-gray-700">Target Calories: <span className="font-medium">{Math.round(targetCalories)}</span> kcal/day</p>
            <p className="text-gray-700">Ideal Weight: <span className="font-medium">{Math.round(idealWeight)}</span> kg</p>
            <p className="text-gray-700">Body Fat: <span className="font-medium">{bodyFat.toFixed(1)}</span>%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCalculator;