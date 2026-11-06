import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeleteNotesModal from '../components/DeleteNotesModal';
import NoteCard from '../components/NoteCard';
import SelectionBar from '../components/SelectionBar';
import { useNotes } from '../context/NotesContext';
import { useNoteSelection } from '../hooks/useNoteSelection';

const FavouritesPage = () => {
    const router = useRouter();
    const { notes, categories, toggleFavourite } = useNotes();
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

    const favouriteNotes = useMemo(
        () => notes.filter((note) => note.favorite),
        [notes]
    );

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
                    <Text style={{ fontSize: 23, fontWeight: 600 }}>Favourites</Text>
                </View>
            </View>

            {isSelectionMode && (
                <SelectionBar
                    count={selectedIds.length}
                    onCancel={clearSelection}
                    onDelete={askToDelete}
                />
            )}

            {favouriteNotes.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="star-outline" size={50} color="rgb(160, 160, 160)" />
                    <Text style={{ color: "rgb(160, 160, 160)", fontSize: 20 }}>No Favourites Yet</Text>
                    <Text style={{ color: "rgb(160, 160, 160)", fontSize: 14 }}>
                        Tap the star on a note to save it here
                    </Text>
                </View>
            ) : (
                <FlatList
                    style={styles.listContainer}
                    data={favouriteNotes}
                    keyExtractor={(note) => note.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                    extraData={selectedIds}
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

            <DeleteNotesModal
                visible={deleteModalVisible}
                count={selectedIds.length}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
            />
        </SafeAreaView>
    );
};

export default FavouritesPage;

const styles = StyleSheet.create({
    menu: {
        borderRadius: 8,
        backgroundColor: "white",
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

    listContainer: {
        flex: 1,
        marginTop: 16,
    },

    list: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 12,
    },

    emptyState: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 6,
        marginBottom: 60,
    },

});
