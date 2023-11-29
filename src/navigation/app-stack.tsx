import { AppScreens } from '@/constants/screens';
import { AppStackParamList } from '@/interfaces/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screen imports
import AuthScreen from '@/screens/auth-screen';
import FeedScreen from '@/screens/feed-screen';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AppScreens.AUTH} component={AuthScreen} />
      <Stack.Screen name={AppScreens.FEED} component={FeedScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
