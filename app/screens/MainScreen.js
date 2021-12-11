import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Button,
    ImageBackground,
}
from 'react-native';

const image = { uri: "https://cdn.discordapp.com/attachments/892936500747075624/919297354170003466/unknown.png" };

const MainScreen = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    mainPage: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        color: '#fff'
    },
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },

})

export default MainScreen;

