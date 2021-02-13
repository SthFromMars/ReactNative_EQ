import React from 'react';
import VerticalSlider from 'rn-vertical-slider';
import {Text, View} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {changeEqValue} from '../../state/actions';

class EqSlider extends React.Component {
  render() {
    const propsValue = this.props.eqValues[this.props.index];
    const renderValue = propsValue === 0 ? 0.1 : propsValue;
    return (
      <View style={styles.view}>
        <VerticalSlider
          value={renderValue}
          disabled={false}
          min={-15}
          max={15}
          onChange={(value) => {
            if (value !== propsValue) {
              this.props.changeEqValue(Math.round(value), this.props.index);
              this.forceUpdate();
            }
          }}
          width={50}
          height={300}
          step={1}
        />
        <Text>{propsValue}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    enabled: state.enabled,
    eqValues: state.presets[state.activePreset].eq,
  };
};

export default connect(mapStateToProps, {changeEqValue})(EqSlider);
