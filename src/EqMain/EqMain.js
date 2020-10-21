import React from 'react';
import {Text, View, Button} from 'react-native';
// import Slider from '@react-native-community/slider';
import styles from './styles';
import EqModule from '../EqModule';

class EqMain extends React.Component {
    render() {
        const setHighBass = () => {
            EqModule.setHighBass();
            EqModule.getEqSettings((log) => {
                console.log(log);
            });
        };
        const setLowBass = () => {
            EqModule.setLowBass();
            EqModule.getEqSettings((log) => {
                console.log(log);
            });
        };
        return (
            <View style={styles.view}>
                <Button onPress={setHighBass} title="set High Bass" />
                <Button onPress={setLowBass} title="set Low Bass" />
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
    }
}

export default EqMain;
