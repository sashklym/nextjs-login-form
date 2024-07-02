import { InputValidationResult, ValidationRuleResult } from "@/components/ui/input-wrapper/InputWrapper";

export function validateEmail(email: string): InputValidationResult {
    const details: ValidationRuleResult[] = [];

    details.push({
        status: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'success' : 'error',
        message: "Is not valid email format"
    });

    const isValid = details.every(detail => detail.status === 'success');

    return {
        isValid,
        details,
    };
}