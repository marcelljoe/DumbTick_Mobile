import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
} from 'native-base';
import {StatusBar} from 'react-native';


export default class AllHeader extends Component {
  render() {
    return (
        <Header style={{backgroundColor: 'orange'}}>
          <StatusBar backgroundColor="orange" />
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>DUMB-TICK MOBILE</Title>
          </Body>
          <Right></Right>
        </Header>
      );
  }
}