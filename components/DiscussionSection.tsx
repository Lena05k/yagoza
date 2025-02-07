import React from 'react';
import { View, FlatList,Text } from 'react-native';
import TextSection from './TextSection';

export type Discussion = {
    id: string;
    text: string;
};

type DiscussionSectionProps = {
    discussions: Discussion[];
    onAddDiscussion: (text: string) => void;
};

const DiscussionSection: React.FC<DiscussionSectionProps> = ({ discussions, onAddDiscussion }) => {

    return (
        <View>
            <TextSection
                title="Обсуждения"
                text=""
                onAddText={onAddDiscussion}
                placeholder="Введите обсуждение"
            />
            <FlatList
                data={discussions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.noteBox}>
                        <Text>{item.text}</Text>
                    </View>
                )}
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

export default DiscussionSection;