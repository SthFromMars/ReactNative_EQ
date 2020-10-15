import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './styles';

const EqMain = () => {
    const [sliderValue, setSliderValue] = useState(0);
    const onSliderChange = (value) => {
        console.log(value);
        setSliderValue(value);
    };
    return (
        <View style={styles.view}>
            <Text>{sliderValue}</Text>
            <Slider
                value={sliderValue}
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#888888"
                onValueChange={onSliderChange}
            />
        </View>
    );
};

export default EqMain;
