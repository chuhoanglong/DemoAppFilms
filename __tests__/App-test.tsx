/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import 'react-native';
import React from 'react';
// Note: import explicitly to use the types shipped with jest.
import {jest, describe, it, expect} from '@jest/globals';
// import {render} from '@testing-library/react-native';

import {render} from '../app/utils/test-utils';

import App from '../App';
import TabBar from '../app/routes/TabBar';

jest.useFakeTimers();

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('App', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });

  it('should match snapshot correctly', () => {
    const page = render(<TabBar />, {});
    expect(page.toJSON()).toMatchSnapshot();
  });

  it('Renders bottom tab bar', () => {
    let {getByTestId} = render(<TabBar />, {});
    getByTestId('BottomTab.FilmFavorites');
  });
});
