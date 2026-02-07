import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { ProductListing, ProductCategory, ProductCondition } from '../backend';

export interface NGO {
  id: string;
  name: string;
  description: string;
  category: string;
  verified: boolean;
  requirements: NGORequirement[];
}

export interface NGORequirement {
  id: string;
  ngoId: string;
  itemName: string;
  quantity: number;
  urgency: 'low' | 'medium' | 'high';
  fulfilled: number;
  status: 'active' | 'fulfilled' | 'closed';
}

export interface Donation {
  id: string;
  ngoId: string;
  ngoName: string;
  amount: number;
  itemName: string;
  anonymous: boolean;
  timestamp: number;
  certificateId: string;
  donorName?: string;
}

export interface SavedProduct {
  productId: string;
  timestamp: number;
}

export interface Purchase {
  id: string;
  productId: string;
  productName: string;
  amount: number;
  timestamp: number;
  status: 'completed' | 'pending' | 'shipped';
}

interface KindKartDataContextType {
  products: ProductListing[];
  addProduct: (product: ProductListing) => void;
  ngos: NGO[];
  addNGO: (ngo: NGO) => void;
  updateNGO: (id: string, updates: Partial<NGO>) => void;
  donations: Donation[];
  addDonation: (donation: Donation) => void;
  savedProducts: SavedProduct[];
  toggleSaveProduct: (productId: string) => void;
  requirements: NGORequirement[];
  addRequirement: (req: NGORequirement) => void;
  updateRequirement: (id: string, updates: Partial<NGORequirement>) => void;
  purchases: Purchase[];
  addPurchase: (purchase: Purchase) => void;
}

const KindKartDataContext = createContext<KindKartDataContextType | undefined>(undefined);

const mockProducts: ProductListing[] = [
  {
    id: BigInt(1),
    title: 'Rice - 25kg Bag',
    description: 'Premium quality basmati rice, sealed and fresh. Perfect for families.',
    category: 'other' as ProductCategory,
    price: BigInt(1200),
    condition: 'new_' as ProductCondition,
    imageUrls: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'],
    seller: { toText: () => 'seller1' } as any,
    timestamp: BigInt(Date.now() - 86400000 * 2),
  },
  {
    id: BigInt(2),
    title: 'Cooking Oil - 5L',
    description: 'Refined sunflower cooking oil, unopened bottle.',
    category: 'other' as ProductCategory,
    price: BigInt(650),
    condition: 'new_' as ProductCondition,
    imageUrls: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'],
    seller: { toText: () => 'seller2' } as any,
    timestamp: BigInt(Date.now() - 86400000 * 1),
  },
  {
    id: BigInt(3),
    title: 'Blankets - Set of 4',
    description: 'Warm winter blankets, gently used and freshly washed.',
    category: 'other' as ProductCategory,
    price: BigInt(800),
    condition: 'good' as ProductCondition,
    imageUrls: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'],
    seller: { toText: () => 'seller3' } as any,
    timestamp: BigInt(Date.now() - 86400000 * 3),
  },
  {
    id: BigInt(4),
    title: 'Soap and Hygiene Kit',
    description: 'Assorted soaps, shampoo, and basic hygiene products.',
    category: 'beauty' as ProductCategory,
    price: BigInt(350),
    condition: 'new_' as ProductCondition,
    imageUrls: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400'],
    seller: { toText: () => 'seller1' } as any,
    timestamp: BigInt(Date.now() - 86400000 * 4),
  },
  {
    id: BigInt(5),
    title: 'Bed Sheets - Double Size',
    description: 'Cotton bed sheets with pillow covers, good condition.',
    category: 'other' as ProductCategory,
    price: BigInt(450),
    condition: 'good' as ProductCondition,
    imageUrls: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400'],
    seller: { toText: () => 'seller4' } as any,
    timestamp: BigInt(Date.now() - 86400000 * 5),
  },
  {
    id: BigInt(6),
    title: 'Kitchen Utensils Set',
    description: 'Complete set of stainless steel utensils including plates, bowls, and spoons.',
    category: 'homeAppliances' as ProductCategory,
    price: BigInt(900),
    condition: 'likeNew' as ProductCondition,
    imageUrls: ['https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400'],
    seller: { toText: () => 'seller2' } as any,
    timestamp: BigInt(Date.now() - 86400000 * 6),
  },
  {
    id: BigInt(7),
    title: 'School Supplies Bundle',
    description: 'Notebooks, pens, pencils, erasers, and geometry box for students.',
    category: 'books' as ProductCategory,
    price: BigInt(250),
    condition: 'new_' as ProductCondition,
    imageUrls: ['https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400'],
    seller: { toText: () => 'seller3' } as any,
    timestamp: BigInt(Date.now() - 86400000 * 7),
  },
  {
    id: BigInt(8),
    title: 'Water Bottles - Pack of 6',
    description: 'Reusable plastic water bottles, BPA-free and durable.',
    category: 'other' as ProductCategory,
    price: BigInt(300),
    condition: 'new_' as ProductCondition,
    imageUrls: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400'],
    seller: { toText: () => 'seller4' } as any,
    timestamp: BigInt(Date.now() - 86400000 * 8),
  },
  {
    id: BigInt(9),
    title: 'Wheat Flour - 10kg',
    description: 'Fresh whole wheat flour, perfect for making rotis and bread.',
    category: 'other' as ProductCategory,
    price: BigInt(400),
    condition: 'new_' as ProductCondition,
    imageUrls: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'],
    seller: { toText: () => 'seller1' } as any,
    timestamp: BigInt(Date.now() - 86400000 * 9),
  },
  {
    id: BigInt(10),
    title: 'Towels - Set of 6',
    description: 'Soft cotton towels in assorted colors, gently used.',
    category: 'other' as ProductCategory,
    price: BigInt(550),
    condition: 'good' as ProductCondition,
    imageUrls: ['https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400'],
    seller: { toText: () => 'seller2' } as any,
    timestamp: BigInt(Date.now() - 86400000 * 10),
  },
];

