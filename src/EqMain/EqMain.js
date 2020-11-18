import React from 'react';
import {Text, View, Button} from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './styles';
import EqModule from '../EqModule';
import EqSlider from '../EqSlider/EqSlider'

class EqMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eqValues: [0, 0, 0, 0, 0] 
        }
    }

    componentDidMount(){
        EqModule.getEqSettings((settings) => {
            this.setState({ eqValues: settings })
        })
    }

    eqOnChange(value, index) {
        const {eqValues} = this.state;
        eqValues[index] = value;
        EqModule.setBand(value, index);
        this.setState(eqValues);
    }

    render() {
        return (
            <View 
                style={styles.view}
            >
                {this.state.eqValues.map((value, index) => {
                    return <EqSlider 
                        key={index} 
                        value={value}
                        onChange={(value) => {this.eqOnChange(value, index)}}
                    />
                })}
            </View>
        );
    }
}

export default EqMain;
