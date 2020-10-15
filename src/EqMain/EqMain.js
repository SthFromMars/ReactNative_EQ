import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './styles';
import EqModule from '../EqModule';
// import ToastExample from '../ToastExample';

const EqMain = () => {
    // const [sliderValue, setSliderValue] = useState(0);
    // EqModule.show('This is Eq talking2', EqModule.SHORT);
    // ToastExample.show('Awesome', ToastExample.SHORT);
    // const onSliderChange = (value) => {
    //     setSliderValue(Math.round(value));
    //     EqModule.setBassBoostLevel(sliderValue);
    //     EqModule.getEqSettings((settings) => {
    //         console.log(settings);
    //     });
    // };
    const setHighBass = () => {
        EqModule.setHighBass();
        EqModule.getEqSettings((settings) => {
            console.log(settings);
        });
    };
    const setLowBass = () => {
        EqModule.setLowBass();
        EqModule.getEqSettings((settings) => {
            console.log(settings);
        });
    };
    return (
        <View style={styles.view}>
            <Button onPress={setHighBass} title="setHighBass" />
            <Button onPress={setLowBass} title="setLowBass" />
            {/*<Text>{sliderValue}</Text>*/}
            {/*<Slider*/}
            {/*    value={sliderValue}*/}
            {/*    style={styles.slider}*/}
            {/*    minimumValue={0}*/}
            {/*    maximumValue={1000}*/}
            {/*    minimumTrackTintColor="#000000"*/}
            {/*    maximumTrackTintColor="#888888"*/}
            {/*    onValueChange={onSliderChange}*/}
            {/*/>*/}
        </View>
    );
};

export default EqMain;
