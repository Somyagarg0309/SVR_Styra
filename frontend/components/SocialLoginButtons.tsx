import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Href, Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Google from '@/assets/images/google-logo.svg';

import * as GoogleAuthSession from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from "expo-auth-session";
import { useUserPreferences } from '@/store/useUserPreferences';

WebBrowser.maybeCompleteAuthSession();

type Props = {
  emailHref: Href<string | object>;
};

const SocialLoginButtons = ({ emailHref }: Props) => {

  const router = useRouter();

  // Correct redirect URI for Expo Go
  const redirectUri = makeRedirectUri({
  scheme: 'myapp',  // Must match the scheme in app.json
});
  console.log(makeRedirectUri());



  const [request, response, promptAsync] = GoogleAuthSession.useAuthRequest({
    clientId: 'replace your google client id',
    
    
    redirectUri,  // Pass the generated redirect URI here
  });

  const setUser = useUserPreferences((state) => state.setUser);

useEffect(() => {
  if (response?.type === "success") {
    const { authentication } = response;

    const fetchUserInfo = async () => {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${authentication?.accessToken}` },
        }
      );

      const user = await userInfoResponse.json();
      console.log("Google User:", user);

      setUser({
        name: user.name,
        email: user.email,
        picture: user.picture,
      });

      router.push("/questionnaire");
    };

    fetchUserInfo();
  }
}, [response]);

  return (
    <View style={styles.socialLoginWrapper}>

      {/* Email Button */}
      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <Link href={emailHref} asChild>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="mail-outline" size={20} color={Colors.black} />
            <Text style={styles.btnTxt}>Continue with Email</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>

      {/* Google Button */}
      <Animated.View entering={FadeInDown.delay(700).duration(500)}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Google width={20} height={20} />
          <Text style={styles.btnTxt}>Continue with Google</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Apple Button */}
      <Animated.View entering={FadeInDown.delay(1100).duration(500)}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/questionnaire")}>
          <Ionicons name="logo-apple" size={20} color={Colors.black} />
          <Text style={styles.btnTxt}>Continue with Apple</Text>
        </TouchableOpacity>
      </Animated.View>

    </View>
  );
};

export default SocialLoginButtons;

const styles = StyleSheet.create({
  socialLoginWrapper: {
    alignSelf: 'stretch',
  },
  button: {
    flexDirection: 'row',
    padding: 10,
    borderColor: Colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 15,
  },
  btnTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
});
