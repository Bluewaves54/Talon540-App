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

export default function Example() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 2,
        text: 'Hello '+data.name,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Test User',
          avatar: 'https://scontent.fric1-2.fna.fbcdn.net/v/t1.6435-9/180978949_314228950059549_1005358403722529104_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=hWaUoD2qgF4AX_zO-2H&_nc_ht=scontent.fric1-2.fna&oh=00_AT-e6eQxdQy8O3iKxK7JNDLjtrJc1l9rvWwYMeTG7KEWEA&oe=61EDFC8E',
        },
      },
      {
        _id: 1,
        text: 'Welcome to the '+data.subgroup+' Chat!',
        createdAt: new Date(Date.now.call()),
        system: true,
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <SafeAreaView style={{flex:1}}>
      {/* <Button
        title="Click to load previous messages"
        onPress={}
      /> */}
      <GiftedChat
        messages={messages}
        onSend={messages => {
          onSend(messages)
        }}
        placeholder="Send a Message"
        user={{
          _id: 3,
          name: data.name,
          avatar: 'https://lh3.googleusercontent.com/a-/' + data.pfp,
        }}
        loadEarlier={true}
      />
  </SafeAreaView>
  )
}

//Not a clue how this package worksheet_key
//https://github.com/FaridSafi/react-native-gifted-chat