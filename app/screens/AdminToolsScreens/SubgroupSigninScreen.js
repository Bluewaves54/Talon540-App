import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import {subgroups} from '../LoginScreen'

function SubgroupSigninScreen({navigation}) {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={{textAlign: 'center', color: 'white'}}>Hey Talon Admins and Leads!</Text>
                <Text style={{textAlign: 'center', color: 'white'}}>Open the Drawer on the Right for stuff</Text>
                <Image 
                    style = {styles.image}
                    source={require('../../assets/construction.gif')}
                />
            </ScrollView>
        </View>
      )
}
export default SubgroupSigninScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        paddingTop: 10,
        backgroundColor: '#1f2129',
    },
    image: {
        alignItems: 'center',
        alignSelf: 'center',
    },
  });