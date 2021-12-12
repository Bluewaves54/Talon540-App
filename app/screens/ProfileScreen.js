import React, { useState } from 'react';
import { 
    Text,
    Image,
    SafeAreaView,
    Button,
    Alert,
    StyleSheet,
    View,

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
        <SafeAreaView style={{
                justifyContent: 'center',
                flex: 1,
            }}>
            <View style={styles.displayData}>
                <Image
                    style={styles.pfp}
                    source={{
                    uri: 'https://lh3.googleusercontent.com/a-/' + data.pfp,
                    }}
                />
                <Text>Name: {data.name} </Text>
                <Text>Email: {data.email} </Text>
                <Text>Subgroup: {data.subgroup} </Text>
                <Text>Status: {data.status} </Text>
                <Text>Graduation Year: {data.gradYear} </Text>
                <Text>Unique Id: {data.deviceID}</Text>
            </View>
            <View style={styles.deleteButton}>
                <Button
                    title={'Delete Account'}
                    onPress={() => { ConfirmDeletionAlert({navigation});
                    }}/>
            </View>
        </SafeAreaView>
        // Change googleemail and googlepfpurl to data.email and data.pfp when columns are added
    )
    }

const styles = StyleSheet.create({
    pfp: {
        width: 50, //change
        height: 50,
    },
    deleteButton: {
        flex: 1,
        position: 'absolute',
        top: 615,
        left: 115,
        width: 160,
        height: 40,
    },
    displayData: {
        alignItems: 'center',
        bottom: 250, //275 with no pfp
    }
})
export default ProfileScreen;
