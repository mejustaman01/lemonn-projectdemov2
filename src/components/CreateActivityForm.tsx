import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

interface CreateActivityFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const CreateActivityForm: React.FC<CreateActivityFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    therapyGoalTypes: [] as string[],
    smartGoal: '',
    therapyPhase: '',
    sessionLength: '',
    activityTypes: [] as string[],
    currentInterests: '',
    attentionSpan: '',
    sensoryPreferences: [] as string[],
    lastActivityResponse: '',
    challengingBehaviors: [] as string[],
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
    onSave();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Generate Activities</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Session Context */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Context</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Therapy Goal Types"
              name="therapyGoalTypes"
              value={formData.therapyGoalTypes}
              onChange={(e) => handleMultiSelect('therapyGoalTypes', Array.from(e.target.selectedOptions, option => option.value))}
              options={[
                { value: 'expressiveLanguage', label: 'Expressive Language' },
                { value: 'receptiveLanguage', label: 'Receptive Language' },
                { value: 'articulation', label: 'Articulation' },
                { value: 'socialCommunication', label: 'Social Communication' },
                { value: 'pragmatics', label: 'Pragmatics' },
                { value: 'imitation', label: 'Imitation' },
                { value: 'attentionSpan', label: 'Attention Span' },
              ]}
              multiple
              required
            />

            <Input
              label="SMART Goal"
              name="smartGoal"
              value={formData.smartGoal}
              onChange={handleInputChange}
              required
            />

            <Select
              label="Current Therapy Phase"
              name="therapyPhase"
              value={formData.therapyPhase}
              onChange={handleInputChange}
              options={[
                { value: 'baseline', label: 'Baseline' },
                { value: 'acquisition', label: 'Acquisition' },
                { value: 'generalization', label: 'Generalization' },
                { value: 'maintenance', label: 'Maintenance' },
              ]}
              required
            />

            <Select
              label="Session Length Preference"
              name="sessionLength"
              value={formData.sessionLength}
              onChange={handleInputChange}
              options={[
                { value: '5', label: '5 minutes' },
                { value: '10', label: '10 minutes' },
                { value: '15', label: '15 minutes' },
                { value: '20', label: '20 minutes' },
              ]}
              required
            />

            <Select
              label="Preferred Activity Type"
              name="activityTypes"
              value={formData.activityTypes}
              onChange={(e) => handleMultiSelect('activityTypes', Array.from(e.target.selectedOptions, option => option.value))}
              options={[
                { value: 'storyBased', label: 'Story-based' },
                { value: 'visual', label: 'Visual' },
                { value: 'musicBased', label: 'Music-based' },
                { value: 'gameBased', label: 'Game-based' },
                { value: 'rolePlay', label: 'Role Play' },
                { value: 'physicalTask', label: 'Physical Task' },
                { value: 'puzzle', label: 'Puzzle' },
              ]}
              multiple
              required
            />

            <Input
              label="Current Interests of Child"
              name="currentInterests"
              value={formData.currentInterests}
              placeholder="e.g., Dinosaurs, Cars, Princesses"
              onChange={handleInputChange}
              required
            />

            <Select
              label="Attention Span"
              name="attentionSpan"
              value={formData.attentionSpan}
              onChange={handleInputChange}
              options={[
                { value: 'short', label: 'Short (<5 min)' },
                { value: 'moderate', label: 'Moderate (5-10 min)' },
                { value: 'long', label: 'Long (>10 min)' },
              ]}
              required
            />

            <Select
              label="Sensory Preferences"
              name="sensoryPreferences"
              value={formData.sensoryPreferences}
              onChange={(e) => handleMultiSelect('sensoryPreferences', Array.from(e.target.selectedOptions, option => option.value))}
              options={[
                { value: 'visual', label: 'Visual' },
                { value: 'auditory', label: 'Auditory' },
                { value: 'tactile', label: 'Tactile' },
                { value: 'movement', label: 'Movement' },
                { value: 'avoidant', label: 'Avoidant' },
              ]}
              multiple
              required
            />
          </div>
        </div>

        {/* Engagement Feedback */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Feedback</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Response to Last Activity"
              name="lastActivityResponse"
              value={formData.lastActivityResponse}
              onChange={handleInputChange}
              options={[
                { value: 'highlyEngaged', label: 'Highly Engaged' },
                { value: 'neutral', label: 'Neutral' },
                { value: 'disengaged', label: 'Disengaged' },
              ]}
              required
            />

            <Select
              label="Challenging Behaviors Observed"
              name="challengingBehaviors"
              value={formData.challengingBehaviors}
              onChange={(e) => handleMultiSelect('challengingBehaviors', Array.from(e.target.selectedOptions, option => option.value))}
              options={[
                { value: 'meltdowns', label: 'Meltdowns' },
                { value: 'avoidance', label: 'Avoidance' },
                { value: 'nonResponsiveness', label: 'Non-responsiveness' },
                { value: 'hyperactivity', label: 'Hyperactivity' },
                { value: 'none', label: 'None' },
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
            Generate Activities
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateActivityForm;