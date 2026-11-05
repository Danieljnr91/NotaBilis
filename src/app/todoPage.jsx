import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ToDo = () => {
    const [todo, setTodo] = useState([]);
    return(
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <View style={styles.topMenu}>
                <Pressable style={styles.menu}>
                    <Ionicons name="chevron-back-outline" size={30}/>
                </Pressable>

                <View style={{flex:1,justifyContent:'center',marginBottom:4}}>
                    <Text style={{fontSize:23,fontWeight:600}}>To-Do List</Text>
                </View>
            </View>  

            {todo.length === 0 && (
                <View style={styles.emptyState}>
                    <Ionicons name="checkbox-outline" size={50} color="rgb(160, 160, 160)"/>
                    <Text style={{color:"rgb(160, 160, 160)",fontSize:17}}>No To-Do has been created yet</Text>
                </View>
            )}
        </SafeAreaView>
    )
    
}

export default ToDo

const styles = StyleSheet.create({
     menu:{
        borderRadius:8,
        backgroundColor:'white',
        padding:5,
        margin:15,
        width:45,
        alignItems:'center',
        borderWidth:1,
        borderColor:'rgb(165, 165, 165)'
    },

    topMenu:{
        flexDirection:'row',
        gap:7
    },

    emptyState:{
        justifyContent:"center",
        alignItems:"center",
        flex:1,
    }

})