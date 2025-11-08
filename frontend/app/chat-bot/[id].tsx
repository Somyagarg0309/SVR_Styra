// /app/chat-bot/[id].tsx
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChatbotScreen from '@/components/ChatbotScreen';
import { Colors } from '@/constants/Colors';

// Expo Router provides route params as props in pages
import { useLocalSearchParams } from 'expo-router';

const ChatbotPage = () => {
  // This is the correct hook to get dynamic route params in a page
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: `${id} Chat` }} />
      {/* Close button */}
      
        
      

      {/* Chat Component */}
      <ChatbotScreen botId={id} />
    </>
  );
};

export default ChatbotPage;
