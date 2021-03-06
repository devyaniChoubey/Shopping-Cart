import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colors';
import {Platform} from 'react-native';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import {Ionicons} from '@expo/vector-icons';
import UserProductsScreens from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';


const defaultNavOptions = {
    headerStyle : {
        backgroundColor : Platform.OS === 'android' ? Colors.primary : 'white'
    },
    headerTitleStyle:{
        fontFamily : 'open-sans-bold'
    },
    headerBackTitleStyle:{
       fontFamily :'open-sans-bold'
    },
    headerTintColor : Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductOverviewScreen,
    ProductDetail : ProductDetailScreen,
    Cart : CartScreen
},{
    navigationOptions:{
       drawerIcon : drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
       size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
    Orders : OrdersScreen
}, { navigationOptions:{
   drawerIcon : drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list':'ios-list'}
   size={23} color={drawerConfig.tintColor}/>
},
    defaultNavigationOptions : defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    Users : UserProductsScreens,
    Edit : EditProductScreen
}, { navigationOptions:{
   drawerIcon : drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create':'ios-create'}
   size={23} color={drawerConfig.tintColor}/>
},
    defaultNavigationOptions : defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
    Products : ProductsNavigator,
    Orders : OrdersNavigator,
    Users : AdminNavigator
},{
    contentOptions : {
        activeTintColor : Colors.primary
    }
})

export default createAppContainer(ShopNavigator);