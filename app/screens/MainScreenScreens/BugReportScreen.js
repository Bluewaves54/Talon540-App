import React, {Component} from 'react';
import { Text, View, Button, Alert } from 'react-native';
import developers from '../LoginScreen'
import MakeItRain from 'react-native-make-it-rain';
import Ionicons from 'react-native-vector-icons/Ionicons';

// function rightChoice() {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Make It Rain</Text>
//             <MakeItRain
//               numItems={80}
//               itemDimensions={{width: 40, height: 20}}
//               itemComponent={<Ionicons name={'logo-apple'}/>}
//               itemTintStrength={0.8}
//             />
//         </View>
//     );
// }
function bugReportScreen() {
    return (
        <View
          style={{
                flex: 1,
                justifyContent: "center",
            alignItems: "center"
          }}>
          <Text>Found any Bugs?</Text>
          <Text>Email them to: {'Ayush Pal and Sriman Achanta'}</Text>
          <Button 
            title={"Click for a Suprise"}
            onPress={() => {
                Alert.alert(
                    'Is Strategy a meme Subgroup?',
                    'Yes or No?',
                    [
                        {
                            text: 'No',
                            onPress: () => { 
                                Alert.alert('Wrong Choice') 
                            },
                            style: 'cancel'
                        },
                        {
                            text: 'Yes',
                            onPress: () => { 
                                Alert.alert('Right Choice')
                            },
                        },
                    ]
                
                )
                }
            }/>
        </View>
      )
}
export default bugReportScreen