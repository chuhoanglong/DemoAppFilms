import {useAppSelector} from 'app/store/store';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListFilms} from '../components/ListFilms';
import {spacing, typeVariants} from '../theme/theme';
import {useTheme} from '../theme/useTheme';
import {SafeAreaView} from 'react-native-safe-area-context';

const _FavoritesScreen = () => {
  const styles = useStyleListFilms();

  const films = useAppSelector(s => s.films.filmsFavorites);

  const handleLoadMore = React.useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.styTxtHeader}>Favorites</Text>
      <ListFilms films={films} handleLoadMore={handleLoadMore} />
    </View>
  );
};

export const FavoritesScreen = React.memo(_FavoritesScreen);

const useStyleListFilms = () => {
  const {theme} = useTheme();

  return React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.layoutBg,
        },
        styTxtHeader: {
          ...typeVariants.header,
          margin: spacing.cardMarginB,
          fontWeight: 'bold',
          color: theme.primary,
        },
      }),
    [theme],
  );
};
