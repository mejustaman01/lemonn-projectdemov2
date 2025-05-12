import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { useParams } from 'react-router-dom';

const PatientActivities: React.FC = () => {
  const { id } = useParams();
  const [currentActivity, setCurrentActivity] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const handleActivityClick = (activityNumber: number) => {
    setCurrentActivity(activityNumber);
    setShowCorrect(false);
  };

  const handleAnswerClick = (answer: string) => {
    if (answer === 'Cat') {
      setShowCorrect(true);
    }
  };

  const renderActivityContent = () => {
    if (currentActivity === 1) {
      return (
        <div className="flex flex-col items-center space-y-8">
          <h2 className="text-2xl font-bold">What Animal is This?</h2>
          <img 
            src="https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg" 
            alt="Cat" 
            className="w-64 h-64 object-cover rounded-lg"
          />
          {showCorrect ? (
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-4">Correct Answer!</div>
              <div className="confetti-animation">🎉</div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <Button onClick={() => handleAnswerClick('Cat')}>Cat</Button>
              <Button onClick={() => handleAnswerClick('Dog')}>Dog</Button>
              <Button onClick={() => handleAnswerClick('Mouse')}>Mouse</Button>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => {
            if (currentActivity !== null) {
              setCurrentActivity(null);
              setShowCorrect(false);
            } else {
              window.history.back();
            }
          }}
        >
          Back
        </Button>
      </div>

      {currentActivity === null ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Activities</h1>
          <div className="grid grid-cols-1 gap-4">
            <Button 
              variant="outline" 
              className="text-left px-6 py-4"
              onClick={() => handleActivityClick(1)}
            >
              Activity 1
            </Button>
            <Button 
              variant="outline" 
              className="text-left px-6 py-4"
              onClick={() => handleActivityClick(2)}
            >
              Activity 2
            </Button>
            <Button 
              variant="outline" 
              className="text-left px-6 py-4"
              onClick={() => handleActivityClick(3)}
            >
              Activity 3
            </Button>
          </div>
        </div>
      ) : (
        renderActivityContent()
      )}
    </div>
  );
};

export default PatientActivities;