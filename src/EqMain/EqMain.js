import React from 'react';
import {View, Button, Text} from 'react-native';
import styles from './styles';
import EqModule from '../EqModule';
import EqSlider from '../EqSlider/EqSlider';
// import * as NotificationService from '../NotificationService';
import {connect} from 'react-redux';
import BbSlider from '../BbSlider/BbSlider';
import * as BbEnableService from '../BbEnableService';
import {changePreset, changeStatus, saveState} from '../../state/actions';

class EqMain extends React.Component {
  changeStatus() {
    const enabled = this.props.enabled;
    if (enabled) {
      // NotificationService.close();
      BbEnableService.stop();
    } else {
      // NotificationService.show();
      BbEnableService.start();
    }
    EqModule.setStatus(!enabled, () => {});
    this.props.changeStatus(!enabled);
  }

  render() {
    return (
      <View style={styles.view}>
        <BbSlider />
        <Button
          title={this.props.enabled ? 'disable' : 'enable'}
          onPress={() => this.changeStatus()}
        />
        <Button title="save" onPress={this.props.saveState} />
        <Text>{this.props.activeName}</Text>
        <View style={styles.presets}>
          <Button
            title={this.props.presets[0].name}
            onPress={() => {
              this.props.changePreset(0);
            }}
          />
          <Button
            title={this.props.presets[1].name}
            onPress={() => {
              this.props.changePreset(1);
            }}
          />
          <Button
            title={this.props.presets[2].name}
            onPress={() => {
              this.props.changePreset(2);
            }}
          />
        </View>
        <View style={styles.eqView}>
          {[0, 1, 2, 3, 4].map((value) => {
            return <EqSlider key={value} index={value} />;
          })}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    enabled: state.enabled,
    bbValue: state.presets[state.activePreset].bb,
    presets: state.presets,
    activeName: state.presets[state.activePreset].name
  };
};

export default connect(mapStateToProps, {
  changeStatus,
  saveState,
  changePreset,
})(EqMain);
