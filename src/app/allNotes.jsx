import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainPage = () => {
    const [search, setSearch] = useState('');
    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    const [categories, setCategories] = useState([
    { name: 'Personal', icon: 'person', color: 'purple', background: 'rgba(192, 134, 192, 0.39)', isCustom:false },
    { name: 'Work', icon: 'briefcase', color: 'green', background: 'rgba(91, 219, 91, 0.39)', isCustom:false },
    { name: 'Travel', icon: 'car', color: 'rgb(213, 213, 3)', background: 'rgba(219, 219, 61, 0.39)', isCustom:false },
    { name: 'Health', icon: 'heart', color: 'rgb(218, 101, 101)', background: 'rgba(233, 136, 136, 0.39)', isCustom:false }
]);

    const createCategory = () => {
        const name = categoryName.trim();

        if (name === '') {
            return;
        }

        setCategories([...categories, {
            name: name,
            icon: 'create-outline',
            color: 'grey',
            background: 'rgba(211, 211, 211, 0.58)',
            isCustom:true,
        }]);

        setCategoryName('');
        setModalVisible(false);
    };


    const deleteCategory = (categoryName) => {
        setCategories(categories.filter(category => 
            category.name !== categoryName
        ));
    };
    return(
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <StatusBar style='dark'/>
            <View style={{justifyContent:'space-between',flex:1}}>

                {/* TOP BAR MENU */}
                <View style={styles.topMenu}>
                    <Pressable style={({pressed}) => [styles.menu,pressed&&{transform:[{scale:0.95}]}]}>
                        <Ionicons name="menu" size={30} color="black"/>
                    </Pressable>

                    <View style={{flex:1,justifyContent:'center',marginBottom:4}}>
                        <Text style={{fontSize:25,fontWeight:600}}>
                            NotaBilis
                        </Text>
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
                    {categories.map((category, index) => (
                        <View key={index} style={{alignItems:'center', gap:5}}>
                            <Pressable
                                style={({pressed}) => [
                                    styles.catgoryStyle,
                                    {backgroundColor: category.background},
                                    pressed && {transform:[{scale:0.95}]}
                                ]}
                            >
                                <Ionicons
                                    name={category.icon}
                                    size={24}
                                    color={category.color}
                                />
                            </Pressable>

                            <Text>{category.name}</Text>

                            {category.isCustom && (
                            <Pressable onPress={() => deleteCategory(category.name)}>
                                <Ionicons name="trash-outline" size={16} color="red"/>
                            </Pressable>
                        )}
                        </View>
                    ))}

                    <View style={{alignItems:'center',gap:5}}>
                        <Pressable style={({pressed}) => [styles.catgoryStyle,{backgroundColor:'rgba(211, 211, 211, 0.58)',borderRadius:10,width:45},
                            pressed&&{transform:[{scale:0.95}]}
                        ]} onPress={() => setModalVisible(true)}>
                            <Ionicons name="add" size={24} color="grey"/>
                        </Pressable>
                    </View>
                </ScrollView>

                {notes.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text-outline" size={50} color="rgb(160, 160, 160)"/>
                        <Text style={{color:"rgb(160, 160, 160)",fontSize:17}}>No notes created</Text>
                        <Text style={{color:"rgb(160, 160, 160)",fontSize:17}}>Press + to create a note</Text>
                    </View>
                )}


                <View style={styles.newNoteButton}>
                    <Pressable style={({pressed}) => [{backgroundColor:"white",borderRadius:30,padding:9,elevation:3},
                        pressed&&{transform:[{scale:0.95}]},
                    ]}>
                        <Ionicons name="add" size={45} color="black"/>
                    </Pressable>
                </View> 

                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={{fontSize:16, fontWeight:'500',marginBottom:10}}>Add a New Category</Text>
                            <TextInput
                                placeholder="Enter category name"
                                value={categoryName}
                                onChangeText={setCategoryName}
                            />

                            <Pressable onPress={createCategory} style={{backgroundColor:'royalblue', padding:4, width:"25%",alignItems:"center",borderRadius:6}}>
                                <Text style={{color:'white'}}>Create</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
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

    emptyState:{
        justifyContent:"center",
        alignItems:"center",
        flex:1,
        marginBottom:120,
    },

    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 15,
        elevation: 5,
    },
})