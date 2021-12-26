import React, { useState, useCallback, useEffect, Component } from 'react'
import {
    Text,
    View,
    Image,
    Button,
    SafeAreaView
    
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { data, dailyURL } from '../LoadScreen'
import { AppSettings } from '../../settings.json'

async function fetchOldMessages() {
  //Fetch old messages from firebase
}
async function syncNewMessages(Message) {
  //Send new messages to firebase
}

export default function subgroupChatsScreen() {
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Text>Hello, world!</Text>
        </View>
      )
}