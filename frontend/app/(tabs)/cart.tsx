import { View, Text, Image, TouchableOpacity, ScrollView, Linking, StyleSheet } from 'react-native';
import { useCartStore } from '@/store/useCartStore';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <ScrollView style={styles.container}>
      
      {/* EMPTY CART UI */}
      {cart.length === 0 && (
        <View style={styles.emptyContainer}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2038/2038854.png" }}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything yet.
            {"\n"}Start exploring products!
          </Text>
        </View>
      )}

      {/* CART ITEMS */}
      {cart.map((item) => (
        <View key={item.id} style={styles.card}>
          
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>₹{item.price}</Text>

          <View style={styles.actionRow}>
            {/* Checkout Button */}
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(item.link);
              
              }}
              style={styles.websiteButton}
            >
              <Ionicons name="link-outline" size={18} color={Colors.white} />
              <Text style={styles.websiteText}>Checkout</Text>
            </TouchableOpacity>

            {/* Delete Button */}
            <TouchableOpacity
              onPress={() => removeFromCart(item.id)}
              style={styles.deleteButton}
            >
              <Ionicons name="trash-outline" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>

        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
  },

  /* EMPTY CART UI */
  emptyContainer: {
    marginTop: 120,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 120,
    height: 120,
    opacity: 0.8,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
    lineHeight: 20,
  },

  /* CART ITEM CARD */
  card: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    backgroundColor: Colors.extraLightGray,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 10,
    color: Colors.black,
  },
  price: {
    fontSize: 16,
    color: Colors.primary,
    marginTop: 5,
    fontWeight: '600',
  },

  /* BUTTON ROW */
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },

  /* Checkout Button */
  websiteButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  websiteText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
  },

  /* Delete Button */
  deleteButton: {
    width: 45,
    height: 45,
    backgroundColor: "#8a120bff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
