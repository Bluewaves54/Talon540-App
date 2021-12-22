import React from 'react';
import {
    SafeAreaView,
    View,
    Text
} from 'react-native';


function ChangeInfoScreen() { //change user info screen
    return (
        <SafeAreaView style={{backgroundColor: 'white',flex:1}}>
            <View style={{left: 30, top: 50, backgroundColor: 'white',}}>
                <Text style={{width: 300}}>Hey Talon member, made a mistake while making your account or changing to a new subgroup? Use this screen to change your information.</Text>
            </View>
        </SafeAreaView>
      )
}


export default ChangeInfoScreen;