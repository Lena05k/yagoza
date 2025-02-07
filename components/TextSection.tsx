import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard  } from 'react-native';

type TextSectionProps = {
    title: string;
    text: string;
    onAddText: (text: string) => void;
    placeholder: string;
};

const TextSection: React.FC<TextSectionProps> = ({ title, text, onAddText, placeholder }) => {
    const [inputText, setInputText] = useState('');
    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef(null);

    const handleAddText = () => {
        if (inputText.trim()) {
            onAddText(inputText);
            setShowInput(false);
            setInputText('');
            Keyboard.dismiss();
        }
    };

    return (
        <View style={showInput ? styles.section : styles.sectionRow}>
            <Text style={styles.title}>{title}</Text>
            {text ? (
                <View style={styles.textBox}>
                    <Text>{text}</Text>
                </View>
            ) : showInput ? (
                <View>
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        placeholder={placeholder}
                        value={inputText}
                        onChangeText={setInputText}
                        onBlur={() => setShowInput(false)}
                        autoFocus
                        multiline
                        onSubmitEditing={({ nativeEvent: { text } }) => {
                            if (text.trim()) {
                                handleAddText();
                            }
                        }}
                    />
                    <TouchableOpacity style={styles.createButton} onPress={handleAddText}>
                        <Text style={styles.buttonText}>Создать</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity onPress={() => setShowInput(true)}>
                    <Text style={styles.addButton}>+</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        flexDirection: 'column',
        marginTop: 24,
        justifyContent: 'space-between',
    },
    sectionRow: {
        flexDirection: 'row',
        marginTop: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 10,
    },
    textBox: {
        padding: 10,
        backgroundColor: "#EFEFF0",
        borderRadius: 12,
        fontSize: 12,
        color: '#919191'
    },
    input: {
        height: 112,
        backgroundColor: '#EFEFF0',
        borderRadius: 8,
        marginBottom: 20,
        textAlign: 'left',
        verticalAlign: 'top',
        padding: 13,
    },
    createButton: {
        marginBottom: 20,
        backgroundColor: '#3E7DFE',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 700,
    },
    addButton: {
        fontSize: 24,
        color: '#007AFF',
        textAlign: 'center',
    },
});

export default TextSection;