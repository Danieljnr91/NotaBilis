import Storage from 'expo-sqlite/kv-store';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const TodoContext = createContext(null);

const STORAGE_KEY = 'notabilis:todos';

const createId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const loadTodos = () => {
    try {
        const storedTodos = Storage.getItemSync(STORAGE_KEY);

        if (storedTodos === null) {
            return [];
        }

        const parsedTodos = JSON.parse(storedTodos);
        return Array.isArray(parsedTodos) ? parsedTodos : [];
    } catch (error) {
        console.warn(`Failed to load "${STORAGE_KEY}" from storage`, error);
        return [];
    }
};

const saveTodos = (todos) => {
    Storage.setItem(STORAGE_KEY, JSON.stringify(todos)).catch((error) => {
        console.warn(`Failed to save "${STORAGE_KEY}" to storage`, error);
    });
};

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState(loadTodos);

    useEffect(() => {
        saveTodos(todos);
    }, [todos]);

    const addTodo = useCallback((text) => {
        const trimmedText = text.trim();

        if (trimmedText === '') {
            return false;
        }

        const todo = {
            id: createId(),
            text: trimmedText,
            completed: false,
            createdAt: Date.now(),
        };

        setTodos((currentTodos) => [todo, ...currentTodos]);
        return true;
    }, []);

    const toggleTodo = useCallback((id) => {
        setTodos((currentTodos) =>
            currentTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    }, []);

    const deleteTodo = useCallback((id) => {
        setTodos((currentTodos) =>
            currentTodos.filter((todo) => todo.id !== id)
        );
    }, []);

    const value = useMemo(() => ({
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
    }), [todos, addTodo, toggleTodo, deleteTodo]);

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => {
    const context = useContext(TodoContext);

    if (context === null) {
        throw new Error('useTodos must be used inside a TodoProvider');
    }

    return context;
};
