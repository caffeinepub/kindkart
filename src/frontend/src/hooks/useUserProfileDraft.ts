import { useState, useEffect } from 'react';

interface UserProfileDraft {
  name: string;
  email: string;
  phone: string;
  address: string;
  area: string;
}

const STORAGE_KEY = 'kindkart_user_profile_draft';

const defaultProfile: UserProfileDraft = {
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  phone: '+91 98765 43210',
  address: '123, MG Road, Koramangala',
  area: 'Bangalore, Karnataka',
};

export function useUserProfileDraft() {
  const [profile, setProfile] = useState<UserProfileDraft>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultProfile;
      }
    }
    return defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfileDraft>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return { profile, updateProfile };
}