const mockNGOs: NGO[] = [
  {
    id: 'ngo-1',
    name: 'Hope Foundation',
    description: 'Supporting underprivileged children with education and basic needs',
    category: 'Education',
    verified: true,
    requirements: [],
  },
  {
    id: 'ngo-2',
    name: 'Green Earth Initiative',
    description: 'Environmental conservation and sustainability programs',
    category: 'Environment',
    verified: true,
    requirements: [],
  },
  {
    id: 'ngo-3',
    name: 'Shelter for All',
    description: 'Providing housing and support for homeless families',
    category: 'Housing',
    verified: true,
    requirements: [],
  },
];

const mockRequirements: NGORequirement[] = [
  {
    id: 'req-1',
    ngoId: 'ngo-1',
    itemName: 'School Books',
    quantity: 100,
    urgency: 'high',
    fulfilled: 45,
    status: 'active',
  },
  {
    id: 'req-2',
    ngoId: 'ngo-1',
    itemName: 'School Bags',
    quantity: 50,
    urgency: 'medium',
    fulfilled: 20,
    status: 'active',
  },
  {
    id: 'req-3',
    ngoId: 'ngo-1',
    itemName: 'Stationery Kits',
    quantity: 80,
    urgency: 'medium',
    fulfilled: 35,
    status: 'active',
  },
  {
    id: 'req-4',
    ngoId: 'ngo-2',
    itemName: 'Reusable Water Bottles',
    quantity: 200,
    urgency: 'low',
    fulfilled: 120,
    status: 'active',
  },
  {
    id: 'req-5',
    ngoId: 'ngo-2',
    itemName: 'Cloth Shopping Bags',
    quantity: 150,
    urgency: 'medium',
    fulfilled: 80,
    status: 'active',
  },
  {
    id: 'req-6',
    ngoId: 'ngo-3',
    itemName: 'Blankets',
    quantity: 60,
    urgency: 'high',
    fulfilled: 25,
    status: 'active',
  },
  {
    id: 'req-7',
    ngoId: 'ngo-3',
    itemName: 'Bed Sheets',
    quantity: 40,
    urgency: 'high',
    fulfilled: 15,
    status: 'active',
  },
  {
    id: 'req-8',
    ngoId: 'ngo-3',
    itemName: 'Kitchen Utensils',
    quantity: 30,
    urgency: 'medium',
    fulfilled: 12,
    status: 'active',
  },
];

