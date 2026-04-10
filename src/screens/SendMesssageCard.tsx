import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../styles/colors';

interface ISentMessageCard {
    message: string
}


const SendMesssageCard: FC<ISentMessageCard> = ({message}) => {


      return (
            <View style={styles.container}>
                  <View style={styles.messageContainer}>
                        <Text style={styles.textMessage}>{message}</Text>
                  </View>
            </View>
      );
}

const styles = StyleSheet.create({
      container: {
            flexDirection: "row",
            justifyContent:"flex-end",
            marginVertical:8
      },
      messageContainer: {
            maxWidth: "80%",
            backgroundColor: colors.black,
            borderRadius: 20,
            padding:10
      },
      textMessage: {
            color: colors.white,
            fontSize: 16

      }
});

export default SendMesssageCard