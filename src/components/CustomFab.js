import React, { Component } from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Icon, Fab } from 'native-base';

class CustomFab extends Component {

  /**
    Component params:
    REQUIRED
    chilldren: [<Button><Icon/></Button>, ...]

    OPTIONAL
    useFontAwesome: default false
    useIonic: default false
    mainIcon: default 'md-more'
    onPress: () => {}
  */

  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  onPress() {
    this.setState({ active: !this.state.active });

    if (this.props.onPress !== undefined) {
      this.props.onPress();
    }
  }

  render() {
    return (
      <Fab
        direction="up"
        position="bottomRight"
        style={{ backgroundColor: '#2980b9' }}
        containerStyle={{ marginBottom: 50 }}
        active={this.state.active}
        onPress={() => this.onPress()}>

        {
          (this.props.useIonic === true) ? (
            <IonicIcon name={this.props.mainIcon} />
          ) : (this.props.useFontAwesome === true) ? (
            <AwesomeIcon name={this.props.mainIcon} />
          ) : (
            <Icon name={this.props.mainIcon || 'md-more'} />
          )
        }

        {this.props.children}
      </Fab>
    );
  }
}

export default CustomFab;
