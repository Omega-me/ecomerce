'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const useFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    setFormData({
      title: searchParams.get('title') ?? '',
      price: searchParams.get('price') ?? '',
      stock: searchParams.get('stock') ?? '',
    });
  }, [searchParams]);

  const filters = {
    title: searchParams.get('title')?.trim() || null,
    price: searchParams.get('price')?.trim() || null,
    stock: searchParams.get('stock')?.trim() || null,
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== null && value !== '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePushFilter = () => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(formData)) {
      if (value.trim() !== '') {
        params.set(key, value.trim());
      }
    }

    router.push(`/?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setFormData({
      price: '',
      stock: '',
      title: '',
    });
    router.push('/');
  };

  return { formData, handleChange, handlePushFilter, handleClearFilters, filters, hasActiveFilters };
};

export default useFilters;
