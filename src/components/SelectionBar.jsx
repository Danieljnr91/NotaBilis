import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const SelectionBar = ({ count, onCancel, onDelete }) => {
    return (
        <View style={styles.bar}>
            <Text style={styles.count}>
                {count} {count === 1 ? 'note' : 'notes'} selected
            </Text>

            <View style={styles.actions}>
                <Pressable
                    onPress={onCancel}
                    style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>

                <Pressable
                    onPress={onDelete}
                    style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
                    accessibilityLabel="Delete selected notes"
                >
                    <Ionicons name="trash-outline" size={16} color="white" />
                    <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SelectionBar;

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
        marginHorizontal: 20,
        paddingVertical: 8,
        paddingLeft: 14,
        paddingRight: 8,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        gap: 10,
    },

    count: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    cancelButton: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 8,
    },

    cancelText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4b5563',
    },

    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#dc2626',
    },

    deleteText: {
        fontSize: 13,
        fontWeight: '600',
        color: 'white',
    },

    pressed: {
        opacity: 0.75,
        transform: [{ scale: 0.97 }],
    },
});
