import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotes } from '../context/NotesContext';

const NoteEditor = () => {
    const { id } = useLocalSearchParams();
    const { notes, categories, addNote, updateNote } = useNotes();

    const editingNote = notes.find((note) => note.id === id);

    const goBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/allNotes');
        }
    };

    const [title, setTitle] = useState(editingNote ? editingNote.title : '');
    const [body, setBody] = useState(editingNote ? editingNote.body : '');
    const [category, setCategory] = useState(
        editingNote ? editingNote.category : categories[0]?.name ?? ''
    );

    const saveNote = () => {
        const cleanTitle = title.trim();
        const cleanBody = body.trim();

        // Nothing written yet - just close without saving an empty note.
        if (cleanTitle === '' && cleanBody === '') {
            goBack();
            return;
        }

        if (editingNote) {
            updateNote(editingNote.id, { title, body, category });
        } else {
            addNote({ title, body, category });
        }

        goBack();
    };

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar style='dark' />

            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior="padding"
                keyboardVerticalOffset={0}
            >
                {/* TOP BAR */}
                <View style={styles.topBar}>
                    <Pressable
                        onPress={goBack}
                        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
                        accessibilityLabel="Go back"
                    >
                        <Ionicons name="chevron-back" size={26} color="#111827" />
                    </Pressable>

                    <Text style={styles.topTitle}>
                        {editingNote ? 'Edit Note' : 'New Note'}
                    </Text>

                    {/* SAVE CHECK MARK */}
                    <Pressable
                        onPress={saveNote}
                        style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}
                        accessibilityLabel="Save note"
                    >
                        <Ionicons name="checkmark" size={26} color="white" />
                    </Pressable>
                </View>

                {/* TITLE */}
                <View style={styles.titleSection}>
                    <TextInput
                        style={styles.titleInput}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Note title"
                        placeholderTextColor="#9ca3af"
                        maxLength={80}
                        returnKeyType="next"
                        autoFocus={!editingNote}
                    />
                    <View style={styles.divider} />
                </View>

                {/* CATEGORY */}
                <Text style={styles.sectionLabel}>Category</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}
                    contentContainerStyle={styles.categoryList}
                    keyboardShouldPersistTaps="handled"
                >
                    {categories.map((item) => {
                        const isSelected = item.name === category;

                        return (
                            <Pressable
                                key={item.name}
                                onPress={() => setCategory(item.name)}
                                style={({ pressed }) => [
                                    styles.categoryChip,
                                    { backgroundColor: isSelected ? item.background : '#f3f4f6' },
                                    isSelected && styles.categoryChipSelected,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <View style={[styles.categoryDot, { backgroundColor: item.color }]} />
                                <Text
                                    style={[
                                        styles.categoryChipText,
                                        isSelected && { color: item.color, fontWeight: '600' },
                                    ]}
                                >
                                    {item.name}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>

                {/* BODY */}
                <View style={styles.bodySection}>
                    <TextInput
                        style={styles.bodyInput}
                        value={body}
                        onChangeText={setBody}
                        placeholder="Write your note here..."
                        placeholderTextColor="#9ca3af"
                        multiline
                        textAlignVertical="top"
                        scrollEnabled
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default NoteEditor;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },

    keyboardView: {
        flex: 1,
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 10,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
    },

    topTitle: {
        flex: 1,
        fontSize: 17,
        fontWeight: '600',
        color: '#111827',
    },

    saveButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111827',
    },

    pressed: {
        opacity: 0.75,
        transform: [{ scale: 0.95 }],
    },

    titleSection: {
        paddingHorizontal: 20,
        paddingTop: 12,
    },

    titleInput: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        paddingVertical: 6,
    },

    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginTop: 8,
    },

    sectionLabel: {
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 20,
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        color: '#6b7280',
    },

    categoryScroll: {
        // A horizontal ScrollView grows to fill a column by default, which
        // starves the note box of space when the keyboard is open.
        flexGrow: 0,
    },

    categoryList: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 20,
    },

    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 1.5,
        borderColor: 'transparent',
    },

    categoryChipSelected: {
        borderColor: '#111827',
    },

    categoryDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },

    categoryChipText: {
        fontSize: 14,
        color: '#4b5563',
    },

    bodySection: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 18,
        marginBottom: 16,
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#f9fafb',
    },

    bodyInput: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
        color: '#111827',
        padding: 0,
    },
});
