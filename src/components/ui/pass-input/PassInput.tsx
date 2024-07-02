import React, { useState } from 'react';
import styles from './PassInput.module.css';
import Image from 'next/image';

interface PassInputProps {
    className?: string;
    placeholder?: string;
    name?: string;
    required?: boolean;
    value?: string;
    onChange?: (e: any) => void;
}

const PassInput: React.FC<PassInputProps> = ({
    className = '',
    placeholder = 'Create your password',
    name = 'password',
    required = false,
    value = '',
    onChange,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className={styles.passInputContainer}>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    required={required}
                    className={`${styles.passInput} ${className}`}
                    onChange={onChange}
                />
                <Image
                    src={showPassword ? "/images/hide_pass_icon.svg" : "/images/show_pass_icon.svg"}
                    alt="Toggle Password Visibility"
                    className={styles.toggleIcon}
                    onClick={togglePasswordVisibility}
                    width={24}
                    height={24}
                />
            </div>
        </div>
    );
};

export default PassInput;