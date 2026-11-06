import { Ionicons } from "@expo/vector-icons";
import { Link, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSideNav } from "../context/SideNavContext";

const BottomNavigation = () => {
    const pathname = usePathname();
    const { isOpen, openSideNav } = useSideNav();

    return (
        <View style={styles.bottomNav}>
            <Link href="/allNotes" asChild>
                <Pressable style={styles.navItem}>
                    <Ionicons name={pathname === '/allNotes' || pathname === '/' ? 'document-text' : 'document-text-outline'} size={24} color="black"/>
                    <Text>Notes</Text>
                </Pressable>
            </Link>

            <Link href="/favourites" asChild>
                <Pressable style={styles.navItem}>
                    <Ionicons name={pathname === '/favourites' ? 'star' : 'star-outline'} size={24} color="black"/>
                    <Text>Favourites</Text>
                </Pressable>
            </Link>

            <Link href="/todoPage" asChild>
                <Pressable style={styles.navItem}>
                    <Ionicons name={pathname === '/todoPage' ? 'checkbox' : 'checkbox-outline'} size={24} color="black"/>
                    <Text>To-do</Text>
                </Pressable>
            </Link>

            <Pressable onPress={openSideNav} style={styles.navItem}>
                <Ionicons name={isOpen || pathname === '/settings' ? 'settings' : 'settings-outline'} size={24} color="black"/>
                <Text>Settings</Text>
            </Pressable>
        </View>
    )

}

export default BottomNavigation

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },

    navItem: {
        alignItems: 'center',
        gap: 4
    }

})
