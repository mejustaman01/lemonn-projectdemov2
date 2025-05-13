import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import { Patient } from '../types';

interface AddPatientFormProps {
  onSave: (patient: Patient) => void;
  onCancel: () => void;
}

const AddPatientForm: React.FC<AddPatientFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    // Patient Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    diagnosis: [] as string[],
    diagnosisDate: '',
    severityLevel: '',
    preferredLanguage: '',
    schoolingStatus: '',

    // Family / Environment
    primaryCaregiver: '',
    householdLanguages: [] as string[],
    parentalInvolvement: '',

    // Communication & Devices
    communicationMethods: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelect = (name: string, value: string[]) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: 'new',
      name: formData.fullName,
      age: calculateAge(formData.dateOfBirth),
      diagnosis: formData.diagnosis.join(', '),
      upcomingSession: null,
    });
  };

  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Add a new patient</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Patient Information Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />

            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'nonBinary', label: 'Non-binary' },
                { value: 'preferNotToSay', label: 'Prefer not to say' },
              ]}
              required
            />

            <Select
              label="Diagnosis"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={(e) => handleMultiSelect('diagnosis', Array.from(e.target.selectedOptions, option => option.value))}
              options={[
                { value: 'asd', label: 'ASD' },
                { value: 'adhd', label: 'ADHD' },
                { value: 'speechDelay', label: 'Speech Delay' },
                { value: 'apraxia', label: 'Apraxia' },
                { value: 'languageDisorder', label: 'Language Disorder' },
                { value: 'other', label: 'Other' },
              ]}
              multiple
              required
            />

            <Input
              label="Diagnosis Date"
              name="diagnosisDate"
              type="date"
              value={formData.diagnosisDate}
              onChange={handleInputChange}
              required
            />

            <Select
              label="Severity Level"
              name="severityLevel"
              value={formData.severityLevel}
              onChange={handleInputChange}
              options={[
                { value: 'mild', label: 'Mild' },
                { value: 'moderate', label: 'Moderate' },
                { value: 'severe', label: 'Severe' },
              ]}
              required
            />

            <Select
              label="Preferred Language"
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleInputChange}
              options={[
                { value: 'english', label: 'English' },
                { value: 'spanish', label: 'Spanish' },
                { value: 'hindi', label: 'Hindi' },
                { value: 'mandarin', label: 'Mandarin' },
                { value: 'arabic', label: 'Arabic' },
              ]}
              required
            />

            <Select
              label="Schooling Status"
              name="schoolingStatus"
              value={formData.schoolingStatus}
              onChange={handleInputChange}
              options={[
                { value: 'notInSchool', label: 'Not in school' },
                { value: 'mainstream', label: 'Mainstream school' },
                { value: 'special', label: 'Special school' },
                { value: 'homeschooling', label: 'Home schooling' },
              ]}
              required
            />
          </div>
        </div>

        {/* Family / Environment Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Family / Environment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Primary Caregiver Relationship"
              name="primaryCaregiver"
              value={formData.primaryCaregiver}
              onChange={handleInputChange}
              options={[
                { value: 'mother', label: 'Mother' },
                { value: 'father', label: 'Father' },
                { value: 'grandparent', label: 'Grandparent' },
                { value: 'guardian', label: 'Guardian' },
                { value: 'other', label: 'Other' },
              ]}
              required
            />

            <Select
              label="Household Language(s)"
              name="householdLanguages"
              value={formData.householdLanguages}
              onChange={(e) => handleMultiSelect('householdLanguages', Array.from(e.target.selectedOptions, option => option.value))}
              options={[
                { value: 'english', label: 'English' },
                { value: 'spanish', label: 'Spanish' },
                { value: 'hindi', label: 'Hindi' },
                { value: 'mandarin', label: 'Mandarin' },
                { value: 'arabic', label: 'Arabic' },
              ]}
              multiple
              required
            />

            <Select
              label="Parental Involvement Level"
              name="parentalInvolvement"
              value={formData.parentalInvolvement}
              onChange={handleInputChange}
              options={[
                { value: 'high', label: 'High' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ]}
              required
            />
          </div>
        </div>

        {/* Communication & Devices Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication & Devices</h3>
          <div className="grid grid-cols-1 gap-4">
            <Select
              label="Current Communication Method(s)"
              name="communicationMethods"
              value={formData.communicationMethods}
              onChange={(e) => handleMultiSelect('communicationMethods', Array.from(e.target.selectedOptions, option => option.value))}
              options={[
                { value: 'verbal', label: 'Verbal' },
                { value: 'gestures', label: 'Gestures' },
                { value: 'pecs', label: 'PECS' },
                { value: 'aacDevice', label: 'AAC device' },
                { value: 'signLanguage', label: 'Sign language' },
              ]}
              multiple
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Patient
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;