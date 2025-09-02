import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import LoadingScreen from '../components/common/LoadingScreen';
import { useAuthStore } from '../store/authStore';

export default function AppIndex() {
  const { isFirstLaunch } = useAuthStore();
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
        router.push('/onboarding');
      }
      // We'll add other routes later
    }
  }, [isLoading, isFirstLaunch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // For now, always show onboarding to test
  router.push('/onboarding');
  return <LoadingScreen />;
}
