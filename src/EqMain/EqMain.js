import React from 'react';
import {View, Button, Linking, ToastAndroid} from 'react-native';
import styles from './styles';
import EqModule from '../EqModule';
import EqSlider from '../EqSlider/EqSlider';
import * as NotificationService from '../NotificationService';
import {connect} from 'react-redux';
import BbSlider from '../BbSlider/BbSlider';
import * as BbEnableService from '../BbEnableService';
import {changeStatus, saveState} from '../../state/actions';

class EqMain extends React.Component {

  changeStatus() {
    const enabled = this.props.enabled;
    if (enabled) {
      NotificationService.close();
      BbEnableService.stop();
    } else {
      NotificationService.show();
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
  };
};

export default connect(mapStateToProps, {changeStatus, saveState})(EqMain);
