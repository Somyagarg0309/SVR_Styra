import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useUserPreferences } from "@/store/useUserPreferences";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const { user, stylePref, colors, goal, fit, inspiration } = useUserPreferences();

  return (
    <ScrollView style={styles.container}>
      
      {/* USER INFO HEADER */}
      <View style={styles.header}>
        {user?.picture ? (
          <Image source={{ uri: user.picture }} style={styles.avatar} />
        ) : (
          <Ionicons name="person-circle-outline" size={90} color={Colors.gray} />
        )}

        <Text style={styles.name}>{user?.name || "User"}</Text>
        <Text style={styles.email}>{user?.email || "No email provided"}</Text>
      </View>

      <Text style={styles.sectionTitle}>Your Style Profile</Text>

      {/* STYLE PREF */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="shirt-outline" size={22} color={Colors.primary} />
          <Text style={styles.cardTitle}>Preferred Style</Text>
        </View>
        <Text style={styles.cardValue}>{stylePref || "Not selected"}</Text>
      </View>

      {/* COLOR CHOICES */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="color-palette-outline" size={22} color={Colors.primary} />
          <Text style={styles.cardTitle}>Confident Colors</Text>
        </View>
        <Text style={styles.cardValue}>
          {colors?.length ? colors.join(", ") : "No colors selected"}
        </Text>
      </View>

      {/* GOAL */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="star-outline" size={22} color={Colors.primary} />
          <Text style={styles.cardTitle}>Fashion Goal</Text>
        </View>
        <Text style={styles.cardValue}>{goal || "Not selected"}</Text>
      </View>

      {/* FIT */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="body-outline" size={22} color={Colors.primary} />
          <Text style={styles.cardTitle}>Fit Preference</Text>
        </View>
        <Text style={styles.cardValue}>{fit || "Not selected"}</Text>
      </View>

      {/* INSPIRATION */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="sparkles-outline" size={22} color={Colors.primary} />
          <Text style={styles.cardTitle}>Style Inspiration</Text>
        </View>
        <Text style={styles.cardValue}>{inspiration || "Not provided"}</Text>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    paddingVertical: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.black,
  },

  email: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 10,
    marginTop: 5,
  },

  card: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.extraLightGray,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
  },

  cardValue: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
});