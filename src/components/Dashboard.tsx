import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from './ui/Button';
import PatientTable from './PatientTable';
import AddPatientForm from './AddPatientForm';
import { Patient } from '../types';

// Sample data
const initialPatients: Patient[] = [
  {
    id: '1',
    name: 'Yash Maheshwari',
    age: 12,
    diagnosis: 'ADHD',
    upcomingSession: 'May 15th, 2025',
  },
  {
    id: '2',
    name: 'Rashmika Chauhan',
    age: 17,
    diagnosis: 'ASD',
    upcomingSession: 'May 12th, 2025',
  },
  {
    id: '3',
    name: 'Manish Phulke',
    age: 10,
    diagnosis: 'ASD',
    upcomingSession: 'May 20th, 2025',
  },
  {
    id: '4',
    name: 'Shweta Mishra',
    age: 16,
    diagnosis: 'Speech Delay',
    upcomingSession: null,
  },
  {
    id: '5',
    name: 'Manisha Kamble',
    age: 19,
    diagnosis: 'ASD',
    upcomingSession: 'May 18th, 2025',
  },
  {
    id: '6',
    name: 'Jagjeet Singh',
    age: 11,
    diagnosis: 'ADHD',
    upcomingSession: 'May 22nd, 2025',
  },
];

const Dashboard: React.FC = () => {
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = (newPatient: Patient) => {
    setPatients([...patients, { ...newPatient, id: (patients.length + 1).toString() }]);
    setShowAddPatient(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showAddPatient ? (
        <AddPatientForm 
          onSave={handleAddPatient} 
          onCancel={() => setShowAddPatient(false)} 
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hello <span className="text-green-600">Aman!</span>
              </h1>
              <p className="text-gray-600 mt-1">Welcome to Lemonn</p>
            </div>
            <Button 
              leftIcon={<Plus size={16} />}
              onClick={() => setShowAddPatient(true)}
              className="mt-4 sm:mt-0"
            >
              Add Patient
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-end">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search patients..."
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <PatientTable patients={filteredPatients} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;