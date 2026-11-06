import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
    const router = useRouter();

    const goBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/allNotes');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style='dark' />

            <View style={styles.topMenu}>
                <Pressable
                    style={({ pressed }) => [styles.menu, pressed && { transform: [{ scale: 0.95 }] }]}
                    onPress={goBack}
                    accessibilityLabel="Go back"
                >
                    <Ionicons name="chevron-back-outline" size={30} />
                </Pressable>

                <View style={{ flex: 1, justifyContent: 'center', marginBottom: 4 }}>
                    <Text style={{ fontSize: 23, fontWeight: 600 }}>Settings</Text>
                </View>
            </View>
        </SafeAreaView>
    )

}

export default Settings

const styles = StyleSheet.create({
    menu: {
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 5,
        margin: 15,
        width: 45,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgb(165, 165, 165)'
    },

    topMenu: {
        flexDirection: 'row',
        gap: 7
    },

})
