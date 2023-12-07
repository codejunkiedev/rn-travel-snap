import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppBottomTabParamList } from '@/interfaces';
import { AppScreens } from '@/constants';
import FeedScreen from '@/screens/app/feed-screen';
import AddPostScreen from '@/screens/app/add-post-screen';
import ProfileScreen from '@/screens/app/profile-screen';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONT_FAMILY } from '@/typography';

const Tabs = createBottomTabNavigator<AppBottomTabParamList>();

// AppTabs is used to create bottom tab navigation
// FeedScreen is used to show feed
// AddPostScreen is used to add post
// ProfileScreen is used to show profile
// Entypo & MaterialIcons is used to show icons in bottom tab navigation

const AppTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: COLORS.PRIMARY,
        tabBarActiveTintColor: COLORS.SECONDARY,
        tabBarStyle: {
          backgroundColor: COLORS.WHITE,
        },
        tabBarLabelStyle: {
          fontFamily: FONT_FAMILY.POPPINS_BOLD,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => <Entypo name='home' size={size} color={color} />,
        }}
        name={AppScreens.FEED}
        component={FeedScreen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => <Entypo name='squared-plus' size={size} color={color} />,
          title: 'Add Post',
        }}
        name={AppScreens.ADD_POST}
        component={AddPostScreen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name='account-circle' size={size} color={color} />,
        }}
        name={AppScreens.PROFILE}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};

export default AppTabs;
