import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Home, Settings } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import IEPForm from './IEPForm';

interface IEPTrackerProps {
  patientId: string;
  patientName: string;
}

const IEPTracker: React.FC<IEPTrackerProps> = ({ patientId, patientName }) => {
  const [hasIEP, setHasIEP] = useState(false);
  const [showNewIEPForm, setShowNewIEPForm] = useState(false);

  // Placeholder data for the IEP if it exists
  const iepData = hasIEP ? {
    patientName: 'John Smith',
    age: '6 yrs (05/02/2019)',
    diagnosis: 'ASD Level 2',
    iepPeriod: '06/01/2025 – 11/30/2025',
    sessionsPerWeek: '2 × per week',
    sessionLength: '30 min',
    settings: ['Clinic', 'Home'],
    familyPriorities: 'Expressive language; reduce tantrums',
    lastUpdate: '05/02/2025',
    goals: [
      {
        id: '1',
        domain: 'Communication',
        goal: 'By 11/30, use 20 new words spontaneously at 80% accuracy',
        baseline: '5 words',
        criterion: '20 words',
        sessionsPerWeek: 2,
        dataMethod: 'Frequency',
        progress: 40,
        status: 'In Progress',
        reviewDate: '08/01/2025',
      },
      {
        id: '2',
        domain: 'Behavior',
        goal: 'By 11/30, tolerate transitions with no meltdown in 9/10 trials',
        baseline: '2/10',
        criterion: '9/10',
        sessionsPerWeek: 2,
        dataMethod: 'Rate',
        progress: 0,
        status: 'Not Started',
        reviewDate: '08/01/2025',
      },
      {
        id: '3',
        domain: 'Social',
        goal: 'By 11/30, initiate peer play twice/session in 4/5 sessions',
        baseline: '0',
        criterion: '2 initiations',
        sessionsPerWeek: 2,
        dataMethod: 'Frequency',
        progress: 0,
        status: 'Not Started',
        reviewDate: '08/01/2025',
      }
    ],
    upcomingActivities: [
      {
        id: '1',
        date: '06/03/2025',
        time: '10:00 am',
        title: 'Flashcard Naming Drill',
        domain: 'Communication',
        type: 'Clinic',
      },
      {
        id: '2',
        date: '06/05/2025',
        time: '4:00 pm',
        title: 'Sensory Bin Exploration',
        domain: 'Sensory',
        type: 'Home',
      },
      {
        id: '3',
        date: '06/08/2025',
        time: '10:00 am',
        title: 'Turn-Taking Board Game',
        domain: 'Social',
        type: 'Both',
      }
    ]
  } : null;

  const handleCreateIEP = () => {
    setShowNewIEPForm(true);
  };

  const handleIEPSave = () => {
    setHasIEP(true);
    setShowNewIEPForm(false);
  };

  const renderProgressBar = (progress: number) => {
    return (
      <div className="w-16 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  const getDomainColor = (domain: string): string => {
    const domainColors: Record<string, string> = {
      'Communication': 'default',
      'Behavior': 'danger',
      'Social': 'success',
      'Sensory': 'info',
    };
    
    return domainColors[domain] || 'secondary';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </div>

      {showNewIEPForm ? (
        <IEPForm patientName={patientName} onSave={handleIEPSave} />
      ) : !hasIEP ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">You don't have an IEP Created for {patientName}</h2>
          <p className="text-blue-600 mb-8">Create one by filling out the form below</p>
          <Button onClick={handleCreateIEP}>Create New IEP</Button>
        </div>
      ) : (
        <>
          {/* Header / Patient Overview Card */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <h1 className="text-2xl font-bold">{iepData?.patientName}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="text-sm text-gray-600">{iepData?.age}</div>
                  <Badge variant="info">{iepData?.diagnosis}</Badge>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-600">Family Priorities:</div>
                  <div className="text-sm">{iepData?.familyPriorities}</div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar size={14} className="mr-1" />
                      <span>IEP Period</span>
                    </div>
                    <div className="text-sm">{iepData?.iepPeriod}</div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Clock size={14} className="mr-1" />
                      <span>Session Length</span>
                    </div>
                    <div className="text-sm">{iepData?.sessionLength}</div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar size={14} className="mr-1" />
                      <span>Sessions/Week</span>
                    </div>
                    <div className="text-sm">{iepData?.sessionsPerWeek}</div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Settings size={14} className="mr-1" />
                      <span>Settings</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {iepData?.settings.map((setting, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{setting}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <div className="text-xs text-gray-600">Last IEP Update</div>
                    <div className="text-sm">{iepData?.lastUpdate}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit IEP
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Active IEP Goals Table */}
          <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">Active IEP Goals</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Domain
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SMART Goal
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Baseline → Criterion
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sess/Wk
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Review Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {iepData?.goals.map((goal) => (
                    <tr key={goal.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getDomainColor(goal.domain)}>
                          {goal.domain}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">{goal.goal}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{goal.baseline} → {goal.criterion}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{goal.sessionsPerWeek}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{goal.dataMethod}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {renderProgressBar(goal.progress)}
                          <span className="ml-2 text-sm text-gray-900">({goal.progress}%)</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={goal.status === 'In Progress' ? 'warning' : 'secondary'}
                        >
                          {goal.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{goal.reviewDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">History</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Activities & Calendar Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Activities List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold">Upcoming Activities</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {iepData?.upcomingActivities.map((activity) => (
                    <div key={activity.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{activity.title}</div>
                          <div className="flex items-center mt-1">
                            <Calendar size={14} className="text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600 mr-3">{activity.date}</span>
                            <Clock size={14} className="text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">{activity.time}</span>
                          </div>
                          <div className="flex space-x-2 mt-2">
                            <Badge variant={getDomainColor(activity.domain)}>
                              {activity.domain}
                            </Badge>
                            <div className="flex items-center">
                              {activity.type === 'Clinic' ? (
                                <Settings size={14} className="text-gray-500 mr-1" />
                              ) : activity.type === 'Home' ? (
                                <Home size={14} className="text-gray-500 mr-1" />
                              ) : (
                                <>
                                  <Settings size={14} className="text-gray-500 mr-1" />
                                  <Home size={14} className="text-gray-500 mr-1" />
                                </>
                              )}
                              <span className="text-sm text-gray-600">{activity.type}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Update</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold">Session Calendar</h2>
                </div>
                <div className="p-4">
                  {/* Calendar placeholder */}
                  <div className="border rounded-md p-4 h-80 flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-500">
                      <Calendar size={48} className="mx-auto mb-2 opacity-40" />
                      <p>Interactive calendar would display here</p>
                      <p className="text-sm mt-2">Shows scheduled sessions by day/week</p>
                    </div>
                  </div>
                  
                  {/* Color legend */}
                  <div className="mt-4 px-2">
                    <div className="text-sm font-medium text-gray-600 mb-2">Legend</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-xs">Communication</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-xs">Behavior</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-xs">Social</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IEPTracker;