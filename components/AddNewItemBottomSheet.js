import React, { forwardRef, useCallback, useState, useEffect } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import { Button, TextInput } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { appActions } from '../redux/slices/app-slice'
import { useToast } from 'react-native-toast-notifications'

const dims = Dimensions.get('window')

const INITIAL_QUANTITY = 1
const INITIAL_MIN_QUANTITY = 1

const AddNewItemBottomSheet = forwardRef((props, ref) => {
  const [name, setName] = useState( '')
  const [quantity, setQuantity] = useState( INITIAL_QUANTITY)
  const [minQuantity, setMinQuantity] = useState(INITIAL_MIN_QUANTITY)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const selectedItem = useSelector((state) => state.app.selectedInventoryItem)
  const dispatch = useDispatch()

  useEffect(() => {
    setName(selectedItem?.name ?? '')
    setQuantity(selectedItem?.quantity ?? INITIAL_QUANTITY)
    setMinQuantity(selectedItem?.minQuantity ?? INITIAL_MIN_QUANTITY)
  }, [selectedItem])

  const handleBackPress = useCallback(() => {
    // console.log('back pressed', currentIndex);
    if (currentIndex > -1) {
      props.onClose()
      return true
    }
    return false
  }, [currentIndex])

  useEffect(() => {
    const sub = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    )
    return sub.remove
  }, [currentIndex])

  const handleAdd = () => {
    dispatch(appActions.addToInventory({ name, quantity, minQuantity }))
    props.onClose()
    toast.show('Item created', {type: 'success'})
  }

  const handleUpdate = () => {
    dispatch(
      appActions.updateInventoryItem({
        ...selectedItem,
        name,
        quantity,
        minQuantity,
      })
    )
    props.onClose()
    toast.show('Item updated', {type: 'success'})
  }

  const handleDelete = () => {
    dispatch(appActions.deleteFromInventory(selectedItem))
    props.onClose()
    toast.show('Item deleted', {type: 'success'})
  }

  const getPreviousNumber = (number) => {
    if (number == 1) return 1
    return number - 1
  }

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    []
  )

  return (
    <Portal>
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={['75%']}
        enablePanDownToClose={true}
        animateOnMount
        backdropComponent={renderBackdrop}
        containerHeight={dims.height}
        backgroundStyle={{ backgroundColor: '#fff' }}
        onChange={setCurrentIndex}
        onClose={props.onClose}
      >
        <ScrollView
          style={{
            padding: 16,
          }}
        >
          <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 19 }}>
            New Item
          </Text>
          <View style={{ flex: 1, paddingTop: 24 }}>
            <Text
              style={{ color: '#333', fontWeight: 'bold', marginBottom: 5 }}
            >
              Name:
            </Text>
            <TextInput
              placeholder="Item Name"
              value={name}
              onChangeText={setName}
            />
            <Text
              style={{
                color: '#333',
                fontWeight: 'bold',
                marginBottom: 5,
                marginTop: 16,
              }}
            >
              Quantity:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',

                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity((q) => getPreviousNumber(q))}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                placeholder="Quantity"
                value={quantity.toString()}
                style={{ width: '60%', marginHorizontal: 8 }}
                onChangeText={(text) => setQuantity(Number(text))}
              />
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity((q) => q + 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#333',
                fontWeight: 'bold',
                marginBottom: 5,
                marginTop: 16,
              }}
            >
              Minimum Quantity:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  setMinQuantity((mq) => getPreviousNumber(Number(mq)))
                }
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                placeholder="Minimum Quantity"
                value={minQuantity.toString()}
                style={{ width: '60%', marginHorizontal: 8 }}
                onChangeText={(text) => setMinQuantity(Number(text))}
              />
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setMinQuantity((mq) => Number(mq) + 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {!selectedItem && (
            <Button
              mode="contained"
              color="#279AF1"
              onPress={handleAdd}
              style={{ marginTop: 70 }}
            >
              Add To Inventory
            </Button>
          )}
          {selectedItem && (
            <>
              <Button
                mode="contained"
                color="#279AF1"
                onPress={handleUpdate}
                style={{ marginTop: 30 }}
              >
                Update
              </Button>
              <Button
                mode="contained"
                color="#FF5733"
              
                onPress={handleDelete}
                style={{ marginTop: 8 }}
              >
                Remove
              </Button>
            </>
          )}
        </ScrollView>
      </BottomSheet>
    </Portal>
  )
})

const styles = StyleSheet.create({
  okButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#279AF1',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okButtonText: {
    color: '#fff',
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityButton: {
    flex: 1,
    backgroundColor: '#279AF1',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
})

export default AddNewItemBottomSheet
