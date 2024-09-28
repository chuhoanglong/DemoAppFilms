import 'react-native';
import React from 'react';
import {describe, it} from '@jest/globals';

import {fireEvent, render} from '../../app/utils/test-utils';

import {ListFilmsScreen} from '../../app/screens/ListFilmsScreen';

describe('Tasks screen', () => {
  it('the screen exists', () => {
    let {getByTestId} = render(<ListFilmsScreen />, {});
    getByTestId('Screen.Tasks');
  });

  it('screen has a input with placeholder "New Task"', () => {
    let {getByPlaceholderText} = render(<ListFilmsScreen />, {});
    getByPlaceholderText('New Task');
  });

  it('Add new task', () => {
    let {getByTestId, getByText} = render(<ListFilmsScreen />, {});
    // get textinput by testId & Type item title in input: fireevent changeText
    fireEvent.changeText(
      getByTestId('Tasks.newTaskInput'),
      'This is a Test task',
    );
    // submit button: fireEvent press
    fireEvent(getByTestId('Tasks.newTaskInput'), 'submitEditing');
    // Check screen for submitted item using getByText
    getByText('This is a Test task');
  });
});
