import { AuthScreens } from '@/constants';
import { AuthStackParamList } from '@/interfaces';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen imports
import LoginScreen from '@/screens/auth/login-screen';
import RegisterScreen from '@/screens/auth/register-screen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AuthScreens.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={AuthScreens.REGISTER}
        initialParams={{ email: '', password: '' }}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
