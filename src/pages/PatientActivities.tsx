import React, { useState } from 'react';
import { ArrowLeft, Play, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import { useParams } from 'react-router-dom';

const PatientActivities: React.FC = () => {
  const { id } = useParams();
  const [currentActivity, setCurrentActivity] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const activities = [
    {
      id: 1,
      title: 'Animal Recognition',
      description: 'Identify different animals from pictures',
      duration: '5-10 mins',
      difficulty: 'Easy',
      progress: 60,
      category: 'Vocabulary',
      steps: [
        {
          image: 'https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg',
          question: 'What Animal is This?',
          options: ['Cat', 'Dog', 'Mouse'],
          correct: 'Cat'
        },
        {
          image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
          question: 'Which Animal Do You See?',
          options: ['Lion', 'Elephant', 'Giraffe'],
          correct: 'Elephant'
        },
        {
          image: 'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg',
          question: 'Name This Animal',
          options: ['Tiger', 'Lion', 'Leopard'],
          correct: 'Tiger'
        },
        {
          image: 'https://images.pexels.com/photos/1618606/pexels-photo-1618606.jpeg',
          question: 'What Animal is in the Picture?',
          options: ['Penguin', 'Duck', 'Parrot'],
          correct: 'Penguin'
        },
        {
          image: 'https://images.pexels.com/photos/133459/pexels-photo-133459.jpeg',
          question: 'Which Animal is This?',
          options: ['Snake', 'Lizard', 'Turtle'],
          correct: 'Turtle'
        }
      ]
    },
    {
      id: 2,
      title: 'Emotion Matching',
      description: 'Match emotions with facial expressions',
      duration: '10-15 mins',
      difficulty: 'Medium',
      progress: 30,
      category: 'Social Skills',
      steps: [
        {
          image: 'https://images.pexels.com/photos/3807755/pexels-photo-3807755.jpeg',
          question: 'How is This Person Feeling?',
          options: ['Happy', 'Sad', 'Angry'],
          correct: 'Happy'
        },
        {
          image: 'https://images.pexels.com/photos/3808743/pexels-photo-3808743.jpeg',
          question: 'What Emotion is Shown?',
          options: ['Surprised', 'Excited', 'Scared'],
          correct: 'Surprised'
        },
        {
          image: 'https://images.pexels.com/photos/3808849/pexels-photo-3808849.jpeg',
          question: 'Identify the Emotion',
          options: ['Sad', 'Tired', 'Bored'],
          correct: 'Sad'
        },
        {
          image: 'https://images.pexels.com/photos/3812743/pexels-photo-3812743.jpeg',
          question: 'What Feeling is This?',
          options: ['Angry', 'Frustrated', 'Upset'],
          correct: 'Angry'
        },
        {
          image: 'https://images.pexels.com/photos/3812787/pexels-photo-3812787.jpeg',
          question: 'How Does This Person Feel?',
          options: ['Excited', 'Happy', 'Surprised'],
          correct: 'Excited'
        }
      ]
    },
    {
      id: 3,
      title: 'Following Directions',
      description: 'Listen and follow simple instructions',
      duration: '15-20 mins',
      difficulty: 'Hard',
      progress: 0,
      category: 'Comprehension',
      steps: [
        {
          instruction: 'Touch your nose and then clap your hands',
          options: ['Touched nose then clapped', 'Clapped then touched nose', 'Only touched nose'],
          correct: 'Touched nose then clapped'
        },
        {
          instruction: 'Stand up, turn around, and sit down',
          options: ['Stood, turned, sat', 'Stood and sat', 'Only stood up'],
          correct: 'Stood, turned, sat'
        },
        {
          instruction: 'Put your hands on your head and count to three',
          options: ['Hands on head and counted', 'Only put hands on head', 'Only counted'],
          correct: 'Hands on head and counted'
        },
        {
          instruction: 'Close your eyes and touch your ears',
          options: ['Closed eyes and touched ears', 'Only closed eyes', 'Only touched ears'],
          correct: 'Closed eyes and touched ears'
        },
        {
          instruction: 'Jump twice and wave your hand',
          options: ['Jumped twice and waved', 'Only jumped', 'Only waved'],
          correct: 'Jumped twice and waved'
        }
      ]
    }
  ];

  const handleActivityClick = (activityNumber: number) => {
    setCurrentActivity(activityNumber);
    setCurrentStep(0);
    setShowFeedback(null);
  };

  const handleAnswerClick = (answer: string) => {
    const activity = activities.find(a => a.id === currentActivity);
    if (!activity) return;

    const isCorrect = activity.steps[currentStep].correct === answer;
    setShowFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setShowFeedback(null);
      if (currentStep < activity.steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentActivity(null);
        setCurrentStep(0);
      }
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Easy': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Hard': 'bg-red-100 text-red-800',
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderActivityContent = () => {
    const activity = activities.find(a => a.id === currentActivity);
    if (!activity) return null;

    const currentStepData = activity.steps[currentStep];

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">{currentStepData.question || currentStepData.instruction}</h2>
            <p className="mt-2 text-gray-600">
              {activity.id === 3 ? 'Follow the instruction and select what you did' : 'Select the correct answer'}
            </p>
          </div>
          
          {currentStepData.image && (
            <div className="relative">
              <img 
                src={currentStepData.image}
                alt="Activity"
                className="w-96 h-96 object-cover rounded-lg shadow-md"
              />
              {showFeedback && (
                <div className={`absolute inset-0 ${showFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'} bg-opacity-30 rounded-lg flex items-center justify-center`}>
                  <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                    <div className={`text-2xl font-bold ${showFeedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                      {showFeedback === 'correct' ? 'Excellent!' : 'Try Again!'}
                    </div>
                    <p className="text-gray-600 mt-2">
                      {showFeedback === 'correct' ? "That's the correct answer!" : 'Keep practicing!'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {!showFeedback && (
            <div className="grid grid-cols-1 gap-4 w-full max-w-md">
              {currentStepData.options.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleAnswerClick(option)}
                  variant="outline"
                  className="py-6 text-lg hover:bg-green-50 transition-colors"
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / activity.steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => {
              if (currentActivity !== null) {
                setCurrentActivity(null);
                setCurrentStep(0);
                setShowFeedback(null);
              } else {
                window.history.back();
              }
            }}
          >
            Back
          </Button>
        </div>

        {currentActivity === null ? (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Learning Activities</h1>
              <p className="mt-2 text-gray-600">Select an activity to begin the session</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {activity.category}
                        </span>
                        <h3 className="mt-2 text-xl font-semibold text-gray-900">
                          {activity.title}
                        </h3>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                        {activity.difficulty}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-gray-600">
                      {activity.description}
                    </p>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      {activity.duration}
                    </div>

                    {activity.progress > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{activity.progress}%</span>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${activity.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <Button
                        onClick={() => handleActivityClick(activity.id)}
                        className="w-full"
                        rightIcon={<Play size={16} />}
                      >
                        Start Activity
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          renderActivityContent()
        )}
      </div>
    </div>
  );
};

export default PatientActivities;