import { useState, useCallback, useImperativeHandle, forwardRef, useMemo } from "react";
import EmailInput from "./ui/email-input/EmailInput";
import InputWrapper, { InputValidationResult } from "./ui/input-wrapper/InputWrapper";
import PassInput from "./ui/pass-input/PassInput";

export type InputConfig = {
    name: string;
    type: string;
    showSuggestions?: boolean;
    validator: (value: any) => InputValidationResult;
};

interface FormInputsProps {
    inputConfigs: InputConfig[];
    onChange: (e: any) => void;
    allowShowErrors: boolean;
}

export interface FormState {
    isFormValid: boolean;
    formFields: Map<string, { isValid: boolean; value: any }>;
}

// Wrap the component with forwardRef
// eslint-disable-next-line react/display-name
const FormInputsBuilder = forwardRef(({ inputConfigs, onChange, allowShowErrors }: FormInputsProps, ref) => {
    
    const initialFormFields = useMemo(() => {
        const fields = new Map<string, { isValid: boolean; value: any }>();
        inputConfigs.forEach(config => {
            fields.set(config.name, { isValid: false, value: '' });
        });
        return fields;
    }, [inputConfigs]);
    
    const [formState, setFormState] = useState({
        isFormValid: false, // Form is initially invalid
        formFields: initialFormFields,
    });

    const storeCurrentValue = useCallback((data: any) => {
        const updatedFormFields = new Map(formState.formFields);
        updatedFormFields.set(data.key, { isValid: data.isValid, value: data.value });

        const isFormValid = Array.from(updatedFormFields.values()).every(field => field.isValid);

        setFormState({
            ...formState,
            formFields: updatedFormFields,
            isFormValid,
        });

        onChange({ formFields: updatedFormFields, isFormValid });
    }, [formState, onChange]);

    const resetFormValues = useCallback(() => {
        const resetFormFields = new Map<string, { isValid: boolean; value: any }>();
        inputConfigs.forEach(config => {
            resetFormFields.set(config.name, { isValid: false, value: '' });
        });

        setFormState({
            isFormValid: false,
            formFields: resetFormFields,
        });
    }, [inputConfigs]);

    useImperativeHandle(ref, () => ({
        resetFormValues,
    }));

    const renderInput = useCallback((config: InputConfig) => {
        const inputProps = {
            onChange: storeCurrentValue,
            value: formState.formFields.get(config.name)?.value || '',
        };

        switch (config.type) {
            case 'email':
                return <EmailInput {...inputProps} />;
            case 'password':
                return <PassInput {...inputProps} />;
            default:
                return null;
        }
    }, [formState.formFields, storeCurrentValue]);

    return (
        <>
            {inputConfigs.map((config, index) => (
                <InputWrapper
                    key={index}
                    inputName={config.name}
                    child={renderInput(config) as React.ReactElement}
                    validator={config.validator}
                    allowShowErrors={allowShowErrors}
                    showSuggestions={config.showSuggestions || false}
                />
            ))}
        </>
    );
});

export default FormInputsBuilder;