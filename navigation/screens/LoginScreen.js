import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {IonButton, IonCheckbox, IonIcon, IonInput, IonItem, IonLabel, IonList, IonToggle} from "@ionic/react";
import {lockClosed, logoFacebook, logoGoogle, person} from "ionicons/icons";

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'  
    },

})
