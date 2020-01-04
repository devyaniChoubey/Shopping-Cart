import React from 'react';
import {View , Text , Image , StyleSheet,Platform, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import Card from '../UI/Card';


const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }
    return(
        
        <Card style={styles.product}>
            <View style={styles.container}>
            <TouchableCmp onPress={props.onSelect} useForeground>
            <View>
            <View style={styles.imageContainer}>
               <Image style={styles.image} source={{uri : props.image}}/>
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                {props.children}
            </View>
            </View>
            </TouchableCmp>
            </View>
        </Card>
        
    )
};

const styles = StyleSheet.create({
   product:{
       
       height : 300,
       margin : 20,
      
   },
   container:{
    overflow : 'hidden',
    borderRadius : 10
   },
   imageContainer:{
    width : '100%',
    height : '60%',
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    
   },
   image:{
       width : '100%',
       height : '100%'
   },
   title:{
      fontSize : 18,
      marginVertical : 4,
      fontFamily : 'open-sans'
    },
   price : {
     fontSize : 14,
     color : '#888',
     fontFamily : 'open-sans-bold'
   },
   actions : {
       flexDirection : 'row',
       justifyContent : 'space-between',
       alignItems : 'center',
       height : '23%',
       paddingHorizontal : 20,
  },
   details:{
       alignItems : 'center',
       height : '13%',
       padding : 10,
       fontFamily : 'open-sans-bold'
   }
})

export default ProductItem;