import {FilmsActions} from 'app/store/filmsSlice';
import {useAppSelector} from 'app/store/store';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import InputSeach from '../components/InputSeach';
import {ListFilms} from '../components/ListFilms';
import {spacing, typeVariants} from '../theme/theme';
import {useTheme} from '../theme/useTheme';

const TIME_OUT_SEARCH = 1000;

const _ListFilmsScreen = () => {
  const styles = useStyleListFilms();

  const films = useAppSelector(s => s.films.films);

  const [search, setSearch] = React.useState('');

  const loadmore = useAppSelector(s => s.films.loadmore);

  const dispatch = useDispatch();

  const pageRef = React.useRef(1);

  const loadMoreRef = React.useRef(true); // no loadmore if search

  useEffect(() => {
    dispatch(FilmsActions.getDataFilms({page: pageRef.current}));
  }, [dispatch]);

  const handleSearchFilms = React.useCallback(
    (text: string) => {
      loadMoreRef.current = text.length === 0;
      setSearch(text);
      pageRef.current = 1;
      dispatch(FilmsActions.searchFilms({search: text}));
      return;
    },
    [dispatch],
  );

  const handleLoadMore = React.useCallback(() => {
    if (!loadmore || !loadMoreRef.current) {
      return;
    }
    setTimeout(() => {
      dispatch(FilmsActions.getDataFilms({page: pageRef.current + 1}));
      pageRef.current += 1;
    }, TIME_OUT_SEARCH);
  }, [dispatch, loadmore]);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.styTxtHeader}>Movies</Text>
      <InputSeach
        placeholder="Search movies..."
        onChangeText={handleSearchFilms}
        value={search}
        testID="listFilms.search"
      />
      <Text style={styles.styTxtTitleList}>Most Populer</Text>
      <ListFilms
        films={films}
        handleLoadMore={handleLoadMore}
        loadingMore={loadmore}
      />
    </View>
  );
};

export const ListFilmsScreen = React.memo(_ListFilmsScreen);

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
          marginHorizontal: spacing.cardMarginB,
          fontWeight: 'bold',
          color: theme.primary,
        },
        styTxtTitleList: {
          ...typeVariants.titleLarge,
          marginHorizontal: spacing.cardMarginB,
          fontWeight: '600',
          color: theme.gray,
          marginBottom: spacing.cardMarginB,
        },
      }),
    [theme],
  );
};
