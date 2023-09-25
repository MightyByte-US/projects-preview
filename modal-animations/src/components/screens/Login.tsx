import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SignedInContext, SIGNED_IN_STATUS } from '../../context/SignedInContext';
import { MB_Button } from '../../mightyByteLibraries/MB_Button';
import { UniversalProps } from '../../typesInterfacesEnums/componentProps';
import { USER_TYPES } from '../../typesInterfacesEnums/enums';
import { ComponentWrapper } from '../helperComponents/ComponentWrapper';


const Login = ({ navigation }: UniversalProps) => {
  const { setSignedInStatus } = useContext(SignedInContext);

  const setSignInStatus = (userType: USER_TYPES) => {
    setSignedInStatus({ isSignedIn: SIGNED_IN_STATUS.signedIn, userType });
  };

  return (
    <ComponentWrapper>
      <View style={styles.innerContainer}>
        <MB_Button
          title="Browse without logging in"
          onPress={() => navigation.navigate('Home', { userType: USER_TYPES.guest })}
          style={styles.loginButton}
        />
        <MB_Button
          title="Login as student"
          onPress={() => setSignInStatus(USER_TYPES.student)}
          style={styles.loginButton}
        />
        <MB_Button
          title="Login as teacher"
          onPress={() => setSignInStatus(USER_TYPES.teacher)}
          style={styles.loginButton}
        />
      </View>
    </ComponentWrapper>
  );
};

export { Login };

const styles = StyleSheet.create({
  loginButton: {
    width: 200,
    height: 54,
    backgroundColor: COLORS.plum,
    marginTop: 32,
  },
  innerContainer: {
    alignItems: 'center',
    paddingTop: 32,
  },
});
