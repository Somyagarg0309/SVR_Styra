import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useUserPreferences } from "@/store/useUserPreferences";
import { Stack } from "expo-router";


export default function QuestionnaireScreen() {
  const [stylePref, setStylePref] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [fit, setFit] = useState("");
  const [inspiration, setInspiration] = useState("");

  const setPreferences = useUserPreferences((state) => state.setPreferences);

  const toggleColor = (c: string) => {
    if (colors.includes(c)) {
      setColors(colors.filter((item) => item !== c));
    } else {
      setColors([...colors, c]);
    }
  };

  const handleContinue = () => {
    // Save answers to global store
    setPreferences({
      stylePref,
      colors,
      goal,
      fit,
      inspiration,
    });

    router.dismissAll();
    router.push("/(tabs)");
  };

  return (
    <>
    <Stack.Screen
        options={{
          title: "Your Style Profile",
          headerShown: true,
          headerTitleStyle: { fontSize: 20, fontWeight: "700" },
        }}
      />
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Tell us about your style ✨</Text>

      {/* 1. Style Preference */}
      <Text style={styles.label}>1. What is your preferred clothing style?</Text>
      <View style={styles.optionGrid}>
        {[
          "Casual",
          "Formal",
          "Streetwear",
          "Ethnic",
          "Partywear",
          "Minimalist",
          "Sporty",
        ].map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.option, stylePref === s && styles.selected]}
            onPress={() => setStylePref(s)}
          >
            <Text
              style={[styles.optionText, stylePref === s && styles.selectedText]}
            >
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 2. Color Confidence */}
      <Text style={styles.label}>2. What colors do you feel confident wearing?</Text>
      <View style={styles.optionGrid}>
        {[
          "Black",
          "White",
          "Pastels",
          "Bright colors",
          "Earth tones",
          "Neutrals",
        ].map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.option, colors.includes(c) && styles.selected]}
            onPress={() => toggleColor(c)}
          >
            <Text
              style={[
                styles.optionText,
                colors.includes(c) && styles.selectedText,
              ]}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 3. Fashion Goal */}
      <Text style={styles.label}>3. What is your primary fashion goal?</Text>
      <View style={styles.optionGrid}>
        {[
          "Improve daily outfits",
          "Refresh wardrobe",
          "Find clothes for body type",
          "Get styling suggestions",
        ].map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.option, goal === g && styles.selected]}
            onPress={() => setGoal(g)}
          >
            <Text
              style={[styles.optionText, goal === g && styles.selectedText]}
            >
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 4. Fit Preference */}
      <Text style={styles.label}>4. Which fit do you prefer?</Text>
      <View style={styles.optionGrid}>
        {["Slim fit", "Regular fit", "Oversized / Relaxed"].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.option, fit === f && styles.selected]}
            onPress={() => setFit(f)}
          >
            <Text
              style={[styles.optionText, fit === f && styles.selectedText]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 5. Inspiration */}
      <Text style={styles.label}>5. Who inspires your style?</Text>
      <TextInput
        placeholder="Type a name "
        placeholderTextColor={Colors.gray}
        style={styles.input}
        value={inspiration}
        onChangeText={setInspiration}
      />

      {/* Continue Button */}
      <TouchableOpacity style={styles.btn} onPress={handleContinue}>
        <Text style={styles.btnTxt}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginTop: 15,
    marginBottom: 8,
  },
  optionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.extraLightGray,
  },
  optionText: {
    color: Colors.black,
    fontSize: 14,
  },
  selected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  selectedText: {
    color: Colors.white,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.extraLightGray,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: Colors.black,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
});
