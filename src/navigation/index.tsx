import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './auth-stack';
import { useAppSelector } from '@/redux';

const AppNavigation = () => {
  const isLoggedIn = useAppSelector((state) => state.appState.isLoggedIn);

  return <NavigationContainer>{isLoggedIn ? null : <AuthStack />}</NavigationContainer>;
};

export default AppNavigation;
