import React from 'react';

interface RadioButtonProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <div className={`w-12 h-6 rounded-full cursor-pointer ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}>
        <div className={`w-6 h-6 rounded-full bg-white shadow transform transition-transform ${checked ? 'translate-x-6' : ''}`}
        />
      </div>
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

export default RadioButton;
