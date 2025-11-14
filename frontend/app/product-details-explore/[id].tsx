import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useHeaderHeight } from '@react-navigation/elements';
import { ProductType } from '@/types/type';
import ImageSlider from '@/components/ImageSlider';
import { useCartStore } from "@/store/useCartStore";
import { Linking } from 'react-native';

const ProductDetailsExplore = () => {
  const { product } = useLocalSearchParams<{ product?: string }>();
  const [productData, setProductData] = useState<ProductType | null>(null);
  const headerHeight = useHeaderHeight();
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    if (product) {
      try {
        setProductData(JSON.parse(product));
      } catch (error) {
        console.error('❌ Error parsing product data:', error);
      }
    }
  }, [product]);

  if (!productData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={{ color: Colors.gray }}>Product not found</Text>
      </View>
    );
  }

  const isInCart = cart.some((item) => item.id === productData.id);

  const handleToggleCart = () => {
    if (productData) {
      if (isInCart) {
        removeFromCart(productData.id);
      } else {
        addToCart(productData);
      }
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Product Details',
          headerTransparent: true,
        }}
      />
      <View style={{ flex: 1, position: 'relative', top: 20 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          style={{ marginTop: headerHeight + 5 }}
        >
          {productData.images && productData.images.length > 0 ? (
            <ImageSlider imageList={productData.images} />
          ) : (
            <Image
              source={{ uri: productData.images[0] }}
              style={{ width: '100%', height: 300, borderRadius: 10 }}
            />
          )}

          <View style={styles.container}>
            {/* Rating + Heart */}
            <View style={styles.ratingWrapper}>
              <View style={styles.ratingInner}>
                <Ionicons name="star" color={'#D4AF37'} size={18} />
                <Text style={styles.rating}>{productData.rating}</Text>
              </View>
              <TouchableOpacity onPress={handleToggleCart}>
                <Ionicons
                  name={isInCart ? 'heart' : 'heart-outline'}
                  size={20}
                  color={isInCart ? 'red' : Colors.black}
                />
              </TouchableOpacity>
            </View>

            {/* Title */}
            <Text style={styles.title}>{productData.title}</Text>

            {/* Price */}
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>Rs. {productData.price}</Text>
            </View>

            {/* Description */}
            <Text style={styles.description}>{productData.description}</Text>
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: Colors.white, borderColor: Colors.primary, borderWidth: 1 },
            ]}
            onPress={handleToggleCart} // add/remove from cart
          >
            <Ionicons name="cart-outline" size={20} color={Colors.primary} />
            <Text style={[styles.buttonText, { color: Colors.primary }]}>
              {isInCart ? 'Added' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (productData?.link) {
                Linking.openURL(productData.link); // Buy Now / external link
              }
            }}
          >
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ProductDetailsExplore;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ratingInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.gray,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.black,
    letterSpacing: 0.6,
    lineHeight: 32,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.black,
    letterSpacing: 0.6,
    lineHeight: 24,
  },
  buttonWrapper: {
    position: 'absolute',
    height: 90,
    padding: 20,
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    gap: 5,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
