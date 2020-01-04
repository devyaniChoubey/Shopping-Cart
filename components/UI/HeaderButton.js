import Colors from '../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Platform} from 'react-native';
import React from 'react';

const CustomHeaderButton = props => {
    return(
        <HeaderButton
        {...props}
        IconComponent = {Ionicons}
        iconSize={23}
        color={Platform.OS === 'android' ? 'white' : Colors.primary}
        />
    )
}

export default CustomHeaderButton;