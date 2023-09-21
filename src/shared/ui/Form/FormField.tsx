import React from 'react';

interface IProps {
  type?: React.HTMLInputTypeAttribute;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: string;
  setState: (value: string) => void;
}

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
}: IProps) => {
  return (
    <div className=" flexStart flex-col w-full gap-4">
      <label className="w-full text-gray-100">{title}</label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          required
          className=" form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || 'text'}
          placeholder={placeholder}
          value={state}
          required
          className=" form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
