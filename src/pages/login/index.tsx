import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log("🚀 ~ handleSubmit ~ email:", email)
  }

  return (
    <div className={`flex items-center justify-center min-h-screen ${styles.bg}`}>
      <div className={`${styles.imgBg}`}></div>
      <form onSubmit={handleSubmit} className={`${styles.formContainer} w-full max-w-md space-y-4 p-8 flex flex-col items-center`}>
        <h2 className={`${styles.title}`}>
          Sign up
        </h2>
        <input type="email" name="email" placeholder="Email" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-10" />
        <input type="password" name="password" placeholder="Password" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-10" />
        <div className="flex justify-center items-center">
          <Button>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}