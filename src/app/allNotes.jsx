import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainPage = () => {
    const [search, setSearch] = useState('')
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'rgba(131, 211, 243, 0.23)'}}>
            <StatusBar style='dark'/>
            <View style={{flexDirection:'column',gap:10}}>

            {/* TOP BAR MENU */}
                <View style={styles.wholePage}>
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
                <Text style={{marginLeft:27, fontSize:18, fontWeight:'500'}}>Categories</Text>

                {/* PERSONAL CATEGORY */}
                <View style={{flexDirection:'row',gap:25,marginLeft:25}}>
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

                </View>

            </View>
        </SafeAreaView>
       
    )
   
}

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
        borderRadius:7,
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
    }

})