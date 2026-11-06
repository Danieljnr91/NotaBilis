import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const TodoCard = ({ todo, onToggle, onDelete }) => {
    return (
        <View style={[styles.card, todo.completed && styles.cardCompleted]}>
            <Pressable
                onPress={onToggle}
                hitSlop={8}
                style={({ pressed }) => [
                    styles.checkbox,
                    todo.completed && styles.checkboxChecked,
                    pressed && { transform: [{ scale: 0.9 }] },
                ]}
                accessibilityLabel={todo.completed ? 'Mark as not done' : 'Mark as done'}
            >
                {todo.completed && <Ionicons name="checkmark" size={16} color="white" />}
            </Pressable>

            <Text style={[styles.text, todo.completed && styles.textCompleted]}>
                {todo.text}
            </Text>

            <Pressable
                onPress={onDelete}
                hitSlop={8}
                style={({ pressed }) => [styles.deleteButton, pressed && { opacity: 0.6 }]}
                accessibilityLabel="Delete to-do"
            >
                <Ionicons name="trash-outline" size={18} color="#9ca3af" />
            </Pressable>
        </View>
    );
};

export default TodoCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderRadius: 14,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ececec',
        elevation: 1,
    },

    cardCompleted: {
        backgroundColor: '#f9fafb',
    },

    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#d1d5db',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkboxChecked: {
        backgroundColor: '#111827',
        borderColor: '#111827',
    },

    text: {
        flex: 1,
        fontSize: 15,
        lineHeight: 21,
        color: '#111827',
    },

    textCompleted: {
        color: '#9ca3af',
        textDecorationLine: 'line-through',
    },

    deleteButton: {
        padding: 2,
    },
});
