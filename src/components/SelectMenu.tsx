interface SelectOption {
  label: string;
  value: string;
}

export default function SelectMenu({
  options,
  label,
  name,
}: {
  options: SelectOption[];
  label: string;
  name: string;
}) {
  return (
    <div>
      <select name={name} defaultValue="" className="select ph2 pv1 br2 bn">
        <option value="" disabled>
          {label}
        </option>
        {options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
