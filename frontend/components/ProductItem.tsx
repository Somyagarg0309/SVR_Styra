import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ProductType } from '@/types/type';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Link } from 'expo-router';


type Props = {
  item: ProductType;
  index:number
};

const width = Dimensions.get('window').width - 40;

const ProductItem = ({ index,item }: Props) => {
  return (
    <Link href={`/product-details/${item.id}`} asChild> 
     <TouchableOpacity>
    
    <Animated.View style={styles.container} entering={FadeInDown.delay(300+index*100).duration(500)}>
      {/* Wrap image + heart in a View so heart is layered over it */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.productImg} />
        <TouchableOpacity style={styles.bookmarkBtn}>
          <Ionicons name="heart-outline" size={22} color={Colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.price}>Rs. {item.price}</Text>
        <View style={styles.ratingWrapper}>
          <Ionicons name='star' size={20} color={'#D4AF37'}/>
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </Animated.View>
    </TouchableOpacity>
     </Link>
   
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 10,
  },
  imageContainer: {
    position: 'relative',
  },
  productImg: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },
  bookmarkBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 6,
    borderRadius: 30,
    zIndex: 10, // Ensure it stays on top
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    letterSpacing:1.1
  },
  productInfo:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:8
  },
  price:{
    fontWeight:'700',
    color:Colors.primary,

  },
  ratingWrapper:{
    flexDirection:'row',
    alignItems:'center',
    gap:5
  },
  rating:{
    fontSize:14,
    color:Colors.gray
  }
});
