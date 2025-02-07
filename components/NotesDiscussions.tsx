import React from 'react';
import {FlatList, Text, View} from 'react-native';
import TextSection from './TextSection';

export type Note = {
    id: string;
    newNote: string;
};

type NoteSectionProps = {
    note: Note[];
    onAddNote: (note: string) => void;
};

const NoteSection: React.FC<NoteSectionProps> = ({ note, onAddNote }) => {

    return (
        <View>
            <TextSection
                title="Примечание"
                text=""
                onAddText={onAddNote}
                placeholder="Напишите что-то для себя или других"
            />

            <FlatList
                data={note}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {

                    return (
                        <View style={styles.noteBox}>
                            <Text>{item.newNote}</Text>
                        </View>
                    )
                }}
            />
        </View>
    );
};

const styles = {
    noteBox: {
        padding: 12,
        backgroundColor: "#EFEFF0",
        borderRadius: 12,
        marginBottom: 10,
    },
};

export default NoteSection;