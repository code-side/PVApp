import React, { Component } from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Icon, Fab } from 'native-base';

class CustomFab extends Component {

  /**
    Component params:
    REQUIRED
    chilldren: [<Button><Icon/></Button>, ...]

    OPTIONAL
    useFontAwesome: default false
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
        style={{ backgroundColor: '#5067FF' }}
        containerStyle={{ marginBottom: 50 }}
        active={this.state.active}
        onPress={() => this.onPress()}>

        {
          (this.props.useFontAwesome === true) ? (
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
