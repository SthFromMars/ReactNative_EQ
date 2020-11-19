import React from 'react';
import {View, Text, Button, Linking, ToastAndroid} from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './styles';
import EqModule from '../EqModule';
import EqSlider from '../EqSlider/EqSlider';

class EqMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eqValues: [0, 0, 0, 0, 0],
            bb: {
                strength: 0,
                isSupported: false,
            },
        };
        this.bbOnChange = this.bbOnChange.bind(this);
        this.refreshBb = this.refreshBb.bind(this);
    }

    componentDidMount() {
        EqModule.getEqSettings((eqSettings) => {
            EqModule.getBbSettings((bbSettings) => {
                this.setState({
                    eqValues: eqSettings,
                    bb: bbSettings,
                });
            });
        });
    }

    bbOnChange(value) {
        EqModule.setBb(value);
        const bb = this.state.bb;
        bb.strength = value;
        this.setState({bb});
    }

    refreshBb() {
        EqModule.refreshBb((settings) => {
            this.setState({bb: settings});
        });
    }

    eqOnChange(value, index) {
        const {eqValues} = this.state;
        eqValues[index] = value;
        EqModule.setBand(value, index);
        this.setState({eqValues});
    }

    async openSpotify() {
        const supported = await Linking.canOpenURL('spotify://');
        if (supported) {
            await Linking.openURL('spotify://');
        } else {
            ToastAndroid.show('Could not open Spotify', ToastAndroid.LONG);
        }
    }

    render() {
        console.log(JSON.stringify(this.state));
        return (
            <View style={styles.view}>
                {this.state.bb.isSupported && (
                    <View>
                        <Slider
                            value={this.state.bb.strength}
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={1000}
                            step={1}
                            minimumTrackTintColor="#444444"
                            maximumTrackTintColor="#000000"
                            onValueChange={this.bbOnChange}
                        />
                        <Text>Bass boost: {this.state.bb.strength}</Text>
                    </View>
                )}
                <Button title="refresh" onPress={this.refreshBb} />
                <Button title="open" onPress={this.openSpotify} />
                <View style={styles.eqView}>
                    {this.state.eqValues.map((value, index) => {
                        return (
                            <EqSlider
                                key={index}
                                value={value}
                                onChange={(changedValue) => {
                                    this.eqOnChange(changedValue, index);
                                }}
                            />
                        );
                    })}
                </View>
            </View>
        );
    }
}

export default EqMain;
