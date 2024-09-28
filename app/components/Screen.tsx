import React, {PropsWithChildren} from 'react';
import {StatusBar, StatusBarStyle, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ScreenProps {
  style?: ViewStyle;
  backgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
}

export function Screen(props: PropsWithChildren & ScreenProps) {
  const {style, backgroundColor = 'white', statusBarStyle} = props;

  const {top} = useSafeAreaInsets();

  return (
    <View style={[$containerStyle, {backgroundColor, paddingTop: top}, style]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={statusBarStyle}
      />
      <View style={$outerStyle}>{props.children}</View>
    </View>
  );
}

const $containerStyle: ViewStyle = {
  flex: 1,
};

const $outerStyle: ViewStyle = {
  flex: 1,
};
