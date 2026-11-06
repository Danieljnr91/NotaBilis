import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeleteNotesModal from '../components/DeleteNotesModal';
import NoteCard from '../components/NoteCard';
import SelectionBar from '../components/SelectionBar';
import { useNotes } from '../context/NotesContext';
import { useSideNav } from '../context/SideNavContext';
import { useNoteSelection } from '../hooks/useNoteSelection';

const MainPage = () => {
    const router = useRouter();
    const { notes, categories, addCategory, deleteCategory, toggleFavourite } = useNotes();
    const { openSideNav } = useSideNav();
    const {
        selectedIds,
        isSelectionMode,
        deleteModalVisible,
        toggleSelection,
        clearSelection,
        askToDelete,
        cancelDelete,
        confirmDelete,
    } = useNoteSelection();

    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    const filteredNotes = useMemo(() => {
        const query = search.trim().toLowerCase();

        return notes.filter((note) => {
            const matchesCategory = activeCategory === null || note.category === activeCategory;
            const matchesSearch = query === ''
                || note.title.toLowerCase().includes(query)
                || note.body.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [notes, search, activeCategory]);

    const createCategory = () => {
        if (addCategory(categoryName)) {
            setCategoryName('');
            setModalVisible(false);
        }
    };

    const closeCategoryModal = () => {
        setCategoryName('');
        setModalVisible(false);
    };

    const toggleCategory = (name) => {
        setActiveCategory((currentCategory) =>
            currentCategory === name ? null : name
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style='dark' />
            <View style={{ flex: 1 }}>

                {/* TOP BAR MENU */}
                <View style={styles.topMenu}>
                    <Pressable
                        onPress={openSideNav}
                        style={({ pressed }) => [styles.menu, pressed && { transform: [{ scale: 0.95 }] }]}
                        accessibilityLabel="Open settings menu"
                    >
                        <Ionicons name="menu" size={30} color="black" />
                    </Pressable>

                    <View style={{ flex: 1, justifyContent: 'center', marginBottom: 4 }}>
                        <Text style={{ fontSize: 25, fontWeight: 600 }}>
                            NotaBilis
                        </Text>
                    </View>
                </View>

                {/* SEARCH BAR */}
                <View style={styles.searchBarContainer}>
                    <Ionicons name="search" size={24} />
                    <TextInput
                        style={{ flex: 1, height: "100%", fontSize: 16 }}
                        value={search}
                        onChangeText={setSearch}
                        placeholder='Search notes'
                        placeholderTextColor="#9ca3af"
                        returnKeyType='search'
                    />
                </View>

                {/* CATEGORIES */}
                <Text style={{ marginLeft: 27, fontSize: 18, fontWeight: '500', marginBottom: 17 }}>Categories</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesScroll}
                    contentContainerStyle={{ flexDirection: 'row', gap: 25, paddingHorizontal: 25 }}
                >
                    {categories.map((category) => {
                        const isActive = activeCategory === category.name;

                        return (
                            <View key={category.name} style={{ alignItems: 'center', gap: 5 }}>
                                <Pressable
                                    onPress={() => toggleCategory(category.name)}
                                    style={({ pressed }) => [
                                        styles.catgoryStyle,
                                        { backgroundColor: category.background },
                                        isActive && styles.categoryActive,
                                        pressed && { transform: [{ scale: 0.95 }] }
                                    ]}
                                >
                                    <Ionicons
                                        name={category.icon}
                                        size={24}
                                        color={category.color}
                                    />
                                </Pressable>

                                <Text style={isActive ? { fontWeight: '700' } : undefined}>{category.name}</Text>

                                {category.isCustom && (
                                    <Pressable onPress={() => deleteCategory(category.name)}>
                                        <Ionicons name="trash-outline" size={16} color="red" />
                                    </Pressable>
                                )}
                            </View>
                        );
                    })}

                    <View style={{ alignItems: 'center', gap: 5 }}>
                        <Pressable style={({ pressed }) => [styles.catgoryStyle, { backgroundColor: 'rgba(211, 211, 211, 0.58)', borderRadius: 10, width: 45 },
                            pressed && { transform: [{ scale: 0.95 }] }
                        ]} onPress={() => setModalVisible(true)}>
                            <Ionicons name="add" size={24} color="grey" />
                        </Pressable>
                    </View>
                </ScrollView>

                {/* SELECTION TOOLBAR */}
                {isSelectionMode && (
                    <SelectionBar
                        count={selectedIds.length}
                        onCancel={clearSelection}
                        onDelete={askToDelete}
                    />
                )}

                {/* NOTES LIST */}
                {notes.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text-outline" size={50} color="rgb(160, 160, 160)" />
                        <Text style={{ color: "rgb(160, 160, 160)", fontSize: 17 }}>No notes created</Text>
                        <Text style={{ color: "rgb(160, 160, 160)", fontSize: 17 }}>Press + to create a note</Text>
                    </View>
                ) : (
                    <FlatList
                        style={styles.notesListContainer}
                        data={filteredNotes}
                        keyExtractor={(note) => note.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.notesList}
                        extraData={selectedIds}
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Ionicons name="search-outline" size={50} color="rgb(160, 160, 160)" />
                                <Text style={{ color: "rgb(160, 160, 160)", fontSize: 17 }}>No notes found</Text>
                            </View>
                        }
                        renderItem={({ item }) => (
                            <NoteCard
                                note={item}
                                category={categories.find((category) => category.name === item.category)}
                                selected={selectedIds.includes(item.id)}
                                selectionMode={isSelectionMode}
                                onPress={() => {
                                    if (isSelectionMode) {
                                        toggleSelection(item.id);
                                        return;
                                    }

                                    router.push({ pathname: '/newNote', params: { id: item.id } });
                                }}
                                onLongPress={() => toggleSelection(item.id)}
                                onToggleFavourite={() => toggleFavourite(item.id)}
                            />
                        )}
                    />
                )}

                {/* NEW NOTE BUTTON */}
                <Pressable
                    onPress={() => router.push('/newNote')}
                    style={({ pressed }) => [styles.newNoteButton, pressed && { transform: [{ scale: 0.95 }] }]}
                    accessibilityLabel="Create note"
                >
                    <Ionicons name="add" size={34} color="white" />
                </Pressable>

                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={closeCategoryModal}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10 }}>Add a New Category</Text>
                            <TextInput
                                placeholder="Enter category name"
                                placeholderTextColor="#9ca3af"
                                value={categoryName}
                                onChangeText={setCategoryName}
                                style={styles.modalInput}
                                autoFocus
                                returnKeyType="done"
                                onSubmitEditing={createCategory}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                                <Pressable onPress={closeCategoryModal} style={styles.modalCancelButton}>
                                    <Text style={{ color: '#4b5563' }}>Cancel</Text>
                                </Pressable>

                                <Pressable onPress={createCategory} style={styles.modalCreateButton}>
                                    <Text style={{ color: 'white' }}>Create</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

                <DeleteNotesModal
                    visible={deleteModalVisible}
                    count={selectedIds.length}
                    onCancel={cancelDelete}
                    onConfirm={confirmDelete}
                />
            </View>
        </SafeAreaView>
    );
};

export default MainPage;

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

    searchBarContainer: {
        width: '90%',
        height: 45,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 9,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
    },

    catgoryStyle: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        borderRadius: 6,
        alignItems: 'center',
    },

    categoryActive: {
        borderWidth: 2,
        borderColor: '#111827',
    },

    categoriesScroll: {
        flexGrow: 0,
    },

    notesListContainer: {
        flex: 1,
        marginTop: 16,
    },

    notesList: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 100,
        gap: 12,
    },

    newNoteButton: {
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

    emptyState: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        marginBottom: 120,
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

    modalInput: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
        fontSize: 15,
    },

    modalCancelButton: {
        paddingVertical: 9,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#f3f4f6',
    },

    modalCreateButton: {
        paddingVertical: 9,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: 'royalblue',
    },
});
