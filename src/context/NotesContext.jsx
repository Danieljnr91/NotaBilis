import Storage from 'expo-sqlite/kv-store';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const NotesContext = createContext(null);

const STORAGE_KEYS = {
    notes: 'notabilis:notes',
    categories: 'notabilis:categories',
};

const DEFAULT_CATEGORIES = [
    { name: 'Personal', icon: 'person', color: 'purple', background: 'rgba(192, 134, 192, 0.39)', isCustom: false },
    { name: 'Work', icon: 'briefcase', color: 'green', background: 'rgba(91, 219, 91, 0.39)', isCustom: false },
    { name: 'Travel', icon: 'car', color: 'rgb(213, 213, 3)', background: 'rgba(219, 219, 61, 0.39)', isCustom: false },
    { name: 'Health', icon: 'heart', color: 'rgb(218, 101, 101)', background: 'rgba(233, 136, 136, 0.39)', isCustom: false },
];

const createId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const readStoredValue = (key, fallback) => {
    try {
        const storedValue = Storage.getItemSync(key);

        if (storedValue === null) {
            return fallback;
        }

        return JSON.parse(storedValue);
    } catch (error) {
        console.warn(`Failed to load "${key}" from storage`, error);
        return fallback;
    }
};

const saveStoredValue = (key, value) => {
    Storage.setItem(key, JSON.stringify(value)).catch((error) => {
        console.warn(`Failed to save "${key}" to storage`, error);
    });
};

const loadNotes = () => {
    const storedNotes = readStoredValue(STORAGE_KEYS.notes, []);
    return Array.isArray(storedNotes) ? storedNotes : [];
};

const loadCategories = () => {
    const storedCategories = readStoredValue(STORAGE_KEYS.categories, DEFAULT_CATEGORIES);
    return Array.isArray(storedCategories) && storedCategories.length > 0
        ? storedCategories
        : DEFAULT_CATEGORIES;
};

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState(loadNotes);
    const [categories, setCategories] = useState(loadCategories);

    useEffect(() => {
        saveStoredValue(STORAGE_KEYS.notes, notes);
    }, [notes]);

    useEffect(() => {
        saveStoredValue(STORAGE_KEYS.categories, categories);
    }, [categories]);

    const addNote = useCallback(({ title, body, category }) => {
        const now = Date.now();
        const note = {
            id: createId(),
            title: title.trim(),
            body: body.trim(),
            category,
            favorite: false,
            createdAt: now,
            updatedAt: now,
        };

        setNotes((currentNotes) => [note, ...currentNotes]);
        return note;
    }, []);

    const updateNote = useCallback((id, { title, body, category }) => {
        setNotes((currentNotes) =>
            currentNotes.map((note) =>
                note.id === id
                    ? {
                        ...note,
                        title: title.trim(),
                        body: body.trim(),
                        category,
                        updatedAt: Date.now(),
                    }
                    : note
            )
        );
    }, []);

    const addCategory = useCallback((name) => {
        const trimmedName = name.trim();

        if (trimmedName === '') {
            return false;
        }

        const alreadyExists = categories.some(
            (category) => category.name.toLowerCase() === trimmedName.toLowerCase()
        );

        if (alreadyExists) {
            return false;
        }

        setCategories((currentCategories) => [
            ...currentCategories,
            {
                name: trimmedName,
                icon: 'create-outline',
                color: 'grey',
                background: 'rgba(211, 211, 211, 0.58)',
                isCustom: true,
            },
        ]);

        return true;
    }, [categories]);

    const deleteCategory = useCallback((name) => {
        setCategories((currentCategories) =>
            currentCategories.filter((category) => category.name !== name)
        );
    }, []);

    const toggleFavourite = useCallback((id) => {
        setNotes((currentNotes) =>
            currentNotes.map((note) =>
                note.id === id
                    ? { ...note, favorite: !note.favorite }
                    : note
            )
        );
    }, []);

    const deleteNotes = useCallback((ids) => {
        setNotes((currentNotes) =>
            currentNotes.filter((note) => !ids.includes(note.id))
        );
    }, []);

    const value = useMemo(() => ({
        notes,
        categories,
        addNote,
        updateNote,
        addCategory,
        deleteCategory,
        toggleFavourite,
        deleteNotes,
    }), [notes, categories, addNote, updateNote, addCategory, deleteCategory, toggleFavourite, deleteNotes]);

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NotesContext);

    if (context === null) {
        throw new Error('useNotes must be used inside a NotesProvider');
    }

    return context;
};
