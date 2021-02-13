import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Slider from '@react-native-community/slider';
import {connect} from 'react-redux';
import {changeBbValue} from '../../state/actions';

class BbSlider extends React.Component {
  render() {
    const bbValue = this.props.bbValue;
    return (
      <View>
        <Slider
          value={bbValue}
          disabled={!this.props.bbIsSupported || !this.props.enabled}
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000}
          step={1}
          minimumTrackTintColor="#444444"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => {
            this.props.changeBbValue(value);
          }}
        />
        <Text>Bass boost: {bbValue}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    enabled: state.enabled,
    bbValue: state.presets[state.activePreset].bb,
    bbIsSupported: state.bbIsSupported,
  };
};

export default connect(mapStateToProps, {changeBbValue})(BbSlider);
