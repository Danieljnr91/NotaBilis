import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const NoteCard = ({
    note,
    category,
    selected = false,
    selectionMode = false,
    onPress,
    onLongPress,
    onToggleFavourite,
}) => {
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            delayLongPress={350}
            style={({ pressed }) => [
                styles.card,
                selected && styles.cardSelected,
                pressed && { opacity: 0.85 },
            ]}
            accessibilityState={{ selected }}
        >
            {/* TITLE + CATEGORY */}
            <View style={styles.header}>
                <Text style={styles.title} numberOfLines={1}>
                    {note.title || 'Untitled note'}
                </Text>

                <View style={[styles.category, { backgroundColor: category?.background ?? 'rgba(211, 211, 211, 0.5)' }]}>
                    <Text
                        style={[styles.categoryText, { color: category?.color ?? 'grey' }]}
                        numberOfLines={1}
                    >
                        {note.category || 'Uncategorized'}
                    </Text>
                </View>
            </View>

            {/* PREVIEW */}
            {note.body !== '' && (
                <Text style={styles.preview} numberOfLines={2}>
                    {note.body}
                </Text>
            )}

            {/* FOOTER */}
            <View style={styles.footer}>
                <Text style={styles.date}>{formatNoteDate(note.updatedAt)}</Text>

                {selectionMode && (
                    <View style={[styles.checkBadge, selected && styles.checkBadgeSelected]}>
                        {selected && <Ionicons name="checkmark" size={13} color="white" />}
                    </View>
                )}

                <Pressable
                    onPress={onToggleFavourite}
                    hitSlop={10}
                    disabled={selectionMode}
                    style={({ pressed }) => [
                        styles.starButton,
                        selectionMode && styles.starButtonDisabled,
                        pressed && { transform: [{ scale: 0.9 }] },
                    ]}
                    accessibilityLabel={note.favorite ? 'Remove from favourites' : 'Add to favourites'}
                >
                    <Ionicons
                        name={note.favorite ? 'star' : 'star-outline'}
                        size={20}
                        color={note.favorite ? '#f5a623' : '#9ca3af'}
                    />
                </Pressable>
            </View>
        </Pressable>
    );
};

const formatNoteDate = (timestamp) => {
    if (!timestamp) {
        return '';
    }

    return new Date(timestamp).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

export default NoteCard;

const styles = StyleSheet.create({
    card: {
        padding: 14,
        borderRadius: 14,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ececec',
        gap: 6,
        elevation: 1,
    },

    cardSelected: {
        borderColor: '#111827',
        borderWidth: 1.5,
        backgroundColor: '#f9fafb',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },

    title: {
        flex: 1,
        fontSize: 17,
        fontWeight: '600',
        color: '#111827',
    },

    category: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 999,
        maxWidth: '45%',
        flexShrink: 1,
    },

    categoryText: {
        fontSize: 11,
        fontWeight: '600',
    },

    preview: {
        fontSize: 14,
        lineHeight: 20,
        color: '#6b7280',
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    date: {
        flex: 1,
        fontSize: 11,
        color: '#9ca3af',
        marginTop: 2,
    },

    checkBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#d1d5db',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkBadgeSelected: {
        backgroundColor: '#111827',
        borderColor: '#111827',
    },

    starButton: {
        padding: 2,
    },

    starButtonDisabled: {
        opacity: 0.4,
    },
});