const mockDonations: Donation[] = [
  {
    id: 'don-1',
    ngoId: 'ngo-1',
    ngoName: 'Hope Foundation',
    amount: 5000,
    itemName: 'School Books',
    anonymous: false,
    timestamp: Date.now() - 86400000 * 10,
    certificateId: 'CERT-2026-001',
    donorName: 'Rajesh Kumar',
  },
  {
    id: 'don-2',
    ngoId: 'ngo-3',
    ngoName: 'Shelter for All',
    amount: 3000,
    itemName: 'Blankets',
    anonymous: false,
    timestamp: Date.now() - 86400000 * 15,
    certificateId: 'CERT-2026-002',
    donorName: 'Priya Sharma',
  },
  {
    id: 'don-3',
    ngoId: 'ngo-2',
    ngoName: 'Green Earth Initiative',
    amount: 2000,
    itemName: 'Reusable Water Bottles',
    anonymous: true,
    timestamp: Date.now() - 86400000 * 20,
    certificateId: 'CERT-2026-003',
  },
  {
    id: 'don-4',
    ngoId: 'ngo-1',
    ngoName: 'Hope Foundation',
    amount: 4500,
    itemName: 'Stationery Kits',
    anonymous: false,
    timestamp: Date.now() - 86400000 * 5,
    certificateId: 'CERT-2026-004',
    donorName: 'Amit Patel',
  },
];

const mockPurchases: Purchase[] = [
  {
    id: 'pur-1',
    productId: '2',
    productName: 'Cooking Oil - 5L',
    amount: 650,
    timestamp: Date.now() - 86400000 * 12,
    status: 'completed',
  },
  {
    id: 'pur-2',
    productId: '6',
    productName: 'Kitchen Utensils Set',
    amount: 900,
    timestamp: Date.now() - 86400000 * 8,
    status: 'completed',
  },
  {
    id: 'pur-3',
    productId: '7',
    productName: 'School Supplies Bundle',
    amount: 250,
    timestamp: Date.now() - 86400000 * 3,
    status: 'shipped',
  },
];

const mockSavedProducts: SavedProduct[] = [
  {
    productId: '1',
    timestamp: Date.now() - 86400000 * 2,
  },
  {
    productId: '3',
    timestamp: Date.now() - 86400000 * 5,
  },
  {
    productId: '8',
    timestamp: Date.now() - 86400000 * 1,
  },
];

export function KindKartDataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductListing[]>(mockProducts);
  const [ngos, setNGOs] = useState<NGO[]>(mockNGOs);
  const [donations, setDonations] = useState<Donation[]>(mockDonations);
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>(mockSavedProducts);
  const [requirements, setRequirements] = useState<NGORequirement[]>(mockRequirements);
  const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);

  const addProduct = (product: ProductListing) => {
    setProducts((prev) => [product, ...prev]);
  };

  const addNGO = (ngo: NGO) => {
    setNGOs((prev) => [...prev, ngo]);
  };

  const updateNGO = (id: string, updates: Partial<NGO>) => {
    setNGOs((prev) => prev.map((ngo) => (ngo.id === id ? { ...ngo, ...updates } : ngo)));
  };

  const addDonation = (donation: Donation) => {
    setDonations((prev) => [donation, ...prev]);
  };

  const toggleSaveProduct = (productId: string) => {
    setSavedProducts((prev) => {
      const exists = prev.find((sp) => sp.productId === productId);
      if (exists) {
        return prev.filter((sp) => sp.productId !== productId);
      }
      return [...prev, { productId, timestamp: Date.now() }];
    });
  };

  const addRequirement = (req: NGORequirement) => {
    setRequirements((prev) => [...prev, req]);
  };

  const updateRequirement = (id: string, updates: Partial<NGORequirement>) => {
    setRequirements((prev) => prev.map((req) => (req.id === id ? { ...req, ...updates } : req)));
  };

  const addPurchase = (purchase: Purchase) => {
    setPurchases((prev) => [purchase, ...prev]);
  };

  return (
    <KindKartDataContext.Provider
      value={{
        products,
        addProduct,
        ngos,
        addNGO,
        updateNGO,
        donations,
        addDonation,
        savedProducts,
        toggleSaveProduct,
        requirements,
        addRequirement,
        updateRequirement,
        purchases,
        addPurchase,
      }}
    >
      {children}
    </KindKartDataContext.Provider>
  );
}

export function useKindKartData() {
  const context = useContext(KindKartDataContext);
  if (!context) {
    throw new Error('useKindKartData must be used within KindKartDataProvider');
  }
  return context;
}
