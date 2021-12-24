import React, { Component, setStatem, useRef } from 'react';
import { Text, View, Image, Button, Linking, StatusBar, SafeAreaView, Alert, TouchableHighlight } from 'react-native';
import { AppSettings } from '../../settings.json'
import Clipboard from '@react-native-clipboard/clipboard';
import { WebView } from 'react-native-webview';


let spreadsheetID = '12P--EB0GyQdKmmhb0GEiTHZLPaGGP1EfUwHppgkShr0'
let dayID = '49126839'
//get spreadsheet of the day

export default class CovidSheetsScreen extends Component {
  render() {
    return (
      <View style={{
          backgroundColor: AppSettings.globalGray,
          flex: 1,
          paddingTop: 100}}>
        <WebView
          source={{ uri: "https://docs.google.com/spreadsheets/d/"+spreadsheetID+"/pubhtml?gid="+dayID }}
          //source={{html: '<iframe width="100%" height="50%" src="https://www.youtube.com/embed/cqyziA30whE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'}}
          renderError={(errorName) => <Error name={errorName} />}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          pullToRefreshEnabled={true}
          ref={r => (this.webref = r)}
        />
        <Button
          title='Click to Reload Page'
          onPress={() => { 
            this.webref.reload()
        }}/>
      </View>
    );
  }
}


<iframe 
  src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTwniYiYR6oW5hh3CFQTPNr2fpzh7SYFD16IHr2_gABqnWYcEGYe6J_mtdgMurzk36iZICNPC49s7tO/pubhtml?gid=49126839&amp;single=true&amp;widget=true&amp;headers=false">
</iframe>