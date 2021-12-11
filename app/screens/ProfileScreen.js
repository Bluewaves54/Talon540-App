import React, { useState } from 'react';
import { 
    Text,
    SafeAreaView,
    Button,
    Alert,

} from 'react-native';
// import { username } from './GoogleSignInScreen';
import { data } from './LoadScreen';

const ConfirmDeletionAlert = ({ navigation }) => {
    Alert.alert(
        'Confirm',
        'Are you sure you want to delete your account?',
        [
            {
                text: 'Cancel',
                onPress: () => { return null },
                style: 'cancel'
            },
            {
                text: 'Confirm',
                onPress: () => 
                {
                fetch('https://talon540appbackend.herokuapp.com/deleteAccount/' + data.deviceID
                ,
                    {
                        headers : { 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )
                .then(function(response){
                    resp = response.json();
                    return resp;
                })
                .then(function(myJson){
                    setData(myJson);
                    console.log(data);
                })
                navigation.navigate("GoogleSignInScreen")
                } 
            },
        ]
    );
}

const ProfileScreen = ({ navigation }) => {
    return (
            <SafeAreaView>
                <Text>
                    Welcome, {data.name}
                </Text>
                <Button
                title={'Delete Account'}
                onPress={() => {
                    ConfirmDeletionAlert({navigation});
                    }} />
            </SafeAreaView> 
    )
    }

export default ProfileScreen;
