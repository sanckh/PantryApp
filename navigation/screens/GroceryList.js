import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import { theme } from '../../core/theme'
import Header from '../../components/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import RnIncrementDecrementBtn from '../../components/IncDecButton';
import { appActions } from '../../redux/slices/app-slice'

const GroceryList = () => {
  //state can go here
  const todos = useSelector((state) => state.app.todos)
  const [textInput, setTextInput] = React.useState('');
  const dispatch = useDispatch()

  const addTodo = () => {
    if (textInput == '') {
        Alert.alert('Error', 'Please input todo');
    } else {
        const newTodo = {
          id: Math.random(),
          task: textInput,
          completed: false,
        };
        dispatch(appActions.addToTodos(newTodo)) 
        setTextInput('');
    }
  };

  const markTodoComplete = todoId => {
    dispatch(appActions.markTodoComplete({id: todoId}))
  };

  const deleteTodo = todoId => {
    dispatch(appActions.deleteTodo({id: todoId}))
  };

  const clearAllTodos = () => {
    Alert.alert('Confirm', 'Clear todos?', [
      {
        text: 'Yes',
        onPress: () => dispatch(appActions.clearAllTodos()),
      },
      {
        text: 'No',
      },
    ]);
  };

  const renderListItem = ({ item: todo }) => {
    return (
      <View style={styles.listItem}>
        <View style ={{flex:1}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: theme.colors.text,
              margin: 6,
              textDecorationLine: todo?.completed ? 'line-through' : 'none'
            }}>
            {todo?.task}
          </Text>
        </View>
        <TouchableOpacity style = {styles.incButton}>
          <View>
            <RnIncrementDecrementBtn/>
          </View>
        </TouchableOpacity>
        {!todo?.completed && (
          <TouchableOpacity onPress = {() => markTodoComplete(todo.id)} style = {styles.actionIcon}>
            <View style = {{backgroundColor: 'green', borderRadius: 5}}>
              <Ionicons name = "checkmark" size = {29} color = "white"/>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTodo(todo.id)} style = {styles.actionIcon}>
          <View style={[{backgroundColor: 'red', borderRadius: 5}]}>
            <Ionicons name="trash" size={29} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <View style={styles.header}>
        <Header>Grocery List</Header>
        <Ionicons name="trash-bin" size={25} color="red" onPress = {clearAllTodos}/>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={renderListItem}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Add Item" 
          onChangeText = {text => setTextInput(text)}
          value={textInput}
          />
        </View>

        <TouchableOpacity onPress = {addTodo}>
          <View style={styles.iconContainer}>
            <Ionicons name="add" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
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
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    alignContent: 'center'
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
  },
  incButton: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 5,
      
  },
});

export default GroceryList
