import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import InputField from '@/components/InputField'
import SocialLoginButtons from '@/components/SocialLoginButtons'
import { Colors } from '@/constants/Colors'

import { useUserPreferences } from "@/store/useUserPreferences";

const SignInScreen = () => {
  const setUser = useUserPreferences((state) => state.setUser);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const isDisabled = email.trim() === "" || password.trim() === "";

  const isGmail = (email: string) => email.toLowerCase().endsWith("@gmail.com");

  const handleLogin = () => {
    if (isDisabled) return;

    if (!isGmail(email)) {
      alert("Only Gmail addresses are allowed");
      return;
    }

    setUser({
      name: email.split("@")[0],
      email,
      picture: ""
    });

    router.push('/questionnaire');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Sign In',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={Colors.black} />
            </TouchableOpacity>
          )
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>

        {/* NORMAL EMAIL INPUT */}
        <InputField
          placeholder="Email Address"
          placeholderTextColor={Colors.gray}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}   // <-- FIXED: removed auto-append logic
        />

        <InputField
          placeholder="Password"
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.btn, isDisabled && styles.disabledBtn]}
          disabled={isDisabled}
          onPress={handleLogin}
        >
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signInRow}>
          <Text style={styles.loginTxt}>Don't have an account? </Text>

          <Link href={"/signup"} asChild>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.loginTxtSpan}> Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.divider} />
        <SocialLoginButtons emailHref={'/signin'} />
      </View>
    </>
  )
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 50,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  signInRow: {
    flexDirection: 'row',
    marginTop: -20,
  },
  loginTxt: {
    marginTop: 30,
    fontSize: 14,
    color: Colors.black,
    marginBottom: 30,
  },
  loginTxtSpan: {
    color: Colors.primary,
    fontWeight: '600',
    transform: [{ translateY: 33 }],
  },
  divider: {
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '30%',
    marginBottom: 30,
  },
  disabledBtn: {
    opacity: 0.5,
  },
});
