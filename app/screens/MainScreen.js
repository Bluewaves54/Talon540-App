import React from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    Button,
}
from 'react-native';

import DeviceInfo from 'react-native-device-info';

let id = DeviceInfo.getUniqueId()

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