import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert, FlatList, SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';


const Inventory = () => {

    return(
        <SafeAreaView style ={{flex: 1, backgroundColor: theme.colors.white}}>
            <View style = {styles.header}>
            <Header
                style={{
                fontWeight: 'bold',
                fontSize: 25,
                color: theme.colors.primary,
                }}>
                Inventory
            </Header>
            </View>
        </SafeAreaView>

    )



}
const styles = StyleSheet.create({

    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export default Inventory;