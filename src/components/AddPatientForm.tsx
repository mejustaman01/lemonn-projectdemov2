import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import RadioGroup from './ui/RadioGroup';
import Checkbox from './ui/Checkbox';
import { Patient } from '../types';

interface AddPatientFormProps {
  onSave: (patient: Patient) => void;
  onCancel: () => void;
}

const AddPatientForm: React.FC<AddPatientFormProps> = ({ onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: '',
    preferredName: '',
    dateOfBirth: '',
    gender: '',
    
    // Diagnosis
    primaryDiagnosis: [] as string[],
    severityLevel: '',
    
    // Communication
    primaryCommunicationMode: '',
    homeLanguages: [] as string[],
    preferredLanguage: '',
    
    // Behavior & Attention
    attentionSpan: '',
    followingInstructions: '',
    behavioralConsiderations: [] as string[],
    
    // Sensory Profile
    showSensoryProfile: false,
    visual: '',
    auditory: '',
    tactile: '',
    movement: '',
    tasteSmell: '',
    
    // Interests
    favoriteTopics: [] as string[],
    learningStylePreference: [] as string[],
    
    // Therapy Goals
    therapyGoals: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelect = (name: string, value: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...(formData[name as keyof typeof formData] as string[]), value],
      });
    } else {
      setFormData({
        ...formData,
        [name]: (formData[name as keyof typeof formData] as string[]).filter(item => item !== value),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: 'new',
      name: formData.fullName,
      age: calculateAge(formData.dateOfBirth),
      diagnosis: formData.primaryDiagnosis.join(', '),
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

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Add a new patient</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Preferred Name"
                name="preferredName"
                value={formData.preferredName}
                onChange={handleInputChange}
              />
              <Input
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
              <div>
                <label className="font-medium text-gray-700 mb-1">Gender</label>
                <RadioGroup
                  name="gender"
                  options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'nonBinary', label: 'Non-binary' },
                    { value: 'preferNotToSay', label: 'Prefer not to say' },
                  ]}
                  value={formData.gender}
                  onChange={(value) => setFormData({ ...formData, gender: value })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Diagnosis & Clinical Profile</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="font-medium text-gray-700 mb-2 block">Primary Diagnosis</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Autism Spectrum Disorder (ASD)',
                    'Speech Sound Disorder',
                    'Expressive Language Delay',
                    'Receptive Language Delay',
                    'Mixed Expressive-Receptive Language Disorder',
                    'Apraxia of Speech',
                    'Stuttering',
                    'Social Communication Disorder',
                    'Down Syndrome',
                    'ADHD',
                    'Global Developmental Delay',
                    'Hearing Impairment',
                    'Cerebral Palsy',
                    'Selective Mutism',
                    'Intellectual Disability',
                  ].map((diagnosis) => (
                    <Checkbox
                      key={diagnosis}
                      label={diagnosis}
                      checked={formData.primaryDiagnosis.includes(diagnosis)}
                      onChange={(e) => handleMultiSelect('primaryDiagnosis', diagnosis, e.target.checked)}
                    />
                  ))}
                </div>
              </div>
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
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Communication Profile</h3>
            <div className="grid grid-cols-1 gap-4">
              <Select
                label="Primary Communication Mode"
                name="primaryCommunicationMode"
                value={formData.primaryCommunicationMode}
                onChange={handleInputChange}
                options={[
                  { value: 'verbalSentences', label: 'Verbal (speaks in full sentences)' },
                  { value: 'verbalPhrases', label: 'Verbal (uses words/phrases)' },
                  { value: 'nonverbal', label: 'Non-verbal' },
                  { value: 'gestures', label: 'Gestures only' },
                  { value: 'signLanguage', label: 'Sign Language' },
                  { value: 'aac', label: 'AAC' },
                  { value: 'pecs', label: 'Uses PECS' },
                  { value: 'mixed', label: 'Mixed' },
                ]}
              />
              <div>
                <label className="font-medium text-gray-700 mb-2 block">Languages Used at Home</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'English',
                    'Hindi',
                    'Bengali',
                    'Tamil',
                    'Telugu',
                    'Marathi',
                    'Gujarati',
                    'Kannada',
                    'Urdu',
                    'Malayalam',
                    'Punjabi',
                  ].map((language) => (
                    <Checkbox
                      key={language}
                      label={language}
                      checked={formData.homeLanguages.includes(language)}
                      onChange={(e) => handleMultiSelect('homeLanguages', language, e.target.checked)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Behavior & Attention</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Attention Span"
                name="attentionSpan"
                value={formData.attentionSpan}
                onChange={handleInputChange}
                options={[
                  { value: 'lessThan2', label: 'Less than 2 minutes' },
                  { value: '2to5', label: '2-5 minutes' },
                  { value: '5to10', label: '5-10 minutes' },
                  { value: 'moreThan10', label: '10+ minutes' },
                ]}
              />
              <Select
                label="Following Instructions"
                name="followingInstructions"
                value={formData.followingInstructions}
                onChange={handleInputChange}
                options={[
                  { value: '1step', label: '1-step' },
                  { value: '2step', label: '2-step' },
                  { value: '3step', label: '3-step' },
                  { value: 'needsModeling', label: 'Needs modeling' },
                  { value: 'requiresRepetition', label: 'Requires repetition' },
                ]}
              />
            </div>
            <div>
              <label className="font-medium text-gray-700 mb-2 block">Behavioral Considerations</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Easily Distracted',
                  'Needs Movement Breaks',
                  'May Exhibit Tantrums',
                  'Needs Visual Schedules',
                  'Works Better with Rewards',
                  'Avoids Eye Contact',
                  'Sensory Avoider',
                  'Sensory Seeker',
                ].map((behavior) => (
                  <Checkbox
                    key={behavior}
                    label={behavior}
                    checked={formData.behavioralConsiderations.includes(behavior)}
                    onChange={(e) => handleMultiSelect('behavioralConsiderations', behavior, e.target.checked)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Sensory Profile</h3>
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-600">Enable Sensory Profile</span>
                <input
                  type="checkbox"
                  checked={formData.showSensoryProfile}
                  onChange={(e) => setFormData({ ...formData, showSensoryProfile: e.target.checked })}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
              </div>
            </div>
            
            {formData.showSensoryProfile && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'visual', label: 'Visual' },
                  { name: 'auditory', label: 'Auditory' },
                  { name: 'tactile', label: 'Tactile (Touch)' },
                  { name: 'movement', label: 'Movement (Vestibular)' },
                  { name: 'tasteSmell', label: 'Taste/Smell' },
                ].map((sense) => (
                  <Select
                    key={sense.name}
                    label={sense.label}
                    name={sense.name}
                    value={formData[sense.name as keyof typeof formData] as string}
                    onChange={handleInputChange}
                    options={[
                      { value: 'seeker', label: 'Seeker' },
                      { value: 'avoider', label: 'Avoider' },
                      { value: 'neutral', label: 'Neutral' },
                    ]}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Interests & Learning Style</h3>
            <div>
              <label className="font-medium text-gray-700 mb-2 block">Favorite Topics / Interests</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Animals', 'Food', 'Vehicles', 'Cartoons', 'Colors', 'Shapes',
                  'Numbers', 'School-related', 'Family', 'Festivals', 'Emotions',
                  'Nature', 'Sports', 'Music', 'Role Play', 'Superheroes',
                ].map((topic) => (
                  <Checkbox
                    key={topic}
                    label={topic}
                    checked={formData.favoriteTopics.includes(topic)}
                    onChange={(e) => handleMultiSelect('favoriteTopics', topic, e.target.checked)}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="font-medium text-gray-700 mb-2 block">Learning Style Preference</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Visual (pictures/icons)',
                  'Auditory (sound/music)',
                  'Kinesthetic (touch/interaction)',
                  'Gamified (levels, points)',
                  'Real-world Context',
                  'Story-based',
                  'Minimal Distractions',
                ].map((style) => (
                  <Checkbox
                    key={style}
                    label={style}
                    checked={formData.learningStylePreference.includes(style)}
                    onChange={(e) => handleMultiSelect('learningStylePreference', style, e.target.checked)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Therapy Goals</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'WH Questions',
                'Vocabulary Building',
                'Categorization',
                'Turn-taking',
                'Greetings / Social Skills',
                'Following Instructions',
                'Yes/No Questions',
                'Sequencing / Story Retell',
                'Prepositions',
                'Pronouns',
                'Sentence Building',
                'Picture Description',
                'Articulation / Sound Production',
                'AAC Skill Building',
                'Answering Questions from Visuals',
                'Listening Comprehension',
              ].map((goal) => (
                <Checkbox
                  key={goal}
                  label={goal}
                  checked={formData.therapyGoals.includes(goal)}
                  onChange={(e) => handleMultiSelect('therapyGoals', goal, e.target.checked)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          
          {currentStep < 7 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" variant="primary">
              Save Patient
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;