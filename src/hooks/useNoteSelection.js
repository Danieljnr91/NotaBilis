import { useCallback, useState } from 'react';
import { useNotes } from '../context/NotesContext';

export const useNoteSelection = () => {
    const { deleteNotes } = useNotes();
    const [selectedIds, setSelectedIds] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const isSelectionMode = selectedIds.length > 0;

    const toggleSelection = useCallback((id) => {
        setSelectedIds((currentIds) =>
            currentIds.includes(id)
                ? currentIds.filter((selectedId) => selectedId !== id)
                : [...currentIds, id]
        );
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedIds([]);
    }, []);

    const askToDelete = useCallback(() => {
        setDeleteModalVisible(true);
    }, []);

    const cancelDelete = useCallback(() => {
        setDeleteModalVisible(false);
    }, []);

    const confirmDelete = useCallback(() => {
        deleteNotes(selectedIds);
        setSelectedIds([]);
        setDeleteModalVisible(false);
    }, [deleteNotes, selectedIds]);

    return {
        selectedIds,
        isSelectionMode,
        deleteModalVisible,
        toggleSelection,
        clearSelection,
        askToDelete,
        cancelDelete,
        confirmDelete,
    };
};
