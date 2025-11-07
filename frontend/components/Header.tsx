import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';


const Header = () => {
    const insets= useSafeAreaInsets();
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

  return (
    <View style={[styles.container,{paddingTop:insets.top}]}>
      <Text style={styles.logo}>Styra</Text>
      <View style={styles.searchBar}>
  <Ionicons name='search-outline' size={20} color={Colors.gray} />
  <TextInput
    style={styles.searchTxtInput}
    placeholder='Search products...'
    placeholderTextColor={Colors.gray}
    value={searchText}
    onChangeText={setSearchText}
    returnKeyType='search'
    onSubmitEditing={() => {
      if (searchText.trim()) {
        router.push({
          pathname: '/explore',
          params: { query: searchText.trim() },
        });
        setSearchText(''); // ✅ clear input after search
      }
    }}
  />
</View>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingBottom:10,
        gap:15

    },
    logo:{
        fontSize:24,
        fontWeight:'700',
        color:Colors.primary
    },
    searchBar:{
        flex:1,
        backgroundColor: Colors.background,
        borderRadius:5,
        paddingVertical:8,
        paddingHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    searchTxt:{
        color: Colors.gray
    },
    searchTxtInput: {
  flex: 1,
  marginLeft: 8,
  fontSize: 16,
  color: Colors.black,
},

})