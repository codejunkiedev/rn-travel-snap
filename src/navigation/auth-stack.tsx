import { AuthScreens } from '@/constants';
import { AuthStackParamList } from '@/interfaces';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/screens/auth/login-screen';
import RegisterScreen from '@/screens/auth/register-screen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

// AuthStack is used to create stack navigation
// LoginScreen is used to show login screen
// RegisterScreen is used to show register screen

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AuthScreens.LOGIN} initialParams={{ email: '', password: '' }} component={LoginScreen} />
      <Stack.Screen
        name={AuthScreens.REGISTER}
        initialParams={{ email: '', password: '' }}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
