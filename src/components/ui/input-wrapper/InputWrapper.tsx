import React, { ReactElement, useState, cloneElement, useEffect } from 'react';

export interface ValidationRuleResult {
    status: 'error' | 'success';
    message: string;
}

export interface InputValidationResult {
    isValid: boolean;
    details: ValidationRuleResult[];
}

interface InputWrapperProps {
    child: ReactElement<{ onChange: (e: any) => void }>;
    inputName: string;
    validator: (value: string) => InputValidationResult;
    allowShowErrors: boolean;
    showSuggestions: boolean;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ child, validator, allowShowErrors, inputName, showSuggestions }) => {
    const [validationRes, setValidationRes] = useState<InputValidationResult>({ isValid: true, details: [] });
    const [lastValue, setLastValue] = useState<string>('');

    useEffect(() => {
        const initialValidationResult = validator('');
        setValidationRes(initialValidationResult);
    }, []);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLastValue(value);
        const validationResult = validator(value);
        setValidationRes(validationResult);
        if (child.props.onChange) {
            child.props.onChange({ key: inputName, isValid: validationResult.isValid, details: validationResult.details, value: value });
        }
    };

    useEffect(() => {
        if (allowShowErrors) {
            const validationResult = validator(lastValue);
            setValidationRes(validationResult);
        }
    }, [allowShowErrors, lastValue, validator]);

    const childWithProps = cloneElement(child, { onChange: handleOnChange });

    return (
        <div className={`${allowShowErrors ? (validationRes.isValid ? 'success' : 'error') : ''} mt-20px`}>
            {childWithProps}
            {allowShowErrors && !validationRes.isValid && (
                <div className={`validationError mt-20px`}>
                    {validationRes.details.map((error, index) => (
                        <div key={index} className={`${error.status} ${index === validationRes.details.length - 1 ? 'last' : ''}`}>
                            {error.message}
                        </div>
                    ))}
                </div>
            )}
            {!allowShowErrors && showSuggestions && (
                <div className={`validationError sg mt-20px`}>
                    {validationRes.details.map((error, index) => (
                        <div key={index} className={`${index === validationRes.details.length - 1 ? 'last' : ''}`}>
                            {error.message}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InputWrapper;