export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

export const products: Product[] = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 199.99,
    description: "Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation and 30-hour battery life.",
    category: {
      id: 1,
      name: "Electronics",
      image: "/images/categories/electronics.jpg"
    },
    images: [
      "/images/products/headphones-1.jpg",
      "/images/products/headphones-2.jpg",
      "/images/products/headphones-3.jpg"
    ]
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 149.99,
    description: "Track your fitness goals with this advanced smartwatch. Includes heart rate monitoring, GPS, and sleep tracking.",
    category: {
      id: 2,
      name: "Wearables",
      image: "/images/categories/wearables.jpg"
    },
    images: [
      "/images/products/watch-1.jpg",
      "/images/products/watch-2.jpg",
      "/images/products/watch-3.jpg"
    ]
  },
  {
    id: 3,
    title: "Professional Camera Kit",
    price: 899.99,
    description: "Capture stunning photos with this professional camera kit. Includes camera body, lens, and carrying case.",
    category: {
      id: 3,
      name: "Photography",
      image: "/images/categories/photography.jpg"
    },
    images: [
      "/images/products/camera-1.jpg",
      "/images/products/camera-2.jpg",
      "/images/products/camera-3.jpg"
    ]
  },
  {
    id: 4,
    title: "Gaming Laptop",
    price: 1299.99,
    description: "Powerful gaming laptop with high-performance graphics and fast refresh rate display.",
    category: {
      id: 1,
      name: "Electronics",
      image: "/images/categories/electronics.jpg"
    },
    images: [
      "/images/products/laptop-1.jpg",
      "/images/products/laptop-2.jpg",
      "/images/products/laptop-3.jpg"
    ]
  }
]; 