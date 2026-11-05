import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
    return(
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <View style={styles.topMenu}>
                <Pressable style={styles.menu}>
                    <Ionicons name="chevron-back-outline" size={30}/>
                </Pressable>

                <View style={{flex:1,justifyContent:'center',marginBottom:4}}>
                    <Text style={{fontSize:23,fontWeight:600}}>Settings</Text>
                </View>
            </View>  
        </SafeAreaView>
    )
    
}

export default Settings

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

})