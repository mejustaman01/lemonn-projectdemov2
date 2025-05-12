import React from 'react';
import { FileText } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { Patient } from '../types';

interface PatientTableProps {
  patients: Patient[]
}

export default function PatientTable({ patients }: PatientTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Diagnosis
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Upcoming Session
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patients.map((patient: Patient) => (
            <tr key={patient.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {patient.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{patient.age}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={patient.diagnosis === 'active' ? 'success' : 'warning'}>
                  {patient.diagnosis}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {patient.upcomingSession || (
                    <span className="text-gray-500">No session scheduled</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end items-center space-x-2">
                  <Button 
                    variant="primary" 
                    size="sm"
                    rightIcon={<FileText size={14} />}
                    onClick={() => window.location.href = `/activities/${patient.id}`}
                  >
                    Activities
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;