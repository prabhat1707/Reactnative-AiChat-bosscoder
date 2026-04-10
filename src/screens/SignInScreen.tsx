import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);
      Alert.alert("Success", "Signed in successfully!");
      // Navigate to your main app screen here later
    } catch (error: any) {
      console.error("Error signing in:", error);
      Alert.alert("Sign In Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.headerStyle}>
            <View style={styles.logoStyle}>
              <Image source={require('../../assests/chat_icon.png')} style={{ width: 50, height: 50 }} />
            </View>
            <Text style={styles.headerText1}>Welcome Back</Text>
            <Text style={styles.headerTextBody}>Sign in to continue messaging</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              value={email}
              placeholder="Email"
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              placeholderTextColor="#999"
              autoCapitalize="none"
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.signIn} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.footerAction}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40
  },
  keyboardView: {
    flex: 1,
  },
  headerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  headerText1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  headerTextBody: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#666',
    paddingHorizontal: 20
  },
  logoStyle: {
    width: 70,
    height: 70,
    backgroundColor: '#F3E5F5',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  formContainer: {
    width: '100%',
    marginTop: 20
  },
  input: {
    backgroundColor: '#F5F7FA',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8ECF1',
  },
  signIn: {
    backgroundColor: '#9C27B0',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: 16,
    elevation: 4,
    width: '100%',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 15,
  },
  footerAction: {
    marginLeft: 5,
    color: '#9C27B0',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
