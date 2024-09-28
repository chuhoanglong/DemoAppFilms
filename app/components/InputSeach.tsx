import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import {spacing, typeSizes} from '../theme/theme';
import {useTheme} from '../theme/useTheme';
import {InputPropsType} from '../types/components';

const _InputSeach = ({style, error, ...rest}: InputPropsType) => {
  const styles = useStyleInputSearch();
  const {theme} = useTheme();

  return (
    <View style={styles.inputWrp}>
      <TextInput
        {...rest}
        style={[styles.input, {...style}]}
        placeholderTextColor={theme.placeholder}
      />
      {error ? (
        <Text testID={rest.testID + '-error'} style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const InputSeach = React.memo(_InputSeach);

export default InputSeach;

const useStyleInputSearch = () => {
  const {theme} = useTheme();

  return React.useMemo(
    () =>
      StyleSheet.create({
        inputWrp: {
          marginVertical: spacing.cardMarginB,
        },
        input: {
          height: 45,
          borderColor: theme.gray,
          borderWidth: StyleSheet.hairlineWidth,
          borderRadius: spacing.borderRadius,
          color: theme.gray,
          marginHorizontal: spacing.cardMarginB,
          paddingHorizontal: spacing.containerPaddingV,
        },
        error: {
          fontSize: typeSizes.FONT_SIZE_SMALL,
          color: theme.error,
        },
      }),
    [theme],
  );
};
