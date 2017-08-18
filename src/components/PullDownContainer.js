import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { refreshData } from '../actions';
import { Content } from 'native-base';

class PullDownContainer extends Component {

  /**
    Component params:
    REQUIRED:
    requestUrl: ""
    propToUpdate: ""

    OPTIONAL:
    onRefresh: () => {} // Use this prop override requestUrl and propToUpdate
  */

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false
    };
  }

  async onRefresh() {
    this.setState({refreshing: true});

    if (this.props.onRefresh !== undefined) {
      await this.props.onRefresh();
    } else {
      await this.props.refreshData(this.props.token, this.props.requestUrl, this.props.propToUpdate, this.props.staticData);
    }

    this.setState({refreshing: false});
  }

  render() {
    return (
      <Content refreshControl={
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={() => this.onRefresh()}/>}>
        {this.props.children}
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.db.token,
    staticData: state.db.staticData,
  };
};

export default connect(mapStateToProps, { refreshData })(PullDownContainer);
