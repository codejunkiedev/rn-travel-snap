import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './auth-stack';
import AppTabs from './app-tabs';
import { useAppSelector } from '@/redux';

const AppNavigation = () => {
  const isLoggedIn = useAppSelector((state) => state.appState.isLoggedIn);

  return <NavigationContainer>{isLoggedIn ? <AppTabs /> : <AuthStack />}</NavigationContainer>;
};

export default AppNavigation;
