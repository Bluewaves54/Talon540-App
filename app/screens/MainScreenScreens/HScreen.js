import React from 'react';
import { 
    View,
    ImageBackground,
    StyleSheet,
    StatusBar
} from 'react-native';


function Hscreen() {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/JesusH.png')} resizeMode="cover" style={styles.image}>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({ //styles
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
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        paddingTop: 10,
        backgroundColor: '#1f2129',
    },
    cimage: {
        width: 75,
        height: 75,
        left: 20
    },
    ctext: {
        color: 'white', 
        fontWeight: 'bold',
        width: 260,
        fontSize: 15

    }

})

export default Hscreen