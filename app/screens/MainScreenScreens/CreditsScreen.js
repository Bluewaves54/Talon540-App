import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    StatusBar,
    ScrollView,
    Image,
    Linking,
}
from 'react-native';
import { AppSettings, RoboticsInfo } from '../../settings.json'

function creditsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <TouchableHighlight onPress={() => Linking.openURL('https://www.team540.com/') }>
                    <Image style={styles.cimage} source={require('../../assets/540Logo.png')}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => Linking.openURL('https://www.youtube.com/channel/UCmFYaqYPF0VVNm2AFWu_OKQ') }>
                    <Image style={styles.cimage} source={require('../../assets/youtubeLogo.png')}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => Linking.openURL('https://www.twitch.tv/talon540') }>
                    <Image style={styles.cimage} source={require('../../assets/twitchLogo.png')}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => Linking.openURL('https://discord.gg/qhhv78XuYg') }>
                    <Image style={styles.cimage} source={require('../../assets/discordLogo.png')}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => Linking.openURL('https://www.instagram.com/talon540/') }>
                    <Image style={styles.cimage} source={require('../../assets/instagramLogo.png')}/>
                </TouchableHighlight>
                <View style={{left: 120, bottom: 350}}>
                    <Text style={styles.ctext}>Visit the Talon540 website designed by the PR subgroup!{"\n\n"}</Text>
                    <Text style={styles.ctext}>Visit the Talon540 YouTube channel!{"\n\n\n"}</Text>
                    <Text style={styles.ctext}>Visit the Talon540 Twitch channel!{"\n\n\n"}</Text>
                    <Text style={styles.ctext}>Join the Talon540 Discord Server!{"\n\n\n"}</Text>
                    <Text style={styles.ctext}>Check out the Talon540 Instagram Page!{"\n\n\n\n"}</Text>
                </View>
                <View
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{width: 260, bottom: 200, fontSize: 15, fontWeight: "bold", color: 'white', textAlign: 'center'}}>App designed by Sriman Achanta, Ayush Pal, and the Programming Subgroup</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
      )
}

export default creditsScreen

const styles = StyleSheet.create({ //styles
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        paddingTop: 20,
        backgroundColor: AppSettings.globalGray,
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