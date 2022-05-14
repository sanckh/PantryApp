import React from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { theme } from '../../core/theme';
import Header from '../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';


const GroceryList = () => {
    //state can go here
    const [todos, setTodos] = React.useState([]);
    const [textInput, setTextInput] = React.useState('');

    React.useEffect(() => {
    const [todos, setTodos] = React.useState([]);
    const [textInput, setTextInput] = React.useState('')
    },[]);
    
    React.useEffect(() => {
        getTodosFromUserDevice();
    })

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
                  color: COLORS.primary,
                  textDecorationLine: todo?.completed ? 'line-through' : 'none',
                }}>
                {todo?.task}
              </Text>
            </View>
            {!todo?.completed && (
              <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
                <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
                  <Ionicons name="done" size={20} color="white" />
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
              <View style={styles.actionIcon}>
                <Ionicons name="delete" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        );
      };

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
        <TextInput
            value={textInput}
            placeholder="Add Todo"
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

})

export default GroceryList;