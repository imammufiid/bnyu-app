import clsx from "clsx";

export interface DropdownPickerOption<T> {
  value: T
  label: string
}

interface DropdownPickerProps<T> {
  options: DropdownPickerOption<T>[]
  selected: T
  className?: string; // applies to <select>
  onChange: (value: T) => void
}

export const DropdownPicker = <T,>(props: DropdownPickerProps<T>) => {
  const {options, selected, onChange, className} = props
  return (
    <div className={clsx('w-64', className)}>
      <select
        value={selected as any}
        onChange={(e) => {
          onChange(e.target.value as any)
        }}
        className="block w-full rounded-md bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white p-2"
      >
        {options.map((option) => (
          <option
            key={String(option.value)}
            value={String(option.value)}
            disabled={option.value === ''}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}