import React, { useState, useCallback, useEffect } from 'react';
import {StyleSheet, View , Text, ScrollView, TextInput, Platform } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products';
import {HeaderButtons , Item} from 'react-navigation-header-buttons';


const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId')
   const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))
    const [title , setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [imageUrl , setimageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price , setPrice] = useState('')
    const [description , setDescription] = useState(editedProduct ? editedProduct.description : '')
 
    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if(editedProduct){
            dispatch(productActions.updateProduct(prodId, title , description, imageUrl))
        }else{
            dispatch(productActions.createProduct(title , description, imageUrl, +price))
        }
        props.navigation.goBack();
    },[dispatch, prodId, description, imageUrl , price])

    textChangeHandler = text => {
        setTitle(text)
    }
    
    useEffect(() => {
      props.navigation.setParams({submit : submitHandler})
    }, [submitHandler])

    return(
   <ScrollView>
       <View style={styles.form}>
       <View style={styles.formControl}>
           <Text style={styles.label}>Title</Text>
           <TextInput style={styles.input} 
           keyboardType='default' autoCapitalize='sentences' 
           autoCorrect={false} returnKeyType='next' onEndEditing={() => console.log('submitted')} value={title} 
           onChangeText={textChangeHandler}/>
       </View>
       <View style={styles.formControl}>
           <Text style={styles.label}>ImageUrl</Text>
           <TextInput style={styles.input} value={imageUrl} 
           onChangeText={text => setimageUrl(text)}/>
       </View>
       {editedProduct ? null : (<View style={styles.formControl}>
           <Text style={styles.label}>Price</Text>
           <TextInput style={styles.input} keyboardType='decimal-pad' value={price} onChangeText={text => setPrice(text)}/>
       </View>)}
       <View style={styles.formControl}>
           <Text style={styles.label}>Description</Text>
           <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)}/>
       </View>
       </View>
   </ScrollView>
    )
}

const styles = StyleSheet.create({
    form : {
        margin : 20
    },
    formControl : {
        width : '100%'
    },
    label:{
       fontFamily : 'open-sans-bold',
       marginVertical : 8 
    },
    input : {
        paddingHorizontal : 2,
        paddingVertical : 5,
        borderBottomColor : '#ccc',
        borderBottomWidth : 1
    }
})

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return{
        headerTitle : navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight : <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title="Save" iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={submitFn}/>
    </HeaderButtons>

    }
}

export default EditProductScreen;