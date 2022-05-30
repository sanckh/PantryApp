import React, { useEffect, useRef } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native'
import { theme } from '../../core/theme'
import Header from '../../components/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AddNewItemBottomSheet from '../../components/AddNewItemBottomSheet'
import { useDispatch, useSelector } from 'react-redux'
import { appActions } from '../../redux/slices/app-slice'

export default function Inventory() {
  const inventoryList = useSelector((state) => state.app.inventory)
  const newItemBottomSheetRef = React.useRef(null)
  const dispatch = useDispatch()
  const selectedIItem = useSelector((state) => state.app.selectedInventoryItem)


  const renderListItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          dispatch(appActions.setSelectedInventoryItem(item))
          newItemBottomSheetRef.current?.expand()
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: theme.colors.primary,
          }}
        >
          {item?.name}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header>Inventory</Header>
        <Ionicons name="trash-bin" size={25} color="#FF5733" />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={inventoryList}
        renderItem={renderListItem}
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          newItemBottomSheetRef.current?.expand()
        }}
      >
        <Ionicons name="add" color="white" size={30} />
      </TouchableOpacity>
      <AddNewItemBottomSheet
        ref={newItemBottomSheetRef}
        onClose={() => {
          newItemBottomSheetRef.current?.close()
          dispatch(appActions.setSelectedInventoryItem(null))
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    height: '100%',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  listItem: {
    padding: 20,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
})
