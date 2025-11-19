import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import ProductExplore from '@/components/ProductExplore';
import { ProductType } from '@/types/type';
// import { BACKEND_URL } from '@env';

const ExploreScreen = () => {
  const { query } = useLocalSearchParams<{ query?: string }>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const quotes = [
    "“Fashion is art, and you are the canvas.”",
    "“Dress like you're already famous.”",
    "“Style is a way to say who you are without speaking.”",
    "“Life isn’t perfect, but your outfit can be.”",
    "“Your vibe attracts your tribe — let’s find your look.”",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const fetchProducts = async () => {
    if (!query) return;
    try {
      setLoading(true);
      setError('');

      const response = await axios.get(`http://your device ip:3000/searchproduct?q=${query}`);
      const fetchedProducts = response.data?.products || [];

      setProducts(fetchedProducts);
    } catch (err: any) {
      console.error('❌ Fetch error:', err.message);
      setError('Something went wrong while fetching products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);

  const renderQuote = () => (
    <View style={styles.quoteContainer}>
      <Text style={styles.quoteText}>{randomQuote}</Text>
      <View style={styles.quoteLine} />
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={Colors.primary} />
          {renderQuote()}
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
          {renderQuote()}
        </View>
      ) : products.length === 0 ? (
        <View style={styles.centerContent}>
          <Text style={styles.noDataText}>
            {query
              ? `No products found for “${query}”.`
              : ''}
          </Text>
          {renderQuote()}
        </View>
      ) : (
        <>
          <Text style={styles.heading}>
            {query ? `Results for “${query}”` : 'Available Products'}
          </Text>
          <FlatList
            data={products}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => <ProductExplore item={item} index={index} />}
          />
        </>
      )}
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: Colors.primary,
  },
  quoteContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  quoteLine: {
    width: 60,
    height: 2,
    backgroundColor: Colors.primary,
    marginTop: 10,
    borderRadius: 2,
  },
  noDataText: {
    color: Colors.gray,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import axios from 'axios';
// import { Colors } from '@/constants/Colors';
// import ProductExplore from '@/components/ProductExplore';
// import { ProductType } from '@/types/type';
// // explore.tsx
// import Constants from 'expo-constants';



// const ExploreScreen = () => {
//   const { query } = useLocalSearchParams<{ query?: string }>();
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const BACKEND_URL = Constants.expoConfig?.extra?.BACKEND_URL||'http://192.168.1.5:3000';

//   const quotes = [
//     "“Fashion is art, and you are the canvas.”",
//     "“Dress like you're already famous.”",
//     "“Style is a way to say who you are without speaking.”",
//     "“Life isn’t perfect, but your outfit can be.”",
//     "“Your vibe attracts your tribe — let’s find your look.”",
//   ];
//   const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

//   const fetchProducts = async () => {
//     if (!query) return;
//     try {
//       setLoading(true);
//       setError('');

//       const response = await axios.get(`${BACKEND_URL}/searchproduct?q=${query}`);
//       const fetchedProducts = response.data?.products || [];

//       setProducts(fetchedProducts);
//     } catch (err: any) {
//       console.error('❌ Fetch error:', err.message);
//       setError('Something went wrong while fetching products.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [query]);

//   const renderQuote = () => (
//     <View style={styles.quoteContainer}>
//       <Text style={styles.quoteText}>{randomQuote}</Text>
//       <View style={styles.quoteLine} />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <View style={styles.centerContent}>
//           <ActivityIndicator size="large" color={Colors.primary} />
//           {renderQuote()}
//         </View>
//       ) : error ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.errorText}>{error}</Text>
//           {renderQuote()}
//         </View>
//       ) : products.length === 0 ? (
//         <View style={styles.centerContent}>
//           <Text style={styles.noDataText}>
//             {query
//               ? `No products found for “${query}”.`
//               : ''}
//           </Text>
//           {renderQuote()}
//         </View>
//       ) : (
//         <>
//           <Text style={styles.heading}>
//             {query ? `Results for “${query}”` : 'Available Products'}
//           </Text>
//           <FlatList
//             data={products}
//             numColumns={2}
//             showsVerticalScrollIndicator={false}
//             columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item, index }) => <ProductExplore item={item} index={index} />}
//           />
//         </>
//       )}
//     </View>
//   );
// };

// export default ExploreScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   centerContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 16,
//     color: Colors.primary,
//   },
//   quoteContainer: {
//     marginTop: 20,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
//   quoteText: {
//     fontSize: 16,
//     color: Colors.gray,
//     textAlign: 'center',
//     fontStyle: 'italic',
//     lineHeight: 22,
//   },
//   quoteLine: {
//     width: 60,
//     height: 2,
//     backgroundColor: Colors.primary,
//     marginTop: 10,
//     borderRadius: 2,
//   },
//   noDataText: {
//     color: Colors.gray,
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });
