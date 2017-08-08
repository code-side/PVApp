import React, { Component } from 'react';
import { Icon, Fab } from 'native-base';

class CustomFab extends Component {

  /**
    Component params:
    REQUIRED
    chilldren: [<Button><Icon/></Button>, ...]
    mainIcon: default 'md-more'
  */

  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  render() {
    return (
      <Fab
        direction="up"
        position="bottomRight"
        style={{ backgroundColor: '#5067FF' }}
        containerStyle={{ marginBottom: 50 }}
        active={this.state.active}
        onPress={() => this.setState({ active: !this.state.active })}>
        <Icon name={this.props.mainIcon || 'md-more'} />
        {...this.children}
      </Fab>
    );
  }
}

export default CustomFab;
