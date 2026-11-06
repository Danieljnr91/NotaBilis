import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    Animated,
    Modal,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    useWindowDimensions,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSideNav } from '../context/SideNavContext';

const SETTINGS_OPTIONS = [
    {
        key: 'notifications',
        label: 'Notifications',
        description: 'Alerts for reminders',
        icon: 'notifications-outline',
    },
    {
        key: 'dailyReminders',
        label: 'Daily reminders',
        description: 'A nudge to write each day',
        icon: 'alarm-outline',
    },
    {
        key: 'haptics',
        label: 'Haptic feedback',
        description: 'Vibrate on actions',
        icon: 'phone-portrait-outline',
    },
    {
        key: 'autoSave',
        label: 'Auto-save',
        description: 'Save notes while typing',
        icon: 'cloud-done-outline',
    },
    {
        key: 'wifiSync',
        label: 'Sync over Wi-Fi',
        description: 'Only sync on Wi-Fi',
        icon: 'wifi-outline',
    },
];

const SideNav = () => {
    const { isOpen, closeSideNav } = useSideNav();
    const { width } = useWindowDimensions();
    const drawerWidth = Math.min(width * 0.82, 340);
    const [settings, setSettings] = useState({
        notifications: true,
        dailyReminders: true,
        haptics: true,
        autoSave: true,
        wifiSync: false,
    });
    const [translateX] = useState(() => new Animated.Value(-drawerWidth));

    useEffect(() => {
        if (isOpen) {
            translateX.setValue(-drawerWidth);
            Animated.timing(translateX, {
                toValue: 0,
                duration: 230,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateX, {
                toValue: -drawerWidth,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [isOpen, translateX, drawerWidth]);

    const toggleSetting = (key) => {
        setSettings((currentSettings) => ({
            ...currentSettings,
            [key]: !currentSettings[key],
        }));
    };

    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="fade"
            onRequestClose={closeSideNav}
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <Pressable
                    style={styles.backdrop}
                    onPress={closeSideNav}
                    accessibilityLabel="Close settings menu"
                />

                <Animated.View
                    style={[
                        styles.drawer,
                        { width: drawerWidth, transform: [{ translateX }] },
                    ]}
                >
                    <SafeAreaView style={styles.drawerContent} edges={['top', 'bottom']}>
                        {/* HEADER */}
                        <View style={styles.header}>
                            <View style={styles.brand}>
                                <View style={styles.logo}>
                                    <Text style={styles.logoText}>N</Text>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={styles.appName}>NotaBilis</Text>
                                    <Text style={styles.tagline}>Your notes, simplified</Text>
                                </View>
                            </View>

                            <Pressable
                                onPress={closeSideNav}
                                hitSlop={8}
                                style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
                                accessibilityLabel="Close menu"
                            >
                                <Ionicons name="close" size={22} color="#111827" />
                            </Pressable>
                        </View>

                        <View style={styles.divider} />

                        {/* SETTINGS */}
                        <Text style={styles.sectionLabel}>Settings</Text>

                        <View style={styles.settingsList}>
                            {SETTINGS_OPTIONS.map((option) => (
                                <View key={option.key} style={styles.settingRow}>
                                    <View style={styles.settingIcon}>
                                        <Ionicons name={option.icon} size={20} color="#111827" />
                                    </View>

                                    <View style={styles.settingText}>
                                        <Text style={styles.settingLabel}>{option.label}</Text>
                                        <Text style={styles.settingDescription}>{option.description}</Text>
                                    </View>

                                    <Switch
                                        value={settings[option.key]}
                                        onValueChange={() => toggleSetting(option.key)}
                                        trackColor={{ false: '#e5e7eb', true: '#111827' }}
                                        thumbColor="white"
                                        ios_backgroundColor="#e5e7eb"
                                    />
                                </View>
                            ))}
                        </View>

                        <View style={{ flex: 1 }} />

                        <Text style={styles.footerText}>NotaBilis · Version 1.0.0</Text>
                    </SafeAreaView>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default SideNav;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
    },

    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

    drawer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 3, height: 0 },
    },

    drawerContent: {
        flex: 1,
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingTop: 8,
        paddingBottom: 18,
    },

    brand: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    logo: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#111827',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '700',
    },

    appName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },

    tagline: {
        fontSize: 12,
        color: '#9ca3af',
        marginTop: 2,
    },

    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 18,
    },

    sectionLabel: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#9ca3af',
        marginBottom: 12,
        marginLeft: 4,
    },

    settingsList: {
        gap: 6,
    },

    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
    },

    settingIcon: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    settingText: {
        flex: 1,
    },

    settingLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },

    settingDescription: {
        fontSize: 12,
        color: '#9ca3af',
        marginTop: 1,
    },

    footerText: {
        fontSize: 11,
        color: '#9ca3af',
        textAlign: 'center',
        paddingVertical: 10,
    },

    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.95 }],
    },
});
