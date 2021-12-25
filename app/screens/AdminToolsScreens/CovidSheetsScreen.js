import React from 'react';
import { Text, View, Image, Button, Linking, StatusBar, SafeAreaView, Alert, TouchableHighlight } from 'react-native';
import { AppSettings } from '../../settings.json'
import Clipboard from '@react-native-clipboard/clipboard';
import { WebView } from 'react-native-webview';
import { dailyURL, data } from '../LoadScreen'

export default function CovidSheetsScreen() {
    return (
      <View style={{
          backgroundColor: AppSettings.globalGray,
          flex: 1,
          paddingTop: 100}}>
        <WebView
          source={{ uri: dailyURL }}
          //source={{html: '<iframe width="100%" height="50%" src="https://www.youtube.com/embed/cqyziA30whE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'}}
          renderError={(errorName) => <Error name={errorName} />}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          pullToRefreshEnabled={true}
          ref={r => (this.webref = r)}
        />
      </View>
    );
}