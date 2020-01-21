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
      categories: [],
      eventsbt: [],
      eventsuc: [],
    };
  }

  componentDidMount() {
    axios.get('http://192.168.1.13:7000/dumbtick/categories').then(res => {
      console.log(res.data);
      this.setState({categories: res.data});
    });

    axios.get('http://192.168.1.13:7000/dumbtick/eventsbytoday').then(res => {
      console.log(res.data);
      this.setState({eventsbt: res.data});
    });

    axios.get('http://192.168.1.13:7000/dumbtick/eventsupcoming').then(res => {
      console.log(res.data);
      this.setState({eventsuc: res.data});
    });
  }

  handleCategory = ({item}) => {
    console.log({id: item.id});
    return (
      <Button
        onPress={this.handlePressCategory(item.id)}
        block
        style={{
          backgroundColor: 'orange',
          marginVertical: 3,
          marginHorizontal: 1,
          width: 100,
        }}>
        <Text style={{color: 'white', fontSize: 10}}>{item.name}</Text>
      </Button>
    );
  };

  handlePressCategory = value => () => {
    console.log({id: value});
    this.props.navigation.navigate('CategoryEvents', {
      id: value,
    });
  };

  handlePressEvents = value => () => {
    console.log({id: value});
    this.props.navigation.navigate('EventDetail', {
      id: value,
    });
  };

  render() {
    const {categories, eventsbt, eventsuc} = this.state;
    return (
      <Container>
        <AllHeader />
        <Container style={{marginLeft: 8, marginRight: 5}}>
          <Content>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
            </Item>
            <Content>
              <Text
                style={{
                  color: 'orange',
                  backgroundColor: 'lightgrey',
                  fontSize: 24,
                }}>
                CATEGORIES
              </Text>
              <ScrollView>
                <FlatList
                  data={categories}
                  renderItem={this.handleCategory}
                  keyExtractor={item => item.id.toString()}
                  horizontal
                />
              </ScrollView>
            </Content>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 0,
                marginVertical: 10,
              }}
            />
            <Text
              style={{
                color: 'orange',
                backgroundColor: 'lightgrey',
                fontSize: 24,
              }}>
              TODAY
            </Text>
            <Content>
              <ScrollView>
                <FlatList
                  data={eventsbt}
                  keyExtractor={item => item.id.toString()}
                  horizontal
                  renderItem={({item}) => {
                    let checkDate = new Date(item.startTime);
                    let date = moment(checkDate).format('DD MMM YYYY');
                    return (
                      <Card style={{flex: 0, width: 350}}>
                        <CardItem>
                          <Body>
                            <Image
                              source={{
                                uri: item.img,
                              }}
                              style={{
                                height: 200,
                                width: 315,
                                flex: 1,
                              }}
                            />
                            <Body>
                              <Text style={{fontSize: 22}}>{item.title}</Text>
                              <Text note>{date}</Text>
                            </Body>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Text note>Rp{item.price},-</Text>
                          </Left>
                          <Button bordered style={{borderColor: 'orange'}} onPress={this.handlePressEvents(item.id)}>
                            <Text style={{color: 'orange'}}>See More...</Text>
                          </Button>
                          <Right>
                            <Icon name="heart" />
                          </Right>
                        </CardItem>
                      </Card>
                    );
                  }}
                />
              </ScrollView>
            </Content>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 0,
                marginVertical: 10,
              }}
            />
            <Text
              style={{
                color: 'orange',
                backgroundColor: 'lightgrey',
                fontSize: 24,
              }}>
              UPCOMING EVENTS
            </Text>
            <Content>
              <ScrollView>
                <FlatList
                  data={eventsuc}
                  keyExtractor={item => item.id.toString()}
                  horizontal
                  renderItem={({item}) => {
                    let checkDate = new Date(item.startTime);
                    let date = moment(checkDate).format('DD MMM YYYY');
                    return (
                      <Card style={{flex: 0, width: 350}}>
                        <CardItem>
                          <Body>
                            <Image
                              source={{
                                uri: item.img,
                              }}
                              style={{
                                height: 200,
                                width: 315,
                                flex: 1,
                              }}
                            />
                            <Body>
                              <Text style={{fontSize: 22}}>{item.title}</Text>
                              <Text note>{date}</Text>
                            </Body>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Text note>Rp{item.price},-</Text>
                          </Left>
                          <Button bordered style={{borderColor: 'orange'}} onPress={this.handlePressEvents(item.id)}>
                            <Text style={{color: 'orange'}}>See More...</Text>
                          </Button>
                          <Right>
                            <Icon name="heart" />
                          </Right>
                        </CardItem>
                      </Card>
                    );
                  }}
                />
              </ScrollView>
            </Content>
          </Content>
        </Container>
      </Container>
    );
  }
}
