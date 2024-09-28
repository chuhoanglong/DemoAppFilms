import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputSeach from '../../components/InputSeach';
import {spacing, typeVariants} from '../../theme/theme';
import {useTheme} from '../../theme/useTheme';
import {ListFilms} from './components';
import {films} from '../../utils/constants';

const _ListFilmsScreen = () => {
  const styles = useStyleListFilms();

  const [search, setSearch] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.styTxtHeader}>Movies</Text>
      <InputSeach
        placeholder="Search movies..."
        onChangeText={setSearch}
        value={search}
        testID="listFilms.search"
      />
      <Text style={styles.styTxtTitleList}>Most Populer</Text>
      <ListFilms films={films} />
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
