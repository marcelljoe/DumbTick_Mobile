import React, {Component} from 'react';
import AllHeader from './AllHeader';
import {Image} from 'react-native';
import axios from 'axios';
import moment from 'moment';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Content,
  Card,
  Text,
  CardItem,
  Item,
  Input,
} from 'native-base';
import {SafeAreaView, View, FlatList, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      eventDet: []
    };
  }

  componentDidMount() {
      const {navigation} = this.props;
      const id = JSON.stringify(navigation.getParam('id', 'default'));
      axios.get(`http://192.168.1.13:7000/dumbtick/event/${id}/detail`).then(res => {
      console.log(res.data);
      this.setState({eventDet: res.data});
    });
  }

  render() {
    const {eventDet} = this.state;
    return (
      <Container>
        <AllHeader />
        <Text>Test masuk detail</Text>
      </Container>
    );
  }
}
