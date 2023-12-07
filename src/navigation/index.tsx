import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './auth-stack';
import AppTabs from './app-tabs';
import { useAppSelector } from '@/redux';

// AppNavigation is used to create navigation container
// AuthStack is used to create stack navigation
// AppTabs is used to create bottom tab navigation
// useAppSelector is used to get redux state
// isLoggedIn is used to check if user is logged in or not

const AppNavigation = () => {
  const isLoggedIn = useAppSelector((state) => state.appState.isLoggedIn);

  return <NavigationContainer>{isLoggedIn ? <AppTabs /> : <AuthStack />}</NavigationContainer>;
};

export default AppNavigation;
