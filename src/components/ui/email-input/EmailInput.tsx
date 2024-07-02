import React from 'react';
import styles from './EmailInput.module.css';

interface EmailInputProps {
    className?: string;
    placeholder?: string;
    name?: string;
    required?: boolean;
    value?: string;
    onChange?: (e: any) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
    className = '',
    placeholder = 'Email',
    name = 'email',
    required = true,
    value = '',
    onChange,
}) => {
    return (
        <input
            type="text"
            name={name}
            value={value}
            placeholder={placeholder}
            required={required}
            className={`${styles.emailInput} ${className}`}
            onChange={onChange}
        />
    );
};

export default EmailInput;