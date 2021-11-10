import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    ImageBackground,
    TextInput,
    SafeAreaView,
    Text,
    Button,
    View,
} from 'react-native';
import MainScreen from './MainScreen';
import DeviceInfo from 'react-native-device-info';
import { NavigationContainer } from '@react-navigation/native';

let id = DeviceInfo.getUniqueId()

class TextInputBox {
    constructor(top) {
        this.top = top;
        this.left = '50%';
        this.width = 250;
        this.height = 50;
        this.margin = 10;
        this.borderWidth = 5;
        this.borderRadius = 20;
        this.padding = 10;
        this.position = 'absolute';
        this.backgroundColor = 'lightgrey';
    }
}

// function SwitchScreen() {
//     return (
//         <MainScreen />
//     )
// }

function LoginScreen(props) {
    const [data, setData] = useState([]);
    const [subgroup, onChangeText] = React.useState(null);
    const [status, onChangeText2] = React.useState(null);
    const [gradYear, onChangeNumber] = React.useState(null);
    return (
        <NavigationContainer>
            <SafeAreaView style={{
                backgroundColor: '#1f2129',
                flex: 1}}>
                <ImageBackground
                style={styles.background}
                source={require('../assets/Talon540Logo.webp')}>
                    <Text
                    style={styles.signInText}
                    >
                        Enter the Information Below
                    </Text>

                    <TextInput
                        style={styles.subgroupInput}
                        onChangeText={onChangeText}
                        value={subgroup}
                        placeholder="Programming, Mechanical, etc."
                    />
                    <TextInput
                        style={styles.statusInput}
                        onChangeText={onChangeText2}
                        value={status}
                        placeholder="Rookie/Veteran"
                    />
                    <TextInput
                        style={styles.gradYearInput}
                        onChangeText={onChangeNumber}
                        value={gradYear}
                        placeholder="Year"
                    />
                    <Button
                    style={styles.nextButton}
                    onPress={() => {
                        fetch('http://127.0.0.1:5000/'
                        + subgroup + '/' + status + '/'
                        + gradYear + '/' + id
                        ,{
                        headers : { 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                        }
                        )
                        .then(function(response){
                            return response.json();
                        })
                        .then(function(myJson){
                            setData(myJson)
                        });
                        }}
                    title="Finish"/>
                </ImageBackground>
            </SafeAreaView>
        </NavigationContainer>
    );
}

// console.log(data)

// if (data == 'True') {
//     () => {
//     return (
//         <MainScreen />
//     )
//     }
// }


export default LoginScreen;


const styles = StyleSheet.create({
    background: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        left: 40,
    },
    signInText: {
        flex: 1,
        width: 1000,
        left: '-40%',
        top: '130%',
        position: 'absolute',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        
    },
    nextButton: {
        width: 70,
        height: 40,
        color: 'white',
    },

    subgroupInput: new TextInputBox('350%'),
    statusInput: new TextInputBox('500%'),
    gradYearInput: new TextInputBox('650%'),
})
