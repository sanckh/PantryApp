import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
AsyncStorage.clear()

const initialState = {
  inventory: [],
  selectedInventoryItem: null,
  todos: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addToInventory(state, action) {
      state.inventory.push({id: Math.random().toString(), ...action.payload})
    },
    deleteFromInventory(state, action) {
      let id = action.payload.id;
      let index = state.inventory.findIndex(item => item.id === id);
      state.inventory.splice(index, 1);
    },
    updateInventoryItem(state, action) {
      let id = action.payload.id;
      let index = state.inventory.findIndex(item => item.id === id);
      state.inventory[index] = action.payload;

      if (state.inventory[index].quantity <= state.inventory[index].minQuantity) {
        state.todos.push({...state.inventory[index], task: state.inventory[index].name});
        toast.show("Item added to todos list");
      }
    },
    setSelectedInventoryItem(state, action) {
      state.selectedInventoryItem = action.payload;
    },

    addToTodos(state, action) {
      state.todos.push(action.payload)
    },
    deleteTodo(state, action) {
      let id = action.payload.id;
      let index = state.todos.findIndex(item => item.id === id);
      state.todos.splice(index, 1);
    },
    updateTodo(state, action) {
      let id = action.payload.id;
      let index = state.todos.findIndex(item => item.id === id);
      state.todos[index] = action.payload;
    },
    clearAllTodos(state) {
      state.todos = [];
    },
    markTodoComplete(state, action) {
      const id = action.payload.id;
      state.todos.find(item => item.id === id).completed = true;
    }

  }
});

export const appReducer = appSlice.reducer;

export const appActions = appSlice.actions;