import React from 'react';
import {ColorValue} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {typeVariants} from '../theme/theme';
import {useTheme} from '../theme/useTheme';

import {FavoritesScreen} from 'app/screens/FavoritesScreen';
import {WatchedScreen} from 'app/screens/WatchedScreen';
import {ListFilmsScreen} from '../screens/ListFilmsScreen';

// Icons for Bottom Tab Navigation
const homeIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="list-sharp" size={30} color={color} />
);
const favoritesIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="heart" size={30} color={color} />
);
const watchedIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="film" size={30} color={color} />
);

const Tab = createBottomTabNavigator();

export default function TabBarComponent() {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.cardBg,
          borderTopColor: theme?.layoutBg,
        },
        tabBarInactiveTintColor: theme.color,
        tabBarActiveTintColor: theme.primary,
        headerStyle: {backgroundColor: theme.layoutBg, height: 50},
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: typeVariants.titleLarge.fontFamily,
          fontSize: 18,
          color: theme.primary,
          fontWeight: 'bold',
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="ListFilms"
        component={ListFilmsScreen}
        options={{
          tabBarIcon: homeIcon,
          tabBarTestID: 'BottomTab.ListFilms',
        }}
      />
      <Tab.Screen
        name="FilmFavorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: favoritesIcon,
          tabBarTestID: 'BottomTab.FilmFavorites',
        }}
      />
      <Tab.Screen
        name="FilmWatched"
        component={WatchedScreen}
        options={{
          tabBarIcon: watchedIcon,
          tabBarTestID: 'BottomTab.FilmWatched',
        }}
      />
    </Tab.Navigator>
  );
}
