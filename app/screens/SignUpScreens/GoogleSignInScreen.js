import React, { Component, Fragment, UseEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Image, ImageBackground, Alert} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { AppSettings } from '../../settings.json'

let googlename
let googlepfpurl
let googleemail

const invalidDomainAlert = () => {
  Alert.alert(
    "Invalid Domain",
    "Your email is not registered with HCPS.",
    [
      { text: "Cancel", onPress: () => { return null }, style: 'cancel'}
    ]
  )
}

GoogleSignin.configure({
  scopes: ['profile', 'email'],
  webClientId: '379530556246-37cjigctdlojjgms19m2kqfcco1pb27d.apps.googleusercontent.com', 
  offlineAccess: true, 
  //hostedDomain: 'henricostudents.org', 
  forceConsentPrompt: true,
});
async function registerwithFirebase() {
  const { idToken } = await GoogleSignin.signInSilently();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
}

export default class GoogleSignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false
    }
  }

  signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        this.setState({ userInfo: userInfo, loggedIn: true });
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          return null
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
    }
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        this.setState({ loggedIn: false });
      } else {
        // some other error
        this.setState({ loggedIn: false });
      }
    }
  };
  
  render() {
    return (
            <SafeAreaView style={{
                backgroundColor: AppSettings.globalGray,
                flex: 1}}>
                <ImageBackground
                style={styles.background}
                source={require('../../assets/Talon540Logo.webp')}>
                <View style={styles.sectionContainer}>
                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this.signIn}
                        disabled={this.state.isSigninInProgress} />
                </View>
                <Text
                style={styles.signInText}>
                    Verify your account with Google
                </Text>
              {!this.state.loggedIn && this.props.navigation.navigate('GoogleSignInScreen')}
              {this.state.loggedIn &&
                
                  <View style={styles.nextButton}>
                    <Text style={{ textAlign: 'center', width: 150, right: 40, color: '#fff', fontWeight: 'bold'  }}> 
                    You Are Signed in and can proceed
                    
                    </Text>
                    <Button onPress={() => {
                      if (this.state.userInfo.user.email.split('@')[1] != 'henricostudents.org') {
                        if (this.state.userInfo.user.email.split('@')[1] != 'henrico.k12.va.us') {
                          if (!AppSettings.email_whitelist.includes(this.state.userInfo.user.email)) return invalidDomainAlert()
                        }
                      }
                      googlename = this.state.userInfo.user.name;
                      googleemail = this.state.userInfo.user.email
                      if (!this.state.userInfo.user.photo) {
                        googlepfpurl = 'https://scontent.fric1-2.fna.fbcdn.net/v/t1.6435-9/180978949_314228950059549_1005358403722529104_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=hWaUoD2qgF4AX_zO-2H&_nc_ht=scontent.fric1-2.fna&oh=00_AT-e6eQxdQy8O3iKxK7JNDLjtrJc1l9rvWwYMeTG7KEWEA&oe=61EDFC8E'
                      } else {
                        googlepfpurl = this.state.userInfo.user.photo.split('https://lh3.googleusercontent.com/a-/')[1];
                      }
                      registerwithFirebase()
                      this.props.navigation.navigate('LoginScreen')
                      }} title='Next'/>
                  </View>
                }
            </ImageBackground>
            </SafeAreaView>
    );
  }
};

export { googlename, googleemail, googlepfpurl }

const styles = StyleSheet.create({
  sectionContainer: {
    // marginTop: 32,
    // paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: '300%',
    left: '100%',
  },
    background: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        left: '7%',
    },
    signInText: {
        flex: 1,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        width: 300,
        left: 170,
        top: 30 ,
        
    },
    nextButton: {
        flex: 1,
        position: 'absolute',
        top: '800%',
        left: '190%',
        width: 70,
        height: 40,
        color: '#fff',
    },
    listHeader: {
    backgroundColor: '#eee',
    color: "#222",
    height: 44,
    padding: 12
    },
    detailContainer: {
    paddingHorizontal: 20
    },
    title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    color: 'white'
    },
    message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    color: 'white',
    
    },
    pfp: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flex: 1,
    },
});
