import { yupResolver } from '@hookform/resolvers/yup';
import { LockKeyhole, Mail, PieChart, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { login as authLogin, register as authRegister } from '../redux/slices/authSlice.js';

const schema = yup.object({
  name: yup.string().when('$mode', {
    is: 'register',
    then: (rule) => rule.min(2).required(),
    otherwise: (rule) => rule.optional()
  }),
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
});

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState(initialMode);
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    context: { mode }
  });

  if (token) {
    return <Navigate to="/app" replace />;
  }
  
  const submit = (values) => {
    dispatch(mode === 'login' ? authLogin(values) : authRegister(values));
  };

  const switchMode = () => {
    setMode((value) => (value === 'login' ? 'register' : 'login'));
    reset();
  };

  return (
    <main className="grid min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-finance-ink text-white lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,.35),transparent_32%),radial-gradient(circle_at_75%_65%,rgba(37,99,235,.28),transparent_30%)]" />
        <div className="relative flex h-full flex-col  p-12">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-white/10">
              <PieChart size={26} />
            </div>
            <p className="text-xl font-extrabold"> <a href="home.jsx">ExpenseFlow</a> </p>
          </div>
          <div className=" mt-32 max-w-xl">
            <p className="text-5xl font-extrabold leading-tight tracking-tight">Control spending with a dashboard built for decisions.</p>
            <p className="mt-5 text-lg text-slate-300">Budgets, income, expenses, alerts, and reports stay connected from the first transaction.</p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-10">
        <form className="w-full max-w-md rounded-lg bg-white p-6 shadow-soft dark:bg-slate-900" onSubmit={handleSubmit(submit)}>
          <div className="mb-8">
            <p className="text-3xl font-extrabold tracking-tight">{mode === 'login' ? 'Welcome back' : 'Create account'}</p>
            <p className="mt-2 text-sm text-slate-500">Secure JWT authentication for your financial workspace.</p>
          </div>
          {mode === 'register' && (
            <label className="mb-4 block text-sm font-semibold">
              Name
              <div className="relative mt-1">
                <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input className="input pl-10" {...register('name')} placeholder="Your full name" />
                {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
              </div>
            </label>
          )}
          <label className="mb-4 block text-sm font-semibold">
            Email
            <div className="relative mt-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input className="input pl-10" type="email" {...register('email')} placeholder="your@email.com" />
              {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
            </div>
          </label>
          <label className="mb-4 block text-sm font-semibold">
            Password
            <div className="relative mt-1">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input className="input pl-10" type="password" {...register('password')} placeholder="At least 6 characters" />
              {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>}
            </div> 
          </label>
          {error && <p className="mb-4 rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</p>}
          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
          <button className="mt-4 w-full text-sm font-semibold text-finance-teal" type="button" onClick={switchMode}>
            {mode === 'login' ? 'Create a new account' : 'Already have an account? Sign in'}
          </button>
        </form>
      </section>
    </main>
  );
}
