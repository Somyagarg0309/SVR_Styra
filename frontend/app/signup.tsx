import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link, router, Stack } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import InputField from '@/components/InputField';
import SocialLoginButtons from '@/components/SocialLoginButtons';
import { useUserPreferences } from "@/store/useUserPreferences";
import Toast from 'react-native-toast-message';

const SignUpScreen = () => {
  const setUser = useUserPreferences((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const isDisabled =
    !email.trim() || !password.trim() || !confirmPass.trim();

  const handleSignup = () => {
    if (password !== confirmPass) {
  Toast.show({
    type: 'error',
    text1: 'Password mismatch',
    text2: 'Please ensure both passwords match.',
  });
  return;
}

    // extract name from email
    const username = email.split("@")[0];

    // Save to Zustand store
    setUser({
      name: username,
      email: email,
      picture: ""  // can add default DP later
    });

    // alert("Account created!");

    // redirect to questionnaire
    router.push("/questionnaire");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Sign Up',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='close' size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>

        <InputField
          placeholder="Email Address"
          placeholderTextColor={Colors.gray}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          placeholder="Password"
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <InputField
          placeholder="Confirm Password"
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          value={confirmPass}
          onChangeText={setConfirmPass}
        />

        <TouchableOpacity
          style={[styles.btn, isDisabled && { opacity: 0.5 }]}
          disabled={isDisabled}
          onPress={handleSignup}
        >
          <Text style={styles.btnTxt}>Create an Account</Text>
        </TouchableOpacity>

        <View style={styles.signInRow}>
          <Text style={styles.loginTxt}>Already have an account? </Text>

          <Link href="/signin" asChild>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.loginTxtSpan}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.divider} />

        <SocialLoginButtons emailHref="/signin" />
      </View>
    </>
  );
};

export default SignUpScreen;

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
    letterSpacing: 1.2,
    color: Colors.black,
    marginBottom: 40,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  signInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
  },
  loginTxt: {
    fontSize: 14,
    color: Colors.black,
  },
  loginTxtSpan: {
    color: Colors.primary,
    fontWeight: '600',
  },
  divider: {
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '30%',
    marginVertical: 30,
  },
});
