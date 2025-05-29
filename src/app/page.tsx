'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [domain, setDomain] = useState('');
  const [isDomainAvailable, setIsDomainAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [storeInfo, setStoreInfo] = useState({
    name: '',
    currency: 'BDT',
    country: 'Bangladesh',
    domain: '',
    category: '',
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
      const response = await axios.get(`https://api.escuelajs.co/api/v1/users/is-available?domain=${domain}`);
      setIsDomainAvailable(!response.data.taken);
    } catch (err) {
      console.error('Error checking domain:', err);
      setError('Failed to check domain availability. Please try again.');
      setIsDomainAvailable(null);
    } finally {
      setIsChecking(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreInfo({ ...storeInfo, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isDomainAvailable) {
      setError('Please choose an available domain first.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await axios.post('https://api.escuelajs.co/api/v1/users', storeInfo);
      // After successful registration, redirect to products page
      router.push(`/products?domain=${domain}`);
    } catch (err) {
      console.error('Error creating store:', err);
      setError('Failed to create store. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Create Your Online Store
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get started with your e-commerce journey in minutes
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Check Domain Availability
              </h2>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <input
                      type="text"
                      value={domain}
                      onChange={handleDomainChange}
                      onBlur={checkDomainAvailability}
                      placeholder="Enter your desired domain"
                      className={`w-full px-4 py-3 rounded-lg border ${isDomainAvailable === false ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white`}
                      disabled={isChecking}
                    />
                    {isChecking && (
                      <div className="absolute right-3 top-3">
                        <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                      </div>
                    )}
                  </div>
                  {isDomainAvailable === true && (
                    <p className="mt-2 text-green-600 dark:text-green-400 text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Domain is available!
                    </p>
                  )}
                  {isDomainAvailable === false && (
                    <p className="mt-2 text-red-600 dark:text-red-400 text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Domain is already taken. Please try another.
                    </p>
                  )}
                </div>
                <button
                  onClick={checkDomainAvailability}
                  disabled={!domain || isChecking}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isChecking ? 'Checking...' : 'Check Availability'}
                </button>
              </div>
            </div>
            
            {isDomainAvailable && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  Complete Store Registration
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Store Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={storeInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={storeInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Store Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={storeInfo.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="domain" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Domain
                    </label>
                    <input
                      type="text"
                      id="domain"
                      value={domain}
                      disabled
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                    />
                  </div>
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Creating Store...
                      </>
                    ) : (
                      'Create Store'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
