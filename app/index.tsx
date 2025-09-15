import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import LoadingScreen from '../components/common/LoadingScreen';
import { useAuthStore } from '../store/authStore';

export default function AppIndex() {
  const { isAuthenticated, isFirstLaunch } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // Simulate app initialization
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    initializeApp();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isFirstLaunch) {
        router.replace('/onboarding');
      } else if (!isAuthenticated) {
        router.replace('/landing');
      } else {
        router.replace('/(authenticated)/dashboard');
      }
    }
  }, [isLoading, isFirstLaunch, isAuthenticated]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Return loading screen while navigation is happening
  return <LoadingScreen />;
}
