import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

const DeleteNotesModal = ({ visible, count, onCancel, onConfirm }) => {
    const title = count === 1 ? 'Delete note?' : `Delete ${count} notes?`;
    const message = count === 1
        ? 'This note will be permanently deleted.'
        : 'These notes will be permanently deleted.';

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.backdrop}>
                <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.actions}>
                        <Pressable
                            onPress={onCancel}
                            style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            onPress={onConfirm}
                            style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeleteNotesModal;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        width: '85%',
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 15,
        elevation: 5,
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },

    message: {
        fontSize: 14,
        lineHeight: 20,
        color: '#6b7280',
        marginBottom: 20,
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },

    cancelButton: {
        paddingVertical: 9,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#f3f4f6',
    },

    cancelText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4b5563',
    },

    deleteButton: {
        paddingVertical: 9,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#dc2626',
    },

    deleteText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },

    pressed: {
        opacity: 0.75,
    },
});
