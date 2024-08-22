import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface SelectInputProps {
    label: string;
    name: string;
    options: { value: number; label: string }[];
    inline?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({ label, name, options, inline }) => {
    return (
        <div style={{ display: inline ? 'inline-block' : 'block', marginRight: inline ? '1px' : '0' }}>
            {label && <label htmlFor={name}>{label}:</label>}
            <Field as="select" name={name}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Field>
            <ErrorMessage className="checkout-field-error" name={name} component="span" />
        </div>
    );
};

export default SelectInput;
