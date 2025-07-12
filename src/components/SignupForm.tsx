'use client';
import { useState } from 'react';
import { Input } from './ui/input';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('User created successfully');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatus(`Error: ${err.message}`);
      } else {
        setStatus('An unknown error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="name"
        placeholder="Name"
        required
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        required
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        required
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
        Sign Up
      </button>
      <p className="mt-2 text-sm text-gray-700">{status}</p>
    </form>
  );
}

