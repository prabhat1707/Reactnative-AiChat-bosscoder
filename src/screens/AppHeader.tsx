import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { colors } from '../styles/colors';

export default function AppHeader() {
      const handleLogout = () => {
            auth().signOut()
                  .then(() => console.log('User signed out!'))
                  .catch(error => console.error(error));
      };

      return (
            <View style={styles.container}>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={styles.logoStyle}>
                              <Image source={require('../../assests/chat_icon.png')} style={{ width: 30, height: 30 }} />
                        </View>
                  </View>


                  <TouchableOpacity onPress={() => handleLogout()}>
                        <Text style={styles.buttonText}>Logout</Text>
                  </TouchableOpacity>

            </View>
      );
}

const styles = StyleSheet.create({
      container: {
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            backgroundColor: colors.black
      },
      logoStyle: {
            width: 50,
            height: 50,
            backgroundColor: '#F3E5F5',
            borderRadius: 35,
            marginStart:20,
            justifyContent: 'center',
            alignItems: 'center',
      },
      buttonText: {
            color: colors.white,
             marginEnd:8,
             fontSize:16

      }
});
