type Option = {
    key: string;
    value: string;
}

type SelectProps = {
    name: string;
    options: Option[];
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Add onChange as an optional prop
}

const Select = ({ name, options, defaultValue, onChange }: SelectProps) => {
    return (
        <select name={name} defaultValue={defaultValue} onChange={onChange}> {/* Set onChange prop */}
            {options.map((option) => (
                <option key={option.key} value={option.value}>{option.key}</option>
            ))}
        </select>
    )
}

export default Select