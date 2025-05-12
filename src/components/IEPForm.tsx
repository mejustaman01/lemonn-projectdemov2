import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Checkbox from './ui/Checkbox';

interface IEPFormProps {
  patientName: string;
  onSave: () => void;
}

const IEPForm: React.FC<IEPFormProps> = ({ patientName, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Communication Profile
    communicationStyles: [] as string[],
    communicateNeedsEffectively: '',
    initiateInteraction: '',
    understandSimpleInstructions: '',
    followTwoStepDirections: '',
    concerns: [] as string[],
    
    // Step 2: Goal Planning
    iepDuration: '',
    sessionsPerWeek: '',
    sessionLength: '',
    sessionSettings: [] as string[],
    goalDomains: [] as string[],
    familyPriorities: ['', '', ''],
    
    // Step 3: Daily Routines
    morningRoutine: '',
    afternoonRoutine: '',
    eveningRoutine: '',
    preferredActivityTypes: [] as string[],
    availableMaterials: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...(formData[name as keyof typeof formData] as string[] || []), value],
      });
    } else {
      setFormData({
        ...formData,
        [name]: (formData[name as keyof typeof formData] as string[]).filter(item => item !== value),
      });
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index: number, value: string, field: string) => {
    const newArray = [...(formData[field as keyof typeof formData] as string[])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">You don't have an IEP Created for {patientName}</h2>
        <p className="text-blue-600 mt-1">Create one by filling out the form below</p>
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Communication Profile</h3>
            
            <div className="mb-6">
              <label className="font-medium text-gray-700 mb-2 block">Communication Style:</label>
              <div className="grid grid-cols-2 gap-3">
                <Checkbox
                  id="verbal"
                  name="communicationStyles"
                  value="verbal"
                  label="Verbal"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="nonverbal"
                  name="communicationStyles"
                  value="nonverbal"
                  label="Non-verbal"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="limitedWords"
                  name="communicationStyles"
                  value="limitedWords"
                  label="Limited Words"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="gestures"
                  name="communicationStyles"
                  value="gestures"
                  label="Uses Gestures"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="aac"
                  name="communicationStyles"
                  value="aac"
                  label="Uses AAC / PECS"
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="font-medium text-gray-700 mb-2 block">Can the child communicate needs effectively?</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="communicateNeedsYes"
                      name="communicateNeedsEffectively"
                      value="yes"
                      checked={formData.communicateNeedsEffectively === 'yes'}
                      onChange={() => handleRadioChange('communicateNeedsEffectively', 'yes')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="communicateNeedsYes" className="ml-2 block text-sm text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="communicateNeedsNo"
                      name="communicateNeedsEffectively"
                      value="no"
                      checked={formData.communicateNeedsEffectively === 'no'}
                      onChange={() => handleRadioChange('communicateNeedsEffectively', 'no')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="communicateNeedsNo" className="ml-2 block text-sm text-gray-700">
                      No
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="font-medium text-gray-700 mb-2 block">Can the child initiate interaction?</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="initiateInteractionYes"
                      name="initiateInteraction"
                      value="yes"
                      checked={formData.initiateInteraction === 'yes'}
                      onChange={() => handleRadioChange('initiateInteraction', 'yes')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="initiateInteractionYes" className="ml-2 block text-sm text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="initiateInteractionNo"
                      name="initiateInteraction"
                      value="no"
                      checked={formData.initiateInteraction === 'no'}
                      onChange={() => handleRadioChange('initiateInteraction', 'no')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="initiateInteractionNo" className="ml-2 block text-sm text-gray-700">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="font-medium text-gray-700 mb-2 block">Can the child understand simple instructions?</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="understandInstructionsYes"
                      name="understandSimpleInstructions"
                      value="yes"
                      checked={formData.understandSimpleInstructions === 'yes'}
                      onChange={() => handleRadioChange('understandSimpleInstructions', 'yes')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="understandInstructionsYes" className="ml-2 block text-sm text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="understandInstructionsNo"
                      name="understandSimpleInstructions"
                      value="no"
                      checked={formData.understandSimpleInstructions === 'no'}
                      onChange={() => handleRadioChange('understandSimpleInstructions', 'no')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="understandInstructionsNo" className="ml-2 block text-sm text-gray-700">
                      No
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="font-medium text-gray-700 mb-2 block">Can the child follow two-step directions?</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="followDirectionsYes"
                      name="followTwoStepDirections"
                      value="yes"
                      checked={formData.followTwoStepDirections === 'yes'}
                      onChange={() => handleRadioChange('followTwoStepDirections', 'yes')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="followDirectionsYes" className="ml-2 block text-sm text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="followDirectionsNo"
                      name="followTwoStepDirections"
                      value="no"
                      checked={formData.followTwoStepDirections === 'no'}
                      onChange={() => handleRadioChange('followTwoStepDirections', 'no')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="followDirectionsNo" className="ml-2 block text-sm text-gray-700">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="font-medium text-gray-700 mb-2 block">Concerns related to:</label>
              <div className="grid grid-cols-2 gap-3">
                <Checkbox
                  id="speechClarity"
                  name="concerns"
                  value="speechClarity"
                  label="Speech clarity"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="echolalia"
                  name="concerns"
                  value="echolalia"
                  label="Echolalia"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="monotoneVoice"
                  name="concerns"
                  value="monotoneVoice"
                  label="Monotone or unusual voice"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="pragmatics"
                  name="concerns"
                  value="pragmatics"
                  label="Social use of language (pragmatics)"
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">IEP Planning & Activity Setup</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Select
                label="IEP Duration"
                id="iepDuration"
                name="iepDuration"
                placeholder="Select duration"
                options={[
                  { value: '3months', label: '3 months' },
                  { value: '6months', label: '6 months' },
                  { value: '9months', label: '9 months' },
                  { value: '12months', label: '12 months' },
                ]}
                value={formData.iepDuration}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Sessions per Week"
                id="sessionsPerWeek"
                name="sessionsPerWeek"
                type="number"
                min="1"
                max="10"
                placeholder="1-10"
                value={formData.sessionsPerWeek}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Select
                label="Session Length"
                id="sessionLength"
                name="sessionLength"
                placeholder="Select length"
                options={[
                  { value: '15min', label: '15 minutes' },
                  { value: '30min', label: '30 minutes' },
                  { value: '45min', label: '45 minutes' },
                  { value: '60min', label: '60 minutes' },
                ]}
                value={formData.sessionLength}
                onChange={handleInputChange}
                required
              />
              <div>
                <label className="font-medium text-gray-700 mb-2 block">Session Setting</label>
                <div className="grid grid-cols-2 gap-3">
                  <Checkbox
                    id="clinic"
                    name="sessionSettings"
                    value="clinic"
                    label="Clinic"
                    onChange={handleCheckboxChange}
                  />
                  <Checkbox
                    id="home"
                    name="sessionSettings"
                    value="home"
                    label="Home"
                    onChange={handleCheckboxChange}
                  />
                  <Checkbox
                    id="school"
                    name="sessionSettings"
                    value="school"
                    label="School"
                    onChange={handleCheckboxChange}
                  />
                  <Checkbox
                    id="telepractice"
                    name="sessionSettings"
                    value="telepractice"
                    label="Telepractice"
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="font-medium text-gray-700 mb-2 block">Goal Domain(s)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Checkbox
                  id="communication"
                  name="goalDomains"
                  value="communication"
                  label="Communication"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="social"
                  name="goalDomains"
                  value="social"
                  label="Social"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="behavior"
                  name="goalDomains"
                  value="behavior"
                  label="Behavior"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="sensory"
                  name="goalDomains"
                  value="sensory"
                  label="Sensory"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="fineMotor"
                  name="goalDomains"
                  value="fineMotor"
                  label="Fine Motor"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="grossMotor"
                  name="goalDomains"
                  value="grossMotor"
                  label="Gross Motor"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="adls"
                  name="goalDomains"
                  value="adls"
                  label="ADLs"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="academics"
                  name="goalDomains"
                  value="academics"
                  label="Academics"
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="font-medium text-gray-700 mb-2 block">Family Priorities (Top 3)</label>
              <div className="space-y-3">
                <Input
                  id="familyPriority1"
                  placeholder="Priority 1"
                  value={formData.familyPriorities[0]}
                  onChange={(e) => handleArrayChange(0, e.target.value, 'familyPriorities')}
                  required
                />
                <Input
                  id="familyPriority2"
                  placeholder="Priority 2"
                  value={formData.familyPriorities[1]}
                  onChange={(e) => handleArrayChange(1, e.target.value, 'familyPriorities')}
                  required
                />
                <Input
                  id="familyPriority3"
                  placeholder="Priority 3"
                  value={formData.familyPriorities[2]}
                  onChange={(e) => handleArrayChange(2, e.target.value, 'familyPriorities')}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Daily Routines & Activities</h3>
            
            <div className="mb-6">
              <label className="font-medium text-gray-700 mb-1">Daily Routine - Morning</label>
              <textarea
                id="morningRoutine"
                name="morningRoutine"
                placeholder="Describe morning routine"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                value={formData.morningRoutine}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="font-medium text-gray-700 mb-1">Daily Routine - Afternoon</label>
              <textarea
                id="afternoonRoutine"
                name="afternoonRoutine"
                placeholder="Describe afternoon routine"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                value={formData.afternoonRoutine}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="font-medium text-gray-700 mb-1">Daily Routine - Evening</label>
              <textarea
                id="eveningRoutine"
                name="eveningRoutine"
                placeholder="Describe evening routine"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                value={formData.eveningRoutine}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="font-medium text-gray-700 mb-2 block">Preferred Activity Types</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Checkbox
                  id="playBased"
                  name="preferredActivityTypes"
                  value="playBased"
                  label="Play-based"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="structuredDrills"
                  name="preferredActivityTypes"
                  value="structuredDrills"
                  label="Structured drills"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="visualSchedules"
                  name="preferredActivityTypes"
                  value="visualSchedules"
                  label="Visual schedules"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="sensory"
                  name="preferredActivityTypes"
                  value="sensory"
                  label="Sensory"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="socialStories"
                  name="preferredActivityTypes"
                  value="socialStories"
                  label="Social stories"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="academicTasks"
                  name="preferredActivityTypes"
                  value="academicTasks"
                  label="Academic tasks"
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="font-medium text-gray-700 mb-2 block">Materials Available</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Checkbox
                  id="flashcards"
                  name="availableMaterials"
                  value="flashcards"
                  label="Flashcards"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="sensoryBin"
                  name="availableMaterials"
                  value="sensoryBin"
                  label="Sensory bin"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="artSupplies"
                  name="availableMaterials"
                  value="artSupplies"
                  label="Art supplies"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="blocks"
                  name="availableMaterials"
                  value="blocks"
                  label="Blocks"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="pecsCards"
                  name="availableMaterials"
                  value="pecsCards"
                  label="PECS cards"
                  onChange={handleCheckboxChange}
                />
                <Checkbox
                  id="tablet"
                  name="availableMaterials"
                  value="tablet"
                  label="Tablet"
                  onChange={handleCheckboxChange}
                />
              </div>
              <Input
                className="mt-3"
                id="otherMaterials"
                name="otherMaterials"
                placeholder="Other materials"
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        <div className="px-6 py-4 bg-gray-50 flex justify-between">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" variant="primary">
              Create IEP
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default IEPForm;