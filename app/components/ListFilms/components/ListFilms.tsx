import NotFound from 'app/components/NotFound';
import {Film} from 'app/types/stores';
import React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {FilmItem} from './FilmItem';

interface Props {
  films: Film[];
  handleLoadMore: () => void;
  loadingMore?: boolean;
}

const _ListFilms = ({films, loadingMore, handleLoadMore}: Props) => {
  const _renderItem = React.useCallback(({item}: {item: Film}) => {
    return <FilmItem film={item} />;
  }, []);

  const _renderListEmptyComponent = React.useCallback(() => {
    return (
      <NotFound
        title="No films found"
        message="There are no films to display"
      />
    );
  }, []);

  const keyExtractor = React.useCallback((item: Film, index: number) => {
    return index.toString() + item.id.toString();
  }, []);

  return (
    <FlatList
      data={films}
      renderItem={_renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={_renderListEmptyComponent}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      //   handle load more data
      onEndReachedThreshold={0.4}
      scrollEventThrottle={16}
      onEndReached={handleLoadMore}
      // handle performance
      removeClippedSubviews={true}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={30}
      windowSize={10}
    />
  );
};

export const ListFilms = React.memo(_ListFilms);
