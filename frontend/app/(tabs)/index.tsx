import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';
import ProductItem from '@/components/ProductItem';
import { Colors } from '@/constants/Colors';
import { defaultData } from '@/data/defaultData';
import { ProductType } from '@/types/type';
import { useRouter } from 'expo-router';
import ChatbotScreen from '@/components/ChatbotScreen';




const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-180));
  const router = useRouter();
  const [isChatVisible, setIsChatVisible] = useState(false);



  // Automatically generate category names from your data
  const categories = ['All', ...Object.keys(defaultData)];

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = () => {
    if (selectedCategory === 'All') {
      const allProducts: ProductType[] = Object.values(defaultData).flat();
      setProducts(allProducts);
    } else {
      setProducts(defaultData[selectedCategory] || []);
    }
  };

  const toggleSidebar = () => {
    const toValue = isSidebarVisible ? -180 : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />

      <View style={styles.container}>
        {/* Sidebar Toggle Button */}
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Ionicons name="menu" size={26} color={Colors.primary} />
        </TouchableOpacity>

        {/* Sidebar */}
        <Animated.View
          style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
        >
          <Text style={styles.sidebarTitle}>Categories</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.activeCategoryButton,
              ]}
              onPress={() => {
                setSelectedCategory(category);
                toggleSidebar();
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Product Grid */}
        <View style={styles.productsWrapper}>
          <FlatList
            data={products}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ index,item }) => <ProductItem item={item} index={index} />}
            ListEmptyComponent={
              <Text style={styles.noDataText}>No products available.</Text>
            }
          />
       <TouchableOpacity
  style={styles.floatingButton}
  onPress={() => router.push('/chat-bot/fashionbot')} // pass any id here
>
  <Ionicons name="chatbubble-ellipses" size={28} color={Colors.white} />
</TouchableOpacity>

          
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: Colors.highlight,
    borderRadius: 30,
    padding: 8,
    elevation: 4,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 180,
    height: '100%',
    backgroundColor: Colors.lightGray,
    paddingTop: 80,
    paddingHorizontal: 15,
    zIndex: 5,
    elevation: 8,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeCategoryButton: {
    backgroundColor: Colors.highlight,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.black,
  },
  activeCategoryText: {
    color: Colors.white,
    fontWeight: '600',
  },
  productsWrapper: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  noDataText: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: 14,
    marginTop: 50,
  },
  floatingButton: {
  position: 'absolute',
  bottom: 30,
  right: 20,
  backgroundColor: Colors.primary,
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5,
  zIndex: 20,
},

});

// import { Image, StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { ProductType } from '@/types/type'
// import { FlatList } from 'react-native-gesture-handler'
// import { Stack } from 'expo-router'
// import Header from '@/components/Header'
// import ProductItem from '@/components/ProductItem'

// type Props = {}

// const HomeScreen = (props: Props) => {

//   const [products,setProducts]=useState<ProductType[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true)

//   useEffect(() => {
//     getProducts();

//   },[])
//   const getProducts = async () => {
//     const URL = `http://localhost:8000/products`;
//     const response = await axios.get(URL);
//     // console.log(response.data)
//     setProducts(response.data);
//     setIsLoading(false);
//   }
//   return (
//     <>
//     <Stack.Screen options={{headerShown: true,
//     header: () => <Header/>
//     }}/>
//     <View style={styles.container}>
//       <Text>Home Screen</Text>
//       <FlatList data={products} numColumns={2} columnWrapperStyle={{justifyContent:'space-between', marginBottom:20}} keyExtractor={(item) => item.id.toString()} renderItem={({index, item}) => (
//         <ProductItem item={item}/>
        
//       )}/>
//     </View>
//     </>
    
//   )
// }

// export default HomeScreen

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal:20
    
//   },
  
// })