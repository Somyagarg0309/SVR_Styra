import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { defaultData } from '@/data/defaultData';
import { ProductType } from '@/types/type';
import ImageSlider from '@/components/ImageSlider';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import {useHeaderHeight} from '@react-navigation/elements'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "expo-router";






type Props = {}

const ProductDetails = (props: Props) => {
    const {id} =useLocalSearchParams();
    const addToCart = useCartStore((state) => state.addToCart);
    const router = useRouter();

    const [product, setProduct] = useState<ProductType | null>(null);
    const getProductDetails = async() =>{
    const productId = Number(id); // convert string to number
  


    for (const category in defaultData) {
      const found = defaultData[category].find((item) => item.id === productId);
      if (found) {
        // console.log('Product Found:', found);
        setProduct(found);
        return found;
      }
    }

    console.log(' Product not found');
    return undefined;

    };
    useEffect(() => {
  const fetchDetails = async () => {
    const product = await getProductDetails();
    // if (product) {
    //   console.log("Fetched Product:", product);
    // }
  };
  fetchDetails();
}, []);
const headerHeight= useHeaderHeight();
  return (
    <>
    <Stack.Screen options={{title:'Product Details', headerTransparent: true}}/>
    <View style={{ flex: 1, position: 'relative'  , top: 20}} >
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }} style={{marginTop:headerHeight+5}}>
        {product && <ImageSlider imageList={product.images}/> }
        {product && 
        (<View style={styles.container} >
            <View style={styles.ratingWrapper}>
            <View style={styles.ratingWrapper}>
            <Ionicons name='star' color={"#D4AF37"} size={18}/>
            <Text style={styles.rating}>{product.rating}</Text>
            </View>
           
            <TouchableOpacity>
                <Ionicons name='heart-outline' size={20} color={Colors.black}/>
            </TouchableOpacity>
            </View>
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.priceWrapper}>

                <Text style={styles.price}>Rs.{product.price}</Text>

            </View>

            <Text style={styles.description}>{product.description}</Text>

             </View>)}
             </ScrollView>
             <View style={styles.buttonWrapper}>
                <TouchableOpacity
  style={[
    styles.button,
    { backgroundColor: Colors.white, borderColor: Colors.primary, borderWidth: 1 },
  ]}
  onPress={() => {
    if (product) {
      addToCart(product);
    //   router.push("/(tabs)/cart"); // navigate to cart
    }
  }}
>
  <Ionicons name="cart-outline" size={20} color={Colors.primary} />
  <Text style={[styles.buttonText, { color: Colors.primary }]}>
    Add to Cart
  </Text>
</TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>AI Try On</Text>
                </TouchableOpacity>
             </View>
    </View>
    </>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
    },
    ratingWrapper:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: 5

    },
    rating:{
        marginLeft:5,
        fontSize:14,
        fontWeight:'400',
        color: Colors.gray

    },
    title:{
        fontSize:20,
        fontWeight:'400',
        color: Colors.black,
        letterSpacing:0.6,
        lineHeight:32
    },
    priceWrapper:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
        gap:5
    },
    price:{
        fontSize:18,
        fontWeight:'600',
        color: Colors.black
    },
    description:{
        marginTop:20,
        fontSize:16,
        fontWeight:'400',
        color: Colors.black,
        letterSpacing: 0.6,
        lineHeight: 24
    },
    buttonWrapper:{
        position:'absolute',
        height:90,
        padding:20,
        bottom:0,
        width:'100%',
        backgroundColor:Colors.white,
        flexDirection:'row',
        gap:10
    }, 
    button:{
        flex:1,
        flexDirection:'row',
        backgroundColor: Colors.primary,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        gap:5,
        elevation:5,
        shadowColor:Colors.black,
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    buttonText:{
        fontSize:16,
        fontWeight:'500',
        color: Colors.white
    }
})