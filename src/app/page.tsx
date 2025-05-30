'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ApiError {
  message?: string;
  response?: {
    data?: unknown;
  };
}

const Home = () => {
  const [domain, setDomain] = useState('');
  const [isDomainAvailable, setIsDomainAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [storeInfo, setStoreInfo] = useState({
    name: '',
    currency: 'BDT (Taka)',
    country: 'Bangladesh',
    domain: '',
    category: 'Fashion',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setDomain(value);
    setStoreInfo({ ...storeInfo, domain: value });
    setIsDomainAvailable(null);
  };

  const checkDomainAvailability = async () => {
    if (!domain) return;
    
    setIsChecking(true);
    setError('');
    
    try {
      // Using the correct API endpoint provided by the user
      const response = await axios.get(`https://interview-task-green.vercel.app/task/domains/check/${domain}.expressitbd.com`);
      setIsDomainAvailable(!response.data.data.taken);
    } catch (err) {
      console.error('Error checking domain:', err);
      setError('Failed to check domain availability. Please try again.');
      setIsDomainAvailable(null);
    } finally {
      setIsChecking(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStoreInfo({ ...storeInfo, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isDomainAvailable) {
      setError('Please choose an available domain first.');
      return;
    }

    // Validate required fields
    if (!storeInfo.name.trim()) {
      setError('Store name is required');
      return;
    }

    // Validate store name minimum length
    if (storeInfo.name.trim().length < 3) {
      setError('Store name must be at least 3 characters long.');
      return;
    }

    if (!storeInfo.email.trim()) {
      setError('Email is required');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(storeInfo.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const storeData = {
        name: storeInfo.name.trim(),
        currency: storeInfo.currency.split(' ')[0], 
        country: storeInfo.country,
        domain: domain.trim(), 
        category: storeInfo.category,
        email: storeInfo.email.trim()
      };

      console.log('Sending store data:', JSON.stringify(storeData, null, 2)); // Debug log

      const response = await axios.post(
        'https://interview-task-green.vercel.app/task/stores/create',
        storeData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('API Response:', response.data);

      if (response.data.success || response.data.message === "Store created successfully!") {
        console.log('Store creation successful, navigating...');
        // Navigate to the products page on success
        router.push(`/products?domain=${storeInfo.domain.trim()}`);
      } else {
        // If success is false and the message is not the success message, display the error message from the API
        const apiErrorMessage = response.data.message || 'Failed to create store. Please try again.';
        console.error('API reported an error:', apiErrorMessage);
        setError(apiErrorMessage);
      }
    } catch (err: unknown) {
      console.error('Error during store creation process:', err);
      if (axios.isAxiosError(err)) {
        console.error('Error response details:', err.response?.data);
      }

      // Handle network errors or unexpected issues during the request
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setError(`Request failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create a store</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Add your basic store information and complete the setup</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Store Name */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Image src="/file.svg" alt="Store" width={16} height={16} className="dark:invert" />
                </div>
              </div>
              <div className="flex-grow">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Give your online store a name
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  A great store name is a big part of your success. Make sure it aligns with your brand and products.
                </p>
              </div>
              <div className="w-100 flex-shrink-0">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={storeInfo.name}
                  onChange={handleInputChange}
                  placeholder="How&apos;d you like to call your store?"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Domain */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Image src="/globe.svg" alt="Domain" width={16} height={16} className="dark:invert" />
                </div>
              </div>
              <div className="flex-grow">
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your online store subdomain
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  A SEO-friendly store name is a crucial part of your success. Make sure it aligns with your brand and products.
                </p>
              </div>
              <div className="w-100 flex-shrink-0 flex flex-col">
                <div className="flex items-center">
                  <input
                    id="domain"
                    type="text"
                    value={domain}
                    onChange={handleDomainChange}
                    onBlur={checkDomainAvailability}
                    placeholder="enter your domain name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    required
                  />
                  <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-300 rounded-r-md">
                    expressitbd.com
                  </span>
                </div>
                {isChecking && (
                  <p className="mt-1 text-sm text-gray-500">Checking availability...</p>
                )}
                {isDomainAvailable === true && (
                  <p className="mt-1 text-sm text-green-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Domain is available!
                  </p>
                )}
                {isDomainAvailable === false && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Domain is already taken. Please try another.
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-grow">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Where&apos;s your store located?
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Set your store&apos;s default location so we can optimize store access and speed for your customers.
                </p>
              </div>
              <div className="w-100 flex-shrink-0">
                <select
                  id="country"
                  name="country"
                  value={storeInfo.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                >
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2 2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-grow">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  What&apos;s your Category?
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Set your store&apos;s default category so that we can optimize store access and speed for your customers.
                </p>
              </div>
              <div className="w-100 flex-shrink-0">
                <select
                  id="category"
                  name="category"
                  value={storeInfo.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                >
                  <option value="Fashion">Fashion</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                </select>
              </div>
            </div>

            {/* Currency */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-grow">
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Choose store currency
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  This is the main currency you wish to sell in.
                </p>
              </div>
              <div className="w-100 flex-shrink-0">
                <select
                  id="currency"
                  name="currency"
                  value={storeInfo.currency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                >
                  <option value="BDT (Taka)">BDT (Taka)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="GBP">GBP (British Pound)</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-grow">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Store contact email
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  This is the email you&apos;ll use to send notifications to and receive orders from customers.
                </p>
              </div>
              <div className="w-100 flex-shrink-0">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={storeInfo.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !isDomainAvailable}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2 inline-block"></div>
                    Creating Store...
                  </>
                ) : (
                  'Create store'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
