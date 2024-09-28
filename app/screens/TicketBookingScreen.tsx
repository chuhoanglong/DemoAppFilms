import {
  RouteProp,
  StackActions,
  TabActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Button} from 'app/components/Button/Button';
import {ImageCacheWithUrl} from 'app/components/ImageCacheWithUrl';
import {FilmsActions} from 'app/store/filmsSlice';
import {useAppSelector} from 'app/store/store';
import {spacing, typeVariants} from 'app/theme/theme';
import {useTheme} from 'app/theme/useTheme';
import {AppStackParamList} from 'app/types/routes';
import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

const TicketBookingScreen = () => {
  const styles = useStyleTicketBookingScreen();
  const {theme} = useTheme();

  const navigation = useNavigation();

  const route = useRoute<RouteProp<AppStackParamList, 'TicketBookingScreen'>>();

  const description = route.params.description ?? '';
  const imageUrl = route.params.imageUrl ?? '';
  const title = route.params.title ?? '';
  const filmId = route.params.filmId ?? '';

  const film = useAppSelector(s => s.films.films.find(f => f.id === filmId));

  const dispatch = useDispatch();

  const handleWatch = useCallback(() => {
    if (!film) {
      return;
    }
    dispatch(FilmsActions.filmsWatchedAction(film));
    navigation.dispatch(StackActions.popToTop());
    navigation.dispatch(TabActions.jumpTo('FilmWatched'));
  }, [dispatch, film, navigation]);

  return (
    <View style={styles.container}>
      <ImageCacheWithUrl
        style={styles.styImageHeader}
        source={{uri: imageUrl}}
        type="imageBackground">
        <View style={styles.styButtonBack}>
          <Icon
            name="arrow-back"
            size={30}
            color={theme.cardBg}
            testID="ticketBookingScreen.iconBack"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </ImageCacheWithUrl>
      <View style={styles.styWrapInfo}>
        <Text style={styles.styTitleFilm}>{title}</Text>
        <Text style={styles.styDescription}>{description}</Text>
      </View>
      <Button
        testID="ticketBookingScreen.buttonBook"
        text="Book Ticket"
        style={styles.styButtonBook}
        onPress={handleWatch}
      />
    </View>
  );
};

export default TicketBookingScreen;

const useStyleTicketBookingScreen = () => {
  const {theme} = useTheme();
  const {top} = useSafeAreaInsets();

  return React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.layoutBg,
        },
        styImageHeader: {
          height: 200,
          width: '100%',
          paddingTop: top,
        },
        styWrapInfo: {
          flex: 1,
          paddingHorizontal: spacing.cardMarginB,
        },
        styTxtTitleList: {
          ...typeVariants.titleLarge,
          marginHorizontal: spacing.cardMarginB,
          fontWeight: '600',
          color: theme.gray,
          marginBottom: spacing.cardMarginB,
        },
        styTitleFilm: {
          ...typeVariants.titleLarge,
          fontWeight: 'bold',
          paddingVertical: spacing.cardPadding,
          color: theme.text,
        },
        styDescription: {
          ...typeVariants.bodyMedium,
          color: theme.gray,
        },
        styButtonBack: {
          left: spacing.cardMarginB,
          alignSelf: 'flex-start',
          borderRadius: 50,
          padding: 5,
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        styButtonBook: {
          margin: spacing.cardMarginB,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    [theme, top],
  );
};
