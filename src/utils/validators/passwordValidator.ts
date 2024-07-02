import { InputValidationResult, ValidationRuleResult } from "@/components/ui/input-wrapper/InputWrapper";

export function validatePassword(password: string): InputValidationResult {
    const details: ValidationRuleResult[] = [];

    details.push({
        status: password.length < 8 || password.length > 64 || password.includes(' ') ? 'error' : 'success',
        message: "8 characters or more (no spaces)"
    });

    details.push({
        status: !/[A-Z]/.test(password) || !/[a-z]/.test(password) ? 'error' : 'success',
        message: "Uppercase and lowercase letters"
    });

    details.push({
        status: !/[0-9]/.test(password) ? 'error' : 'success',
        message: "At least one digit "
    });

    const isValid = details.every(error => error.status === 'success');

    return {
        isValid,
        details,
    };
}