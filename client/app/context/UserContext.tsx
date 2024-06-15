'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';
import { User } from '@/helper/models/models';

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const SAMPLE_USER = {
  username: '',
  id: '',
  email: '',
  photoUrl: '',
  role: '',
  status: '',
  bio: '',
  joinedAt: new Date()
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(SAMPLE_USER);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch('/api/user/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
