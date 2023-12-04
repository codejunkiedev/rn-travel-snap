import AppNavigation from '@/navigation';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { COLORS, FONT_FAMILY } from '@/typography';
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Wrapper } from '@/components/ui/wrapper';
import FlashMessage from 'react-native-flash-message';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    [FONT_FAMILY.POPPINS_BOLD]: require('@/assets/fonts/Poppins-Bold.ttf'),
    [FONT_FAMILY.POPPINS_LIGHT]: require('@/assets/fonts/Poppins-Light.ttf'),
    [FONT_FAMILY.POPPINS_REGULAR]: require('@/assets/fonts/Poppins-Regular.ttf'),
    [FONT_FAMILY.POPPINS_BOLD_ITALIC]: require('@/assets/fonts/Poppins-BoldItalic.ttf'),
    [FONT_FAMILY.POPPINS_LIGHT_ITALIC]: require('@/assets/fonts/Poppins-LightItalic.ttf'),
    [FONT_FAMILY.POPPINS_ITALIC]: require('@/assets/fonts/Poppins-Italic.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Wrapper>
              <AppNavigation />
              <FlashMessage position={'bottom'} animated floating duration={3000} hideOnPress />
            </Wrapper>
            <StatusBar
              style={Platform.select({
                android: 'light',
                default: 'auto',
              })}
              backgroundColor={COLORS.PRIMARY}
            />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
