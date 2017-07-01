import React, { PureComponent } from 'react';
import { AppRegistry, Image, Text, View } from 'react-native';
import Card from './src/components/Card';
import CardSection from './src/components/CardSection';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => <View style={[ styles.container, { backgroundColor: '#ff4081' } ]} />;
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]} />;

export default class PVApp extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'First' },
      { key: '2', title: 'Second' },
    ],
  };

  _handleChangeTab = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    '1': FirstRoute,
    '2': SecondRoute,
  });

  render() {
    return (
      <Card>
        <CardSection>
          <Image
            style={styles.imageStyle}
            source={{ uri: 'https://www.municipay.com/wp-content/themes/Artificial-Reason-WP/img/no_image.png' }}
          />
        </CardSection>

        <CardSection>
          <Text>
            Titulo
          </Text>
        </CardSection>

        {/* <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
        /> */}

      </Card>
    );
  }
}

const styles = {
  imageStyle: {
  height: 100,
  width: 100,
}
  // container: {
  //   flex: 1
  // }
};

AppRegistry.registerComponent('PVApp', () => PVApp);
