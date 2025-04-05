import * as React from "react";
// added npm install --legacy-peer-deps


import { MultiSelect } from "react-multi-select-component";
type SelectInputProps = {
  label: string;
  optionTitle: string;
  className?: string;
  options: SelectOption[];
  selectedOption: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  setSelectedOption: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};
export type SelectOption = {
  value: string;
  label: string;
};
export default function CustomMultiSelect({
  label,
  className = "sm:col-span-2",
  optionTitle,
  options = [],
  selectedOption,
  setSelectedOption,
}: SelectInputProps) {
  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
      >
        {label}
      </label>
      <div className="mt-2">
        <MultiSelect
          options={options}
          value={selectedOption}
          onChange={setSelectedOption}
          labelledBy={optionTitle}
        />
      </div>
    </div>
  );
}
