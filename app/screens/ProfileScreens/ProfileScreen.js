import React from 'react';
import { 
    Text,
    Image,
    SafeAreaView,
    Button,
    Alert,
    View,
    TouchableHighlight,
    StyleSheet,
    TouchableOpacity

} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { data } from '../LoadScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppSettings } from '../../settings.json'
var globalRed = AppSettings.globalRed

var method = null
var status = null
var subgroup = null
var notifmethod = null

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
                    //console.log(data);
                })
                navigation.navigate("GoogleSignInScreen")
                } 
            },
        ]
    );
}
function ProfileScreen({navigation}) { //main profile screen
    return (
        <SafeAreaView style={{
                justifyContent: 'center',
                flex: 1,
                backgroundColor: '#1f2129',
            }}>
            <View style={styles.displayName}>
            <Text style={{ color: globalRed, fontWeight: 'bold', fontSize: 32 }}>{data.name} </Text>
            </View>
            <View style={styles.displayPfp}>
            <Image
                    style={styles.pfp}
                    source={{ uri: 'https://lh3.googleusercontent.com/a-/' + data.pfp}}
                />
            </View>
            <View style={styles.displayInfo}>
                <Text style={{ color: 'lightgray', fontSize: 15, fontWeight: 'bold'}}>{data.status} in {data.subgroup}</Text>
            </View>
            <View style={{ alignItems: 'center', bottom: 180}}>
            <Text style={{ color: 'lightgray', fontSize: 12}}>Contact: {data.email}</Text>
            </View>
            <TouchableHighlight style={{left: 300, top: 220, width: 50}} onPress={() => navigation.jumpTo('Home', {screen: 'Report a Bug' })}>
                <Ionicons name="bug" color={globalRed} size={40} />     
            </TouchableHighlight>
            <TouchableOpacity style={{left: 250,}} onPress={() => navigation.navigate('Update User Info')}>
                <Ionicons name="pencil" color={'white'} size={20} />
                <Text style={{fontWeight: 'bold', color: 'white', left: -120, top: -15}}> Edit Information </Text>
            </TouchableOpacity>

            <View style={styles.deleteButton}>
                <Button
                    title={'Delete Account'}
                    onPress={() => { ConfirmDeletionAlert({navigation});
                    }}/>
            </View>
        </SafeAreaView>
    )
}


class DropdownStyle {
    constructor(top) {
        this.top = top;
        // this.left = '35%';
        this.width = 250;
        this.height = 50;
        this.margin = 10;
        this.borderWidth = 3;
        this.borderRadius = 20;
        this.padding = 10;
        this.position = 'absolute';
        this.backgroundColor = globalRed;
    }
}

const styles = StyleSheet.create({
    pfp: {
        width: 100,
        height: 100,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "black"
    },
    deleteButton: {
        flex: 1,
        position: 'absolute',
        top: 700,
        left: 110,
        width: 160,
        height: 40,
    },
    displayName: {
        bottom: 245, //275 with no pfp,
        alignItems: 'center'
    },
    displayPfp: {
        top: -180,
        alignItems: 'center',
    },
    displayInfo: {
        bottom: 330,
        alignItems: 'center'
    },
    fatty: {
        justifyContent: 'center',
        marginHorizontal: 16,
        alignSelf: 'center',
    },
    changeuserinfodropdowns: {
        justifyContent: 'center',
    },
    notifyDropdown: new DropdownStyle('350%'),
})


export default ProfileScreen