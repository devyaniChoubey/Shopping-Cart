import React from 'react';
import {View , Text , FlatList , Button , StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';

const CartScreen = props => {
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for(const key in state.cart.items){
            transformedCartItems.push({
                productId : key,
                productTitle : state.cart.items[key].productTitle,
                productPrice : state.cart.items[key].productPrice,
                quantity : state.cart.items[key].quantity,
                sum : state.cart.items[key].sum
            })
        }

        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1: -1);
    });

    const dispatch = useDispatch();
    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                   Total : <Text style={styles.amount}>${Math.round(totalAmount.toFixed(2) * 100)/100}</Text>
               </Text>
               <Button title="Order Now" onPress={() => {
                   dispatch(orderActions.addOrder(cartItems , totalAmount))
               }} color={Colors.primary} disabled={cartItems.length === 0}/>
            </View>
            <View>
                <FlatList data={cartItems} keyExtractor={item => item.productId} renderItem={itemData => <CartItem deletable quantity={itemData.item.quantity} title={itemData.item.productTitle} amount={itemData.item.sum} onRemove={() => {
                    dispatch(cartActions.removeFromCart(itemData.item.productId))
                }}/>}/>
            </View>
        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle : 'Your Cart'
}

const styles = StyleSheet.create({
    screen : {
        margin : 20
    },
    summary : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginBottom : 20,
        shadowColor : 'black',
       shadowOpacity : 0.26,
       shadowOffset : {width : 0, height : 2},
       shadowRadius : 8,
       elevation : 5,
       borderRadius : 10,
       backgroundColor : 'white',
       padding : 10
    },
    summaryText : {
       fontFamily : 'open-sans-bold',
       fontSize : 18
    },
    amount : {
      color : Colors.primary
    }
})

export default CartScreen;