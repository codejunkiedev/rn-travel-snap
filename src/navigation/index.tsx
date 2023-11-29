import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './auth-stack';

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default AppNavigation;
