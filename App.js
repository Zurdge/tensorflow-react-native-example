import React from 'react';
import {View, Text} from 'react-native';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
    };
  }

  async componentDidMount() {

    await tf.ready()
    this.setState({ isTfReady: true })

    // Get reference to bundled model assets
    const modelJson = require('./assets/helloworld/model.json');
    const modelWeights = require('./assets/helloworld/group1-shard1of1.bin');

    console.log(modelWeights)

    const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
    model.summary();

    var dataset = tf.tensor([10.0])

    const prediction = model.predict(dataset);
    console.log(prediction.dataSync())

    this.setState({
      isTfReady:true
    })

  }


  render() {
    return(
      <View>
      <Text>{this.state.isTfReady === true ? 'ready!' : 'loading'}</Text>
      </View>
    )
  }
}
