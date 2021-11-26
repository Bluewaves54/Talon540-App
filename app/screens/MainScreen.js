import React from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
}
from 'react-native';
const MainScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView>
            <Text
            styles={styles.mainPage}>
                Main Page
            </Text>
        </SafeAreaView>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    mainPage: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        color: '#fff'
    }
})