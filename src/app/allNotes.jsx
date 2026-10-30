import { Ionicons, Octicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainPage = () => {
    const [search, setSearch] = useState('')
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'rgba(171, 223, 244, 0.27)'}}>
            <StatusBar style='dark'/>
            <View style={{justifyContent:'space-between',flex:1}}>

                {/* TOP BAR MENU */}
                <View>
                    <View style={styles.topMenu}>
                        <Pressable style={styles.menu}>
                            <Ionicons name="menu" size={30} color="black"/>
                        </Pressable>

                        <View style={{flex:1,justifyContent:'center',marginBottom:4}}>
                            <Text style={{fontSize:25,fontWeight:600}}>
                                NotaBilis
                            </Text>
                        </View>
                    </View>
                </View>

                {/* SEARCH BAR */}
                <View style={styles.searchBarContainer}>
                    <Ionicons name="search" size={24}/>
                    <TextInput
                        style={{flex:1, height:"100%",fontSize:16}}
                        value={search}
                        onChangeText={setSearch}
                        placeholder='Search notes'
                        returnKeyType='search'
                    />
                </View>

                {/* CATEGORIES */}
                <Text style={{marginLeft:27, fontSize:18, fontWeight:'500',marginBottom:17}}>Categories</Text>

                {/* PERSONAL CATEGORY */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                 contentContainerStyle={{flexDirection:'row',gap:25,paddingHorizontal:25}}>
                    <View style={{alignItems:'center',gap:5}}>
                        <Pressable style={[styles.catgoryStyle,{backgroundColor:"rgba(192, 134, 192, 0.39)"}]}>
                            <Ionicons name="person" size={24} color="purple"/>
                        </Pressable>
                        <Text>Personal</Text>
                    </View>

                    {/* WORK CATGORY */}
                    <View style={{alignItems:'center',gap:5}}>
                        <Pressable style={[styles.catgoryStyle,{backgroundColor:'rgba(91, 219, 91, 0.39)'}]}>
                            <Ionicons name="briefcase" size={24} color="green"/>
                        </Pressable>
                        <Text>Work</Text>
                    </View>
                   
                   {/* TRAVEL CATEGORY */}
                   <View style={{alignItems:'center',gap:5}}>
                        <Pressable style={[styles.catgoryStyle,{backgroundColor:'rgba(241, 241, 144, 0.39)'}]}>
                            <Ionicons name="car" size={24} color="rgb(213, 213, 3)"/>
                        </Pressable>
                        <Text>Travel</Text>
                    </View>

                    {/* HEALTH CATEGORY */}
                    <View style={{alignItems:'center',gap:5}}>
                        <Pressable style={[styles.catgoryStyle,{backgroundColor:'rgba(233, 136, 136, 0.39)'}]}>
                            <Ionicons name="heart" size={24} color="rgb(218, 101, 101)"/>
                        </Pressable>
                        <Text>Health</Text>
                    </View>


                    <View style={{alignItems:'center',gap:5}}>
                        <Pressable style={[styles.catgoryStyle,{backgroundColor:'rgba(211, 211, 211, 0.58)',borderRadius:10,width:45}]}>
                            <Ionicons name="add" size={24} color="grey"/>
                        </Pressable>
                    </View>
                </ScrollView>


                <View style={styles.newNoteButton}>
                    <Pressable style={{backgroundColor:'rgb(206, 231, 240)',borderRadius:30,padding:9,elevation:5}}>
                        <Ionicons name="add" size={45} color="black"/>
                    </Pressable>
                </View>


                {/* BOTTOM NAVIGATION */}
                <View style={styles.bottomNav}>
                    <View style={styles.navItem}>
                        <Ionicons name="document-text-outline" size={24} color="black"/>
                        <Text>Notes</Text>
                    </View>

                    <View style={styles.navItem}>
                        <Octicons name="star" size={24} color="black"/>
                        <Text>Favourites</Text>
                    </View>

                    <View style={styles.navItem}>
                        <Ionicons name="checkbox-outline" size={24} color="black"/>
                        <Text>To-do</Text>
                    </View>

                    <View style={styles.navItem}>
                        <Ionicons name="settings-outline" size={24} color="black"/>
                        <Text>Settings</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
       
    )
   
}

//  const NoteCards = () => {
//     return(
        
//     )

// }

export default MainPage

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

    searchBarContainer:{
        width:'90%',
        height:45,
        borderWidth:1,
        borderColor:"black",
        borderRadius:9,
        paddingLeft:10,
        flexDirection:'row',
        alignItems:'center',
        margin:15,
    },

    catgoryStyle:{
        width:50,
        height:50,
        justifyContent:'center',
        borderRadius:6,
        alignItems:'center',
    },

    newNoteButton:{
        alignSelf:'flex-end',
        marginRight:10,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:14,
    },

    bottomNav:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingVertical:12,
    },

    navItem:{
        alignItems:'center',
        gap:4
    }
})