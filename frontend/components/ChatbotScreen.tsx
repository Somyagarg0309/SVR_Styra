// /components/ChatbotScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';


type Props = {
  botId?: string;
};

const ChatbotScreen = ({ botId = 'fashionbot' }: Props) => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();


  const BACKEND_URL = 'http://192.168.0.101:3000/fashionbot';

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = inputText;
    setInputText('');
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setLoading(true);

    try {
      const response = await axios.post(BACKEND_URL, {
        prompt: userMessage,
        botId,
      });

      const botReply = response.data.advice || 'No response';
      setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: 'Error connecting to bot', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
  options={{
    title: 'FashionBot',
    headerLeft: () => (
      <TouchableOpacity
        style={{ marginLeft: 15 }}
        onPress={() => router.back()} // navigate back
      >
        <Ionicons name="close" size={24} color={Colors.primary} />
      </TouchableOpacity>
    ),
    headerTitleAlign: 'center',
    headerRight: () => null, // remove any right button (cross)
  }}
/>


      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === 'user' ? styles.userBubble : styles.botBubble,
              ]}
            >
              <Text style={[item.sender === 'user' ? styles.userText : styles.botText, { fontSize: 16 }]}>
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={{ padding: 10 }}
        />

        {loading && (
          <View style={{ padding: 5, alignItems: 'center' }}>
            <ActivityIndicator size="small" color={Colors.primary} />
            <Text style={{ color: Colors.black, marginTop: 3, fontSize: 14 }}>Bot is typing...</Text>
          </View>
        )}

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask FashionBot..."
            editable={!loading}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={loading}>
            <Ionicons name="send" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },

  messageBubble: {
    padding: 14,
    borderRadius: 20,
    marginVertical: 6,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#E0E0E0',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
  },
  userText: { color: Colors.black, fontWeight: '500' },
  botText: { color: Colors.white, fontWeight: '500' },

  inputWrapper: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 18,
    height: 50,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingContainer: { padding: 5, alignItems: 'center' },
  loadingText: { color: Colors.black, marginTop: 4, fontSize: 14 },
});
