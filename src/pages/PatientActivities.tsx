import React, { useState } from 'react';
import { ArrowLeft, Play, Clock, Target, Award, BarChart2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useParams } from 'react-router-dom';

const PatientActivities: React.FC = () => {
  const { id } = useParams();
  const [currentActivity, setCurrentActivity] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const activities = [
    {
      id: 1,
      title: 'Animal Recognition',
      description: 'Identify different animals from pictures',
      duration: '5-10 mins',
      difficulty: 'Easy',
      progress: 60,
      category: 'Vocabulary',
    },
    {
      id: 2,
      title: 'Emotion Matching',
      description: 'Match emotions with facial expressions',
      duration: '10-15 mins',
      difficulty: 'Medium',
      progress: 30,
      category: 'Social Skills',
    },
    {
      id: 3,
      title: 'Following Directions',
      description: 'Listen and follow simple instructions',
      duration: '15-20 mins',
      difficulty: 'Hard',
      progress: 0,
      category: 'Comprehension',
    },
  ];

  const handleActivityClick = (activityNumber: number) => {
    setCurrentActivity(activityNumber);
    setShowCorrect(false);
  };

  const handleAnswerClick = (answer: string) => {
    if (answer === 'Cat') {
      setShowCorrect(true);
    }
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
    if (currentActivity === 1) {
      return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">What Animal is This?</h2>
              <p className="mt-2 text-gray-600">Look at the picture and select the correct animal</p>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg" 
                alt="Cat" 
                className="w-96 h-96 object-cover rounded-lg shadow-md"
              />
              {showCorrect && (
                <div className="absolute inset-0 bg-green-500 bg-opacity-30 rounded-lg flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                    <Award className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-600">Excellent!</h3>
                    <p className="text-gray-600 mt-2">That's the correct answer!</p>
                  </div>
                </div>
              )}
            </div>
            
            {!showCorrect && (
              <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                {['Cat', 'Dog', 'Mouse'].map((animal) => (
                  <Button
                    key={animal}
                    onClick={() => handleAnswerClick(animal)}
                    variant="outline"
                    className="py-6 text-lg hover:bg-green-50 transition-colors"
                  >
                    {animal}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
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

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Goals</h3>
                    <p className="text-sm text-gray-500">Track your progress</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <BarChart2 className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Statistics</h3>
                    <p className="text-sm text-gray-500">View your performance</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Achievements</h3>
                    <p className="text-sm text-gray-500">Your earned badges</p>
                  </div>
                </div>
              </div>
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