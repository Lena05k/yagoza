import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <View>
            <Text style={styles.percentageText}>{Math.round(progress)}%</Text>

            <View style={styles.progressWrapper}>
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${progress}%` }]} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    percentageText: {
        alignSelf: 'flex-end',
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 8,
    },
    progressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressContainer: {
        flex: 1,
        height: 8,
        backgroundColor: '#D3D3D3',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#3E7DFE',
        borderRadius: 4,
    },
    percentRight: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: 'bold',
    }
});

export default ProgressBar;