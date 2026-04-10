import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import auth from '@react-native-firebase/auth';
import AppHeader from './AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import SendMesssageCard from './SendMesssageCard';
import ResponseMessageCard from './ResponseMessageCard';
import { RECEIVED, SENT } from '../constants/chat';
import ChatInput from './ChatInput';
import { getAIResponse } from '../api/chatApi';

interface MessageData {
  id: number;
  message: string;
  type: string;
}

export default function ChatScreen() {
  const [messagesData, setMessageData] = useState<MessageData[]>([])
  const [msgInput, setMsgInput] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSend = (sentMsg: string) => {
    console.log("msgInput", sentMsg);
    setMessageData((prev) => {
      return [...prev,
      { id: prev.length + 1, message: msgInput, type: SENT }
      ]
    })

    setTimeout(() => {
      getResFromAI(sentMsg);
    }, 100);
  }

  const getResFromAI = async (sentMsg: string) => {
    setIsLoading(true);
    try {
      const responseText = await getAIResponse(sentMsg);
      console.log(responseText);
      onGetResponse(responseText);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      console.log(msgInput);
    }
  }

  const onGetResponse = (response: string) => {
    setMessageData(prevMessages => {
      return [
        ...prevMessages,
        {
          message: response,
          id: prevMessages.length + 1,
          type: RECEIVED,
        },
      ];
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesData]);

  // Function to make FlatList Scroll to bottom
  const scrollToBottom = () => {
    if (flatListRef.current && messagesData.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>

        <AppHeader />

        <FlatList
          ref={flatListRef}
          data={messagesData}
          keyExtractor={item => item.id?.toString()}
          renderItem={({ item }: { item: MessageData }) => (
            item.type === SENT ? <SendMesssageCard message={item.message} /> : <ResponseMessageCard message={item.message} />
          )}
          onLayout={scrollToBottom}
          onContentSizeChange={scrollToBottom}
        />

        <View style={{ paddingHorizontal: 8 }}>
          {isLoading && <ResponseMessageCard message={'Thinking...'} />}
        </View>

        <ChatInput
          message={msgInput}
          setMessage={setMsgInput}
          onSend={onSend}
        />



      </KeyboardAvoidingView>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black'
  },
  button: {
    backgroundColor: '#9C27B0',
    padding: 15,
    borderRadius: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
