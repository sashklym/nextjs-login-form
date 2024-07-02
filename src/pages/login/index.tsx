import { FormEvent, useRef, useState } from 'react';
import styles from './login.module.css';
import Button from '@/components/ui/button/Button';
import { InputValidationResult } from '@/components/ui/input-wrapper/InputWrapper';
import { validatePassword } from '@/utils/validators/passwordValidator';
import { validateEmail } from '@/utils/validators/emailValidator';
import FormInputsBuilder, { FormState, InputConfig } from '@/components/FormInputsBuilder';

export default function LoginPage() {
  const [formData, setFormData] = useState<FormState>({ isFormValid: false, formFields: new Map()});
  const [showValidationError, setShowValidationError] = useState(false);
  const formRef = useRef<any>(null);

  // Form inputs configurations
  const inputConfigs: InputConfig[] = [
    { name: 'email', type: 'email', validator: validateEmail },
    { name: 'password', type: 'password', validator: validatePassword, showSuggestions: true},
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowValidationError(true);
    console.log("🚀 ~ handleSubmit ~ formData:", formData)
    if (!formData.isFormValid) {
      return;
    }
    if (formRef.current) {
      formRef.current.resetFormValues();
    }
    alert('Sign up success');
    setShowValidationError(false);
  }

  const handleFormInputChanges = (newValues: FormState) => {
    setFormData(newValues);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${styles.bg}`}>
      <div className={`${styles.imgBg}`}></div>
      <form onSubmit={handleSubmit} className={`${styles.formContainer} flex flex-col items-center`}>
        <h2 className={`${styles.title}`}>
          Sign up
        </h2>
        <FormInputsBuilder 
          ref={formRef}
          inputConfigs={inputConfigs} 
          onChange={handleFormInputChanges}
          allowShowErrors={showValidationError}
        />
        <div className="flex justify-center items-center mt-40px">
          <Button>
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}