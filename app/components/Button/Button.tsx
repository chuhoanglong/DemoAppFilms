import * as React from 'react';
import {Pressable, Text, StyleSheet, ViewStyle} from 'react-native';

import {useTheme} from '../../theme/useTheme';

export type ButtonProps = {
  onPress: () => void;
  text?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
  disabled?: boolean;
};

export const Button = ({
  onPress,
  text,
  children,
  style,
  testID,
  disabled,
}: ButtonProps) => {
  const {theme} = useTheme();
  return (
    <Pressable
      testID={testID}
      disabled={disabled}
      style={[
        styles.container,
        {backgroundColor: disabled ? `${theme.gray}44` : theme.primary},
        style,
      ]}
      onPress={onPress}>
      {children ? children : <></>}
      {text ? <Text style={styles.text}>{text}</Text> : <></>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'purple',
    borderRadius: 8,
  },
  text: {color: 'white'},
});
