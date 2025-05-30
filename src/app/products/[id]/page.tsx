'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category?: {
    _id: string;
    name: string;
  };
}

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const params = useParams();
  const productId = params.id;
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://glore-bd-backend-node-mongo.vercel.app/api/product/${productId}`);
        
        if (!response.ok) {
          console.error('Product API failed response status:', response.status);
          try {
            const errorBody = await response.text();
            console.error('Product API failed response body:', errorBody);
          } catch (bodyErr) {
            console.error('Could not read Product API failed response body:', bodyErr);
          }
          throw new Error('Failed to fetch product');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error || 'Product not found'}</p>
          <Link href="/products">
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/products" className="hover:text-primary transition-colors">
                Products
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href={`/products?category=${product.category?._id}`} className="hover:text-primary transition-colors">
                {product.category?.name || 'Uncategorized'}
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-800 dark:text-white font-medium truncate max-w-[200px]">
              {product.title}
            </li>
          </ol>
        </nav>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="space-y-4">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                {product.images && product.images[activeImage] && (
                  <Image 
                    src={product.images[activeImage]} 
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                )}
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 ${activeImage === index ? 'border-primary' : 'border-transparent'}`}
                    >
                      <Image 
                        src={image} 
                        alt={`${product.title} - Image ${index + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.title}
              </h1>
              
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <span className="ml-2 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">
                  20% OFF
                </span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Description
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Category
                </h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    {product.category?.name || 'Uncategorized'}
                  </span>
                </div>
              </div>
              
              <div className="mt-auto space-y-4">
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <button className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="mx-3 text-gray-800 dark:text-white font-medium">1</span>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    10 items in stock
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;