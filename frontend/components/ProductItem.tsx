import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ProductType } from '@/types/type';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { useCartStore } from '@/store/useCartStore';

type Props = {
  item: ProductType;
  index: number;
};

const width = Dimensions.get('window').width - 40;

const ProductItem = ({ index, item }: Props) => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const isInCart = cart.some((cartItem) => cartItem.id === item.id);

  const handleToggleCart = () => {
    if (isInCart) {
      removeFromCart(item.id);
    } else {
      addToCart(item);
    }
  };

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown.delay(300 + index * 100).duration(500)}
    >
      {/* Image + Heart */}
      <View style={styles.imageContainer}>
        <Link href={`/product-details/${item.id}`} asChild>
          <TouchableOpacity>
            <Image source={{ uri: item.images[0] }} style={styles.productImg} />
          </TouchableOpacity>
        </Link>

        {/* Heart Button */}
        <TouchableOpacity style={styles.bookmarkBtn} onPress={handleToggleCart}>
          <Ionicons
            name={isInCart ? 'heart' : 'heart-outline'}
            size={22}
            color={isInCart ? 'red' : Colors.black}
          />
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.price}>Rs. {item.price}</Text>
        <View style={styles.ratingWrapper}>
          <Ionicons name="star" size={20} color={'#D4AF37'} />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </Animated.View>
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
    zIndex: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    letterSpacing: 1.1,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  price: {
    fontWeight: '700',
    color: Colors.primary,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rating: {
    fontSize: 14,
    color: Colors.gray,
  },
});
