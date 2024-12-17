'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Layout from '../components/layout';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type LoginForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!result) {
      console.error('An unexpected error occurred during login.');
      return;
    }

    if (result.error) {
      console.error('Login failed:', result.error);
    } else {
      router.push('/');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input {...register('email')} type="email" placeholder="Email" className="w-full p-2 border rounded" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <input {...register('password')} type="password" placeholder="Password" className="w-full p-2 border rounded" />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;

