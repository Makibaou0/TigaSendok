import {Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const WW = Dimensions.get('screen').width;
export const WH = Dimensions.get('screen').height;

export const inset = () => {
  const insets = useSafeAreaInsets();

  return insets;
};
