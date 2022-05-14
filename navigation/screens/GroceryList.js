import React from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { theme } from '../../core/theme';
import Header from '../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons'


const GroceryList = () => {
    //state can go here
    const [todos, setTodos] = React.useState([
        {id:1, task:"First todo", completed: true},
        {id:2, task:"Second todo", completed: true},
    ]);

const ListItem = ({todo}) => {
    return (
        <View style = {styles.listItem}>
            <View>
                <Text style = {{fontWeight: 'bold', fontSize: 15, color: theme.colors.primary}}>
                    {todo?.task}
                </Text>
            </View>
        </View>
    )
}

    return(
<SafeAreaView style ={{flex: 1, backgroundColor: theme.colors.white}}>
    <View style = {styles.header}>
        <Header>
            Grocery List
        </Header>
        <Ionicons name="trash-bin" size = {25} color = 'red'/>
    </View>
    <FlatList 
    showsVerticalScrollIndicator = {false}
    contentContainerStyle = {{padding: 20, paddingBottom: 100}}
        data = {todos} renderItem ={({item}) => <ListItem todo ={item} />}
    />
    <View style = {styles.footer}>
        <View style ={styles.inputContainer}>
            <TextInput placeholder = "Add Item"/>
        </View>

        <TouchableOpacity>
            <View style = {styles.iconContainer}>
                <Ionicons name = "add" color= 'white' size = {30}/>
            </View>
        </TouchableOpacity>
    </View>

</SafeAreaView>

    );
}

const styles = StyleSheet.create({
header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},
footer: {
    position: 'absolute',
    bottom: 0,
    color: theme.colors.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
},
inputContainer: {
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    padding: 15,
    paddingLeft: 20,
    shadowColor: "#000",
    shadowOffset: {
	width: 0,
	height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
},
iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
},
listItem: {
    padding: 20,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
	width: 0,
	height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },

})

export default GroceryList;