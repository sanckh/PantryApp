import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { theme } from '../../core/theme';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import { clear } from 'react-native/Libraries/LogBox/Data/LogBoxData';




const GroceryList = () => {
    //state can go here
    const [todos, setTodos] = React.useState([]);
    const [textInput, setTextInput] = React.useState('');
    
    React.useEffect(() => {
        getTodosFromUserDevice();
    }, []);

    React.useEffect(() => {
        saveTodoToUserDevice(todos);
      }, [todos]);

    const addTodo = () => {
    if (textInput == '') {
        Alert.alert('Error', 'Please input todo');
    } else {
        const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
        };
        setTodos([...todos, newTodo]);
        setTextInput('');
    }
    };

    const saveTodoToUserDevice = async todos => {
    try {
        const stringifyTodos = JSON.stringify(todos);
        await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (error) {
        console.log(error);
    }
    };

    const getTodosFromUserDevice = async () => {
        try {
          const todos = await AsyncStorage.getItem('todos');
          if (todos != null) {
            setTodos(JSON.parse(todos));
          }
        } catch (error) {
          console.log(error);
        }
      };

      const markTodoComplete = todoId => {
        const newTodosItem = todos.map(item => {
          if (item.id == todoId) {
            return {...item, completed: true};
          }
          return item;
        });
    
        setTodos(newTodosItem);
      };

      const deleteTodo = todoId => {
        const newTodosItem = todos.filter(item => item.id != todoId);
        setTodos(newTodosItem);
      };

      const clearAllTodos = () => {
        Alert.alert('Confirm', 'Clear todos?', [
          {
            text: 'Yes',
            onPress: () => setTodos([]),
          },
          {
            text: 'No',
          },
        ]);
      };

      const ListItem = ({todo}) => {
        return (
          <View style={styles.listItem}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: theme.colors.text,
                  textDecorationLine: todo?.completed ? 'line-through' : 'none',
                }}>
                {todo?.task}
              </Text>
            </View>
            {!todo?.completed && (
              <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
                <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
                  <Ionicons name="checkmark" size={20} color="white" />
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
              <View style={styles.actionIcon}>
                <Ionicons name="trash" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        );
      };

    return(
<SafeAreaView style ={{flex: 1, backgroundColor: theme.colors.white}}>
    <View style = {styles.header}>
    <Header
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: theme.colors.primary,
          }}>
          Grocery List
        </Header>
        <Ionicons name="trash" size = {25} color = 'red' onPress ={clearAllTodos}/>
    </View>
    <FlatList 
    showsVerticalScrollIndicator = {false}
    contentContainerStyle = {{padding: 20, paddingBottom: 100}}
        data = {todos} renderItem ={({item}) => <ListItem todo ={item} />}
    />
    <View style = {styles.footer}>
        <View style ={styles.inputContainer}>
        <TextInput
            style = {styles.textInput}
            value={textInput}
            placeholder="Add Item"
            onChangeText={text => setTextInput(text)}
          />
        </View>

        <TouchableOpacity onPress = {addTodo}>
            <View style = {styles.iconContainer}>
                <Ionicons name = "add" color= 'white' size = {30}/>
            </View>
        </TouchableOpacity>
    </View>
</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    footer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: theme.colors.white,
    },
    inputContainer: {
      height: 50,
      paddingHorizontal: 20,
      elevation: 40,
      backgroundColor: theme.colors.white,
      flex: 1,
      marginVertical: 20,
      marginRight: 20,
      borderRadius: 30,
    },
    iconContainer: {
      height: 50,
      width: 50,
      backgroundColor: theme.colors.primary,
      elevation: 40,
      borderRadius: 25,
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
    },
    actionIcon: {
      height: 25,
      width: 25,
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      marginLeft: 5,
      borderRadius: 3,
    },
    header: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textInput: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 5
    }
  });

export default GroceryList;