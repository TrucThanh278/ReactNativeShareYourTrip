import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyStyles from "../../styles/MyStyles";

const Hashtag = ({ hashtags }) => {
    const [hashtagNames, setHashtagNames] = useState({});

    useEffect(() => {
        const getHashtagNames = async () => {
            try {
                const response = await fetch(`http://172.16.12.10:8000/hashtags`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const namesMap = {};
                data.forEach(tag => {
                    namesMap[tag.id] = tag.hashtag;
                });
                setHashtagNames(namesMap);
            } catch (error) {
                console.error('Error fetching hashtag names:', error);
            }
        };

        getHashtagNames();
    }, []);

    return (
        <View style={[
            MyStyles.row,
            MyStyles.wrap,
            MyStyles.flexEnd,
            MyStyles.margin,
        ]}>
            {hashtags.map((tag, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#007bff', borderRadius: 5, padding: 8, marginRight: 5 }}>
                    <Icon name="hashtag" size={12} color="#fff" style={{ marginRight: 3 }} /> 
                    <Text style={{ color: '#fff', fontSize: 12 }}>{hashtagNames[tag]}</Text>
                </View>
            ))}
        </View>
    );
};

export default Hashtag;
