import {StyleSheet, Text, View, ScrollView } from 'react-native';


export default function GroceryList() {
    //state can go here

    return(
        //UI and Implement Logic
        <View style = {styles.container}>
             {/* Scroll View when list gets longer than page */}
             <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Grocery List</Text>
                </View>
             </ScrollView>
            
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED'
    }
})