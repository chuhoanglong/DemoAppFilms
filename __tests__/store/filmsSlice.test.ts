import {describe, it, expect} from '@jest/globals';
import reducer, {InitialState, FilmsActions} from '../../app/store/filmsSlice';

const initialState: InitialState = {
  films: [
    {
      id: 1,
      description:
        'Major depressive affective disorder, recurrent episode, moderate',
      title: 'Coty US LLC',
      imageUrl: 'https://loremflickr.com/640/481/animals',
      watch: false,
      like: false,
    },
    {
      id: 2,
      description:
        'Spontaneous abortion, complicated by renal failure, complete',
      title: 'Dalian Rongbang Medical Healthy Devices Co',
      imageUrl: 'https://loremflickr.com/640/482/animals',
      watch: false,
      like: false,
    },
  ],
  filmsFavorites: [],
  filmsWatched: [],
  loadmore: false,
};

describe('TaskSlice', () => {
  it('should return data filmsFavorites', () => {
    expect(
      reducer(initialState, {
        type: FilmsActions.filmFavoritesAction.type,
        payload: {
          id: 1,
          description:
            'Major depressive affective disorder, recurrent episode, moderate',
          title: 'Coty US LLC',
          imageUrl: 'https://loremflickr.com/640/481/animals',
          watch: false,
          like: false,
        },
      }),
    ).toEqual({
      films: [
        {
          id: 1,
          description:
            'Major depressive affective disorder, recurrent episode, moderate',
          title: 'Coty US LLC',
          imageUrl: 'https://loremflickr.com/640/481/animals',
          watch: false,
          like: true,
        },
        {
          id: 2,
          description:
            'Spontaneous abortion, complicated by renal failure, complete',
          title: 'Dalian Rongbang Medical Healthy Devices Co',
          imageUrl: 'https://loremflickr.com/640/482/animals',
          watch: false,
          like: false,
        },
      ],
      filmsFavorites: [
        {
          id: 1,
          description:
            'Major depressive affective disorder, recurrent episode, moderate',
          title: 'Coty US LLC',
          imageUrl: 'https://loremflickr.com/640/481/animals',
          watch: false,
          like: true,
        },
      ],
      filmsWatched: [],
      loadmore: false,
    });
  });

  it('should return data filmsWatched', () => {
    expect(
      reducer(initialState, {
        type: FilmsActions.filmsWatchedAction.type,
        payload: {
          id: 1,
          description:
            'Major depressive affective disorder, recurrent episode, moderate',
          title: 'Coty US LLC',
          imageUrl: 'https://loremflickr.com/640/481/animals',
          watch: false,
          like: false,
        },
      }),
    ).toEqual({
      films: [
        {
          id: 1,
          description:
            'Major depressive affective disorder, recurrent episode, moderate',
          title: 'Coty US LLC',
          imageUrl: 'https://loremflickr.com/640/481/animals',
          watch: true,
          like: false,
        },
        {
          id: 2,
          description:
            'Spontaneous abortion, complicated by renal failure, complete',
          title: 'Dalian Rongbang Medical Healthy Devices Co',
          imageUrl: 'https://loremflickr.com/640/482/animals',
          watch: false,
          like: false,
        },
      ],
      filmsFavorites: [],
      filmsWatched: [
        {
          id: 1,
          description:
            'Major depressive affective disorder, recurrent episode, moderate',
          title: 'Coty US LLC',
          imageUrl: 'https://loremflickr.com/640/481/animals',
          watch: true,
          like: false,
        },
      ],
      loadmore: false,
    });
  });
});
