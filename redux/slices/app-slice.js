import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  inventory: [],
  selectedInventoryItem: null,
  grocery: [],
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
        state.grocery.push(state.inventory[index]);
        toast.show("Item added to grocery list");
      }
    },
    setSelectedInventoryItem(state, action) {
      state.selectedInventoryItem = action.payload;
    },

    addToGrocery(state, action) {
      state.grocery.push({id: Math.random().toString(), ...action.payload})
    },
    deleteFromGrocery(state, action) {
      let id = action.payload.id;
      let index = state.grocery.findIndex(item => item.id === id);
      state.grocery.splice(index, 1);
    },
    updateGroceryItem(state, action) {
      let id = action.payload.id;
      let index = state.grocery.findIndex(item => item.id === id);
      state.grocery[index] = action.payload;
    }

  }
});

export const appReducer = appSlice.reducer;

export const appActions = appSlice.actions;