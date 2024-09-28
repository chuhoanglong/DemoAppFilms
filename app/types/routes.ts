import {NavigatorScreenParams} from '@react-navigation/native';

export type TabParamsList = {
  ListFilms: undefined;
  Favorites: undefined;
  Watched: undefined;
};

export type AppStackParamList = {
  Tabbar: NavigatorScreenParams<TabParamsList>;
  TicketBookingScreen: {
    filmId: number;
    imageUrl: string;
    title: string;
    description: string;
  };
};
