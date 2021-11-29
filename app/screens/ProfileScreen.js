import React, { useState } from 'react';
import { 
    Text,
    SafeAreaView,
    Button,
    Alert,

} from 'react-native';
import { id } from './LoadScreen';

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
                fetch('http://127.0.0.1:5000/deleteAccount/' + id
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
                navigation.navigate("LoginScreen")
                } 
                // onPress: () => { return true }
            },
        ]
    );
}

const ProfileScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    return (
        <SafeAreaView><Text>
                Welcome, {id}
            </Text>
            <Button
            title={'Delete Account'}
            onPress={() => {
                ConfirmDeletionAlert({navigation});
                }} />
            </SafeAreaView>
            
    );
}

export default ProfileScreen;