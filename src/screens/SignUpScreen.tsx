
import firebase from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/app/dist/module/internal/web/firebaseAuth';
import { NewAppScreen } from '@react-native/new-app-screen';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

export default function SignUpScreen({ navigation }: any) {
  const isDarkMode = useColorScheme() === 'dark';

  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if(!email || !password || !confirmPassword){
    
      Alert.alert("Please fill all the fields")
      return
    }

    if(password !== confirmPassword){
      Alert.alert("Passwords do not match")
      return
    }
    setLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);
    } catch (error:any) {
       Alert.alert(error.message)
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }

  }
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
            <Text style={styles.headerText1}>Join the Chat</Text>
            <Text style={styles.headerTextBody}>Create an account to start messaging instantly</Text>
          </View>

          <View style={styles.formContainer}>

            <TextInput
              style={styles.input}
              value={email}
              placeholder="Email"
              placeholderTextColor="#999"
              autoCapitalize="words"
              onChangeText={setEmail}

            />
            <TextInput
              style={styles.input}
              placeholder="password"
              secureTextEntry
              value={password}
              placeholderTextColor="#999"
              autoCapitalize="words"
              onChangeText={setPassword}

            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              placeholderTextColor="#999"
              autoCapitalize="words"
              onChangeText={setConfirmPassword}
            />

          </View>

          <TouchableOpacity style={styles.signUp} onPress={() => handleSignUp()} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText} >Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.footerAction}>Sign In</Text>
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
  signUp: {
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
  },
  signUpButtonText: {
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
