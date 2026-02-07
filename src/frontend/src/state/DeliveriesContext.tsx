import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNotifications } from './NotificationsContext';

export type DeliveryStatus = 'scheduled' | 'picked-up' | 'in-transit' | 'delivered' | 'cancelled';

export interface Delivery {
  id: string;
  productId: string;
  productName: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  status: DeliveryStatus;
  pickupAddress: string;
  deliveryAddress: string;
  scheduledDate: string;
  otp: string;
  proofUrl?: string;
  timeline: DeliveryTimelineItem[];
}

export interface DeliveryTimelineItem {
  status: DeliveryStatus;
  timestamp: number;
  note?: string;
}

interface DeliveriesContextType {
  deliveries: Delivery[];
  addDelivery: (delivery: Delivery) => void;
  updateDeliveryStatus: (id: string, status: DeliveryStatus, note?: string) => void;
  confirmOTP: (id: string, otp: string) => boolean;
  uploadProof: (id: string, proofUrl: string) => void;
}

const DeliveriesContext = createContext<DeliveriesContextType | undefined>(undefined);

const mockDeliveries: Delivery[] = [
  {
    id: 'del-1',
    productId: '2',
    productName: 'Classic Literature Book Set',
    buyerId: 'user-1',
    buyerName: 'Rajesh Kumar',
    sellerId: 'user-2',
    sellerName: 'Priya Sharma',
    status: 'scheduled',
    pickupAddress: '123 MG Road, Bangalore',
    deliveryAddress: '456 Indiranagar, Bangalore',
    scheduledDate: new Date(Date.now() + 86400000).toISOString(),
    otp: '123456',
    timeline: [
      {
        status: 'scheduled',
        timestamp: Date.now() - 3600000,
        note: 'Pickup scheduled',
      },
    ],
  },
  {
    id: 'del-2',
    productId: '5',
    productName: 'Cricket Bat and Ball Set',
    buyerId: 'user-3',
    buyerName: 'Amit Patel',
    sellerId: 'user-4',
    sellerName: 'Sneha Reddy',
    status: 'picked-up',
    pickupAddress: '789 Koramangala, Bangalore',
    deliveryAddress: '321 Whitefield, Bangalore',
    scheduledDate: new Date(Date.now()).toISOString(),
    otp: '654321',
    timeline: [
      {
        status: 'scheduled',
        timestamp: Date.now() - 7200000,
        note: 'Pickup scheduled',
      },
      {
        status: 'picked-up',
        timestamp: Date.now() - 1800000,
        note: 'Item picked up from seller',
      },
    ],
  },
  {
    id: 'del-3',
    productId: '7',
    productName: 'Educational Toy Set for Kids',
    buyerId: 'user-5',
    buyerName: 'Kavita Singh',
    sellerId: 'user-6',
    sellerName: 'Ravi Verma',
    status: 'in-transit',
    pickupAddress: '555 HSR Layout, Bangalore',
    deliveryAddress: '777 Electronic City, Bangalore',
    scheduledDate: new Date(Date.now() - 86400000).toISOString(),
    otp: '789012',
    timeline: [
      {
        status: 'scheduled',
        timestamp: Date.now() - 86400000,
        note: 'Pickup scheduled',
      },
      {
        status: 'picked-up',
        timestamp: Date.now() - 43200000,
        note: 'Item picked up from seller',
      },
      {
        status: 'in-transit',
        timestamp: Date.now() - 21600000,
        note: 'Out for delivery',
      },
    ],
  },
  {
    id: 'del-4',
    productId: '1',
    productName: 'Wooden Study Table',
    buyerId: 'user-7',
    buyerName: 'Deepak Joshi',
    sellerId: 'user-8',
    sellerName: 'Meera Nair',
    status: 'delivered',
    pickupAddress: '888 Jayanagar, Bangalore',
    deliveryAddress: '999 BTM Layout, Bangalore',
    scheduledDate: new Date(Date.now() - 172800000).toISOString(),
    otp: '345678',
    proofUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
    timeline: [
      {
        status: 'scheduled',
        timestamp: Date.now() - 172800000,
        note: 'Pickup scheduled',
      },
      {
        status: 'picked-up',
        timestamp: Date.now() - 129600000,
        note: 'Item picked up from seller',
      },
      {
        status: 'in-transit',
        timestamp: Date.now() - 86400000,
        note: 'Out for delivery',
      },
      {
        status: 'delivered',
        timestamp: Date.now() - 43200000,
        note: 'Successfully delivered',
      },
    ],
  },
  {
    id: 'del-5',
    productId: '3',
    productName: 'Bluetooth Wireless Headphones',
    buyerId: 'user-9',
    buyerName: 'Anita Desai',
    sellerId: 'user-10',
    sellerName: 'Suresh Kumar',
    status: 'delivered',
    pickupAddress: '111 Malleshwaram, Bangalore',
    deliveryAddress: '222 Rajajinagar, Bangalore',
    scheduledDate: new Date(Date.now() - 259200000).toISOString(),
    otp: '901234',
    proofUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
    timeline: [
      {
        status: 'scheduled',
        timestamp: Date.now() - 259200000,
        note: 'Pickup scheduled',
      },
      {
        status: 'picked-up',
        timestamp: Date.now() - 216000000,
        note: 'Item picked up from seller',
      },
      {
        status: 'in-transit',
        timestamp: Date.now() - 172800000,
        note: 'Out for delivery',
      },
      {
        status: 'delivered',
        timestamp: Date.now() - 129600000,
        note: 'Successfully delivered',
      },
    ],
  },
];

export function DeliveriesProvider({ children }: { children: ReactNode }) {
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries);
  const { addNotification } = useNotifications();

  const addDelivery = (delivery: Delivery) => {
    setDeliveries((prev) => [...prev, delivery]);
    addNotification({
      title: 'Delivery Scheduled',
      message: `Delivery for ${delivery.productName} has been scheduled`,
      type: 'success',
    });
  };

  const updateDeliveryStatus = (id: string, status: DeliveryStatus, note?: string) => {
    setDeliveries((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const newTimeline: DeliveryTimelineItem = {
            status,
            timestamp: Date.now(),
            note,
          };
          return {
            ...d,
            status,
            timeline: [...d.timeline, newTimeline],
          };
        }
        return d;
      })
    );

    const delivery = deliveries.find((d) => d.id === id);
    if (delivery) {
      addNotification({
        title: 'Delivery Update',
        message: `${delivery.productName} is now ${status.replace('-', ' ')}`,
        type: 'info',
      });
    }
  };

  const confirmOTP = (id: string, otp: string): boolean => {
    const delivery = deliveries.find((d) => d.id === id);
    if (delivery && delivery.otp === otp) {
      updateDeliveryStatus(id, 'delivered', 'OTP verified successfully');
      return true;
    }
    return false;
  };

  const uploadProof = (id: string, proofUrl: string) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, proofUrl } : d))
    );
  };

  return (
    <DeliveriesContext.Provider
      value={{ deliveries, addDelivery, updateDeliveryStatus, confirmOTP, uploadProof }}
    >
      {children}
    </DeliveriesContext.Provider>
  );
}

export function useDeliveries() {
  const context = useContext(DeliveriesContext);
  if (!context) {
    throw new Error('useDeliveries must be used within DeliveriesProvider');
  }
  return context;
}
