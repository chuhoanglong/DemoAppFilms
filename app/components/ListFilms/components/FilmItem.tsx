import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button} from 'app/components/Button/Button';
import {ImageCacheWithUrl} from 'app/components/ImageCacheWithUrl';
import {FilmsActions} from 'app/store/filmsSlice';
import {spacing, styleShadows, typeVariants} from 'app/theme/theme';
import {useTheme} from 'app/theme/useTheme';
import {AppStackParamList} from 'app/types/routes';
import {Film} from 'app/types/stores';
import React, {useCallback} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

const _FilmItem = ({film}: {film: Film}) => {
  const styles = useStyleFilmItem();
  const {theme} = useTheme();

  const dispatch = useDispatch();

  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const handleLike = useCallback(() => {
    dispatch(FilmsActions.filmFavoritesAction(film));
  }, [dispatch, film]);

  const handleWatch = useCallback(() => {
    navigation.navigate('TicketBookingScreen', {
      filmId: film.id,
      imageUrl: film.imageUrl,
      title: film.title,
      description: film.description,
    });
  }, [film.description, film.id, film.imageUrl, film.title, navigation]);

  return (
    <View
      testID={`listFilms.filmItem-${film.id}`}
      style={[styles.container, styles.row, styleShadows.shadowAll]}>
      <ImageCacheWithUrl
        source={{uri: film.imageUrl}}
        style={styles.styImageFilm}
      />
      <View style={styles.styWrapInfo}>
        <View style={styles.styInfo}>
          <Text numberOfLines={1} style={styles.styTitleFilm}>
            {film.title}
          </Text>
          <Text numberOfLines={3} style={styles.styDescription}>
            {film.description}
          </Text>
        </View>
        <View style={[styles.row, styles.styWrapFunc]}>
          <Button
            disabled={film.watch}
            testID={`listFilms.buttonWatch-${film.id}.watch`}
            text={!film.watch ? 'Watch' : 'Watched'}
            onPress={handleWatch}
            style={styles.styBtnWatch}
          />
          <Button
            testID={`listFilms.buttonLike-${film.id}.like`}
            style={styles.styBtnLike}
            onPress={handleLike}>
            {film.like ? (
              <Icon
                testID={`listFilms.iconLike-${film.id}.like`}
                name={'heart'}
                size={30}
                color={theme.primary}
              />
            ) : (
              <Icon
                testID={`listFilms.iconLike-${film.id}.unlike`}
                name={'heart-outline'}
                size={30}
                color={theme.primary}
              />
            )}
          </Button>
        </View>
      </View>
    </View>
  );
};

export const FilmItem = React.memo(_FilmItem, (prevProps, nextProps) => {
  return (
    isEqual(prevProps.film.id, nextProps.film.id) &&
    isEqual(prevProps.film.title, nextProps.film.title) &&
    isEqual(prevProps.film.description, nextProps.film.description) &&
    isEqual(prevProps.film.imageUrl, nextProps.film.imageUrl) &&
    isEqual(prevProps.film.like, nextProps.film.like) &&
    isEqual(prevProps.film.watch, nextProps.film.watch)
  );
});

const useStyleFilmItem = () => {
  const {theme} = useTheme();

  return React.useMemo(
    () =>
      StyleSheet.create({
        styWrapInfo: {
          flex: 1,
          paddingHorizontal: spacing.cardMarginB,
        },
        container: {
          flex: 1,
          backgroundColor: theme.cardBg,
          marginHorizontal: spacing.cardMarginB,
          marginBottom: spacing.cardMarginB,
          borderRadius: spacing.borderRadius,
        },
        styTxtHeader: {
          ...typeVariants.header,
          marginHorizontal: spacing.cardMarginB,
          fontWeight: 'bold',
        },
        styTxtTitleList: {
          ...typeVariants.titleLarge,
          marginHorizontal: spacing.cardMarginB,
          fontWeight: '600',
          color: theme.gray,
        },
        row: {
          flexDirection: 'row',
        },
        styImageFilm: {
          height: 150,
          aspectRatio: 3 / 4,
          borderRadius: spacing.borderRadius,
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
        styInfo: {
          flex: 1,
        },
        styWrapFunc: {
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: spacing.cardPadding,
          gap: spacing.cardMarginB,
        },
        styBtnWatch: {
          paddingHorizontal: spacing.cardMarginB,
          borderRadius: spacing.borderRadius,
        },
        styBtnLike: {
          paddingHorizontal: 0,
          paddingVertical: 0,
          backgroundColor: 'transparent',
          borderRadius: 0,
        },
      }),
    [theme],
  );
};
