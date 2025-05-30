'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products, Product } from '@/data/products';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const domain = searchParams.get('domain');

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {domain ? `${domain}'s Store` : 'Product Catalog'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Discover our amazing products
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white w-full md:w-64"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {product.images && product.images[0] && (
                      <Image 
                        src={product.images[0]} 
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-primary text-white text-xs font-bold rounded">
                      ${product.price}
                    </div>
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {product.category?.name || 'Uncategorized'}
                      </span>
                      <button className="text-primary hover:text-blue-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}