import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TodoCard from '../components/TodoCard';
import { useTodos } from '../context/TodoContext';

const ToDo = () => {
    const router = useRouter();
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

    const [addModalVisible, setAddModalVisible] = useState(false);
    const [taskText, setTaskText] = useState('');

    const completedCount = todos.filter((todo) => todo.completed).length;
    const progress = todos.length === 0
        ? 0
        : Math.round((completedCount / todos.length) * 100);

    const goBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/allNotes');
        }
    };

    const closeAddModal = () => {
        setTaskText('');
        setAddModalVisible(false);
    };

    const createTodo = () => {
        if (addTodo(taskText)) {
            setTaskText('');
            setAddModalVisible(false);
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
                    <Text style={{ fontSize: 23, fontWeight: 600 }}>To-Do List</Text>
                </View>
            </View>

            {/* PROGRESS */}
            {todos.length > 0 && (
                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>
                            {completedCount} of {todos.length} completed
                        </Text>
                        <Text style={styles.progressPercent}>{progress}%</Text>
                    </View>

                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                </View>
            )}

            {/* TO-DO LIST */}
            {todos.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="checkbox-outline" size={50} color="rgb(160, 160, 160)" />
                    <Text style={{ color: "rgb(160, 160, 160)", fontSize: 17 }}>No to-dos created yet</Text>
                    <Text style={{ color: "rgb(160, 160, 160)", fontSize: 14 }}>Tap + to add your first task</Text>
                </View>
            ) : (
                <FlatList
                    style={styles.listContainer}
                    data={todos}
                    keyExtractor={(todo) => todo.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <TodoCard
                            todo={item}
                            onToggle={() => toggleTodo(item.id)}
                            onDelete={() => deleteTodo(item.id)}
                        />
                    )}
                />
            )}

            {/* ADD TO-DO BUTTON */}
            <Pressable
                onPress={() => setAddModalVisible(true)}
                style={({ pressed }) => [styles.addButton, pressed && { transform: [{ scale: 0.95 }] }]}
                accessibilityLabel="Add a to-do"
            >
                <Ionicons name="add" size={34} color="white" />
            </Pressable>

            {/* ADD TO-DO MODAL */}
            <Modal
                visible={addModalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeAddModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add a To-Do</Text>

                        <TextInput
                            placeholder="What needs to be done?"
                            placeholderTextColor="#9ca3af"
                            value={taskText}
                            onChangeText={setTaskText}
                            style={styles.modalInput}
                            autoFocus
                            returnKeyType="done"
                            onSubmitEditing={createTodo}
                        />

                        <View style={styles.modalActions}>
                            <Pressable onPress={closeAddModal} style={styles.modalCancelButton}>
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </Pressable>

                            <Pressable onPress={createTodo} style={styles.modalAddButton}>
                                <Text style={styles.modalAddText}>Add</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ToDo;

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

    progressSection: {
        paddingHorizontal: 20,
        marginBottom: 6,
    },

    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    progressLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4b5563',
    },

    progressPercent: {
        fontSize: 13,
        fontWeight: '600',
        color: '#9ca3af',
    },

    progressTrack: {
        height: 6,
        borderRadius: 3,
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        borderRadius: 3,
        backgroundColor: '#111827',
    },

    listContainer: {
        flex: 1,
        marginTop: 16,
    },

    list: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 100,
        gap: 12,
    },

    emptyState: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 6,
        marginBottom: 60,
    },

    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#111827',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
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

    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 14,
    },

    modalInput: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
        fontSize: 15,
    },

    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },

    modalCancelButton: {
        paddingVertical: 9,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#f3f4f6',
    },

    modalCancelText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4b5563',
    },

    modalAddButton: {
        paddingVertical: 9,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#111827',
    },

    modalAddText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },
});
