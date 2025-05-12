import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

interface Activity {
  id: string;
  title: string;
  summary: string;
  patient: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Find the Right Animal',
    summary: 'Tap the animal that answers the WH question',
    patient: 'Aarav',
  },
  {
    id: '2',
    title: 'Make a Sandwich',
    summary: 'Drag food items to complete a sandwich',
    patient: 'Meera',
  },
];

const ActivityKanban: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Planned Activities</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4">
            {mockActivities.map((activity) => (
              <div
                key={activity.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{activity.summary}</p>
                    <p className="text-sm text-gray-500 mt-2">Patient: {activity.patient}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<FileText size={16} />}
                    >
                      Update
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      rightIcon={<ChevronRight size={16} />}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityKanban;