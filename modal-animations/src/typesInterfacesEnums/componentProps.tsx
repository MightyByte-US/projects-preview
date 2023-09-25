import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/RootNavigator';

type UniversalScreenRouteProp = RouteProp<RootStackParamList>;
export type UniversalScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type UniversalProps = {
  route: UniversalScreenRouteProp;
  navigation: UniversalScreenNavigationProp;
};

type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export type HomeProps = {
  route: HomeRouteProp;
  navigation: HomeNavigationProp;
};
