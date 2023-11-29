import { AuthScreens } from '@/constants/screens';
import { AuthStackParamList } from '@/interfaces/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen imports
import LoginScreen from '@/screens/auth/login-screen';
import RegisterScreen from '@/screens/auth/register-screen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AuthScreens.LOGIN} component={LoginScreen} />
      <Stack.Screen name={AuthScreens.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
