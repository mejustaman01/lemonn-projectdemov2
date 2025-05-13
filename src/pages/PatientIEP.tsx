import React from 'react';
import IEPTracker from '../components/IEPTracker';
import { useParams } from 'react-router-dom';

interface PatientIEPParams {
  id: string;
}

const PatientIEP: React.FC = () => {
  const { id } = useParams<PatientIEPParams>();
  
  // In a real application, you would fetch the patient data based on the id
  // This is just a placeholder
  const patientName = id === '1' ? 'John Smith' : 'Patient';
  
  return <IEPTracker patientId={id || ''} patientName={patientName} />;
};

export default PatientIEP;