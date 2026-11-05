import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const BottomNavigation = () => {
    const [activeTab, setActiveTab] = useState('Notes');
    return(
        <View style={styles.bottomNav}>
            <Link href="/allNotes" asChild>
                <Pressable onPress={() => setActiveTab('Notes')} style={styles.navItem}>
                    <Ionicons name={activeTab === 'Notes' ? 'document-text' : 'document-text-outline'} size={24} color="black"/>
                    <Text>Notes</Text>
                </Pressable>
            </Link>
           
            
            <Link href="/favourites" asChild>
                <Pressable onPress={() => setActiveTab('Favourites')} style={styles.navItem}>
                    <Ionicons name={activeTab === 'Favourites' ? 'star' : 'star-outline'} size={24} color="black"/>
                    <Text>Favourites</Text>
                </Pressable>
            </Link>

            
            <Link href="/todoPage" asChild>
                <Pressable onPress={() => setActiveTab('To-do')} style={styles.navItem}>
                    <Ionicons name={activeTab === 'To-do' ? 'checkbox' : 'checkbox-outline'} size={24} color="black"/>
                    <Text>To-do</Text>
                </Pressable>
            </Link>
            
            <Link href="/settings" asChild>
                <Pressable onPress={() => setActiveTab('settings')} style={styles.navItem}>
                    <Ionicons name={activeTab === 'settings' ? 'settings' : 'settings-outline'} size={24} color="black"/>
                    <Text>Settings</Text>
                </Pressable>
            </Link>   
         </View>

    ) 

}

export default BottomNavigation

const styles = StyleSheet.create({
    bottomNav:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingVertical:12,
        backgroundColor:"white",
    },

    navItem:{
        alignItems:'center',
        gap:4
    }

})