import React, { Component, Fragment } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Image, ImageBackground} from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

let username

export default class GoogleSignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false
    }
  }
  componentDidMount() {
    GoogleSignin.configure({
      webClientId: '295965277576-ld8k2htnhon67o6ih7a7e7f3l0c4t47m.apps.googleusercontent.com', 
      offlineAccess: true, 
      hostedDomain: 'henricostudents.org', 
      forceConsentPrompt: true,
    });
  }

  _signIn = async () => {
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


  // saveUserName = async () => {
  //   const response = await fetch('https://talon540appbackend.herokuapp.com/addName/' + this.state.userInfo.user.name
                                  
  //                               ,
  //                                 {
  //                                   headers : { 
  //                                     'Content-Type': 'application/json',
  //                                     'Accept': 'application/json'
  //                                   }
  //                                 }
  //                               );
  //   const json = await response.json()
  //   console.log(json)
  //   if (Object.values(json)[0]) {
  //       this.props.navigation.navigate('LoginScreen')
  //   }
  //   }

  render() {
    return (
            <SafeAreaView style={{
                backgroundColor: '#1f2129',
                flex: 1}}>
                <ImageBackground
                style={styles.background}
                source={require('../assets/Talon540Logo.webp')}>
                <View style={styles.sectionContainer}>
                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={this._signIn}
                        disabled={this.state.isSigninInProgress} />
                </View>
                <Text
                style={styles.signInText}>
                    Verify your account with Google
                </Text>
              {!this.state.loggedIn && this.props.navigation.navigate('GoogleSignInScreen')}
              {this.state.loggedIn &&
                  <View style={styles.nextButton}>
                    <Button onPress={() => {
                      username = this.state.userInfo.user.name;
                      this.props.navigation.navigate('LoginScreen')
                      }} title='Next'/>
                      <Text></Text>
                  </View>

                }
            </ImageBackground>
            </SafeAreaView>
    );
  }
}

export { username }

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
        width: 1000,
        left: '10%',
        top: '130%',
        position: 'absolute',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        
    },
    nextButton: {
        flex: 1,
        position: 'absolute',
        top: '800%',
        left: '180%',
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
