import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FavouritesPage = () => {
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'rgba(171, 223, 244, 0.27)'}}>
            <View style={styles.topMenu}>
                <Pressable style={styles.menu}>
                    <Ionicons name="chevron-back-outline" size={30}/>
                </Pressable>

                <View style={{flex:1,justifyContent:'center',marginBottom:4}}>
                    <Text style={{fontSize:23,fontWeight:600}}>Favourites</Text>
                </View>
            </View>  
        </SafeAreaView>
    )
    
}

export default FavouritesPage

const styles = StyleSheet.create({
     menu:{
        borderRadius:8,
        backgroundColor:'rgba(208, 224, 231, 0.36)',
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