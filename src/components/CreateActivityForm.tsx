import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Checkbox from './ui/Checkbox';

interface CreateActivityFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const CreateActivityForm: React.FC<CreateActivityFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    patient: '',
    activityTitle: '',
    goals: [] as string[],
    activityType: '',
    responseType: [] as string[],
    visualStyle: [] as string[],
    difficulty: '',
    duration: '',
    reinforcement: '',
    notes: '',
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
    onSave();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Create New Activity</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Select Patient"
              name="patient"
              value={formData.patient}
              onChange={handleInputChange}
              options={[
                { value: 'aarav', label: 'Aarav' },
                { value: 'meera', label: 'Meera' },
              ]}
              required
            />
            <Input
              label="Activity Title"
              name="activityTitle"
              value={formData.activityTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-700 mb-2 block">Goals</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Vocabulary Building',
                'WH Questions',
                'Yes/No Questions',
                'Expressing Needs',
                'Following Instructions',
                'Social Skills',
                'Sequencing Events',
                'Sentence Formation',
                'Categorization',
                'Matching',
                'Object Identification',
                'Turn Taking',
                'Emotional Recognition',
                'Listening & Comprehension',
              ].map((goal) => (
                <Checkbox
                  key={goal}
                  label={goal}
                  checked={formData.goals.includes(goal)}
                  onChange={(e) => handleMultiSelect('goals', goal, e.target.checked)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Activity Type"
              name="activityType"
              value={formData.activityType}
              onChange={handleInputChange}
              options={[
                { value: 'tapToAnswer', label: 'Tap to Answer' },
                { value: 'dragAndDrop', label: 'Drag and Drop' },
                { value: 'pointAndSay', label: 'Point and Say' },
                { value: 'listenAndChoose', label: 'Listen and Choose' },
                { value: 'matchThePair', label: 'Match the Pair' },
                { value: 'sortIntoGroups', label: 'Sort into Groups' },
                { value: 'fillInTheBlank', label: 'Fill in the Blank' },
                { value: 'storyComprehension', label: 'Story Comprehension' },
                { value: 'yesNoChoice', label: 'Yes/No Choice' },
                { value: 'showAndTell', label: 'Show and Tell' },
                { value: 'repeatingWords', label: 'Repeating Words' },
                { value: 'pictureToWordMatch', label: 'Picture to Word Match' },
                { value: 'orderTheSequence', label: 'Order the Sequence' },
              ]}
              required
            />

            <div>
              <label className="font-medium text-gray-700 mb-2 block">Response Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Verbal',
                  'Tap/Touch',
                  'Pointing',
                  'Eye Gaze',
                  'Drag and Drop',
                  'Sign Language',
                  'Picture Exchange (PECS)',
                  'Typed/Written Answer',
                  'Click-based Response',
                ].map((type) => (
                  <Checkbox
                    key={type}
                    label={type}
                    checked={formData.responseType.includes(type)}
                    onChange={(e) => handleMultiSelect('responseType', type, e.target.checked)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700 mb-2 block">Visual Style</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Real-life Images',
                  'Cartoons',
                  'Minimalist Icons',
                  'High Contrast',
                  'PECS Symbols',
                  'Black & White',
                ].map((style) => (
                  <Checkbox
                    key={style}
                    label={style}
                    checked={formData.visualStyle.includes(style)}
                    onChange={(e) => handleMultiSelect('visualStyle', style, e.target.checked)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Select
                label="Difficulty Level"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                options={[
                  { value: 'beginner', label: 'Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' },
                ]}
                required
              />

              <Select
                label="Expected Duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                options={[
                  { value: 'lessThan2', label: 'Less than 2 minutes' },
                  { value: '2to5', label: '2-5 minutes' },
                  { value: '5to10', label: '5-10 minutes' },
                  { value: '10to15', label: '10-15 minutes' },
                ]}
                required
              />

              <Select
                label="Reinforcement Method"
                name="reinforcement"
                value={formData.reinforcement}
                onChange={handleInputChange}
                options={[
                  { value: 'stars', label: 'Stars' },
                  { value: 'clapping', label: 'Clapping Animation' },
                  { value: 'wellDone', label: '"Well Done" Text' },
                  { value: 'sticker', label: 'Virtual Sticker' },
                  { value: 'confetti', label: 'Visual Confetti' },
                  { value: 'gif', label: 'Reward GIF' },
                  { value: 'cheer', label: 'Cheer Sound' },
                  { value: 'progressBar', label: 'Progress Bar Animation' },
                  { value: 'praise', label: 'Personalized Praise Audio' },
                ]}
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium text-gray-700 mb-2 block">Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              rows={4}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Activity
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateActivityForm;