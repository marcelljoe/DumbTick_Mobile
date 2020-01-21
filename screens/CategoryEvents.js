import React, {Component} from 'react';
import AllHeader from './AllHeader';
import {Image, ScrollView, FlatList} from 'react-native';
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
  Text,
  Content,
  Card,
  CardItem,
} from 'native-base';

export default class CategoryEvents extends Component {
    constructor(){
      super();
      this.state = {
        eventse: [],
        eventdet: []
      }
    }
    
    componentDidMount(){
      const {navigation} = this.props;
      const id  = JSON.stringify(navigation.getParam('id','default'));
      console.log(id);
      axios.get(`http://192.168.1.13:7000/dumbtick/category/${id}/events`).then(res => {
        console.log(res.data);
        this.setState({ eventse: res.data });
      });
    }


    handlePressEvents = value => () => {
    console.log({id: value});
    this.props.navigation.navigate('EventDetail', {
      id: value,
    });
  };

  render() {
      const {eventse} = this.state;
    return (
      <Container>
        <AllHeader />
        <Container style={{margin: 10}}>
          <Text
            style={{
              color: 'orange',
              backgroundColor: 'lightgrey',
              fontSize: 24,
            }}>
            EVENTS BY CATEGORY:
          </Text>

          <Content>
            <ScrollView>
              <FlatList
                data={eventse}
                keyExtractor={item => item.id.toString()}
                horizontal
                renderItem={({item}) => {
                  let checkDate = new Date(item.startTime);
                  let date = moment(checkDate).format('DD MMM YYYY');
                  return (
                    <Card style={{flex: 0, width: 350}}>
                      <CardItem onPress={this.handlePressEvents(item.id)}>
                        <Body>
                          <Image
                            source={{
                              uri: item.img,
                            }}
                            style={{height: 200, width: 315, flex: 1}}
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
        </Container>
      </Container>
    );
  }
}
