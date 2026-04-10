import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../styles/colors';
import Feather from 'react-native-vector-icons/Feather';

interface ChatInputProps {
      message: string,
      setMessage: (message: string) => void,
      onSend: (message: string) => void,
}


const ChatInput: FC<ChatInputProps> = ({ message, setMessage, onSend }) => {

const sendMessageHandler = () => {
    if (message.trim().length > 0) {
      onSend(message)
      setMessage("")
    }
  }
      return (
            <View style={styles.container}>
                  <TextInput style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder='Type a message...'
                        multiline
                        placeholderTextColor={colors.black}
                  />

                  <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => sendMessageHandler()}>
                        {<Feather name="send" size={(15)} color={colors.white} />}
                  </TouchableOpacity>

            </View>
      );
}

const styles = StyleSheet.create({
      container: {
            flexDirection: "row",
            backgroundColor: colors.white,
            borderTopWidth: 1,
            borderTopColor: colors.mediumGray,
            padding: 8,
      },
      input: {
            flex: 1,
            backgroundColor: colors.gray,
            paddingHorizontal: 15,
            paddingVertical: 15,
            borderRadius: 20,

      },
      textMessage: {
            color: colors.white,
            fontSize: 16

      },
      sendButton: {
            width: 35,
            height: 35,
            borderRadius: 20,
            backgroundColor: colors.black,
            justifyContent: "center",
            alignItems: "center",

      }
});

export default ChatInput