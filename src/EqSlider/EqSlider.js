import React from 'react';
import VerticalSlider from 'rn-vertical-slider'
import {Text, View, Button} from 'react-native';
import styles from './styles';

class EqSlider extends React.Component {
    render(){
        const propsValue = this.props.value;
        const renderValue = propsValue == 0 ? 0.1 : propsValue;
        return (
            <View style={styles.view} >
                <VerticalSlider
                    value={renderValue}
                    disabled={false}
                    min={-15}
                    max={15}
                    onChange={(value) => {this.props.onChange(Math.round(value))}}
                    width={50}
                    height={300}
                    step={1}
                />
                <Text>{propsValue}</Text>
            </View>
        )
    }
}

export default EqSlider 