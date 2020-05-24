import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Image,
  FlatList,
  Text,
} from 'react-native';

const Movie = ({post, time}) =>{
    state = {
        data: []
    };
    const movie = fetch('http://www.omdbapi.com/?t=${post}&y=${time}&plot=full', {method: 'GET'}).then(res =>res.json()).then(item => this.setState({data: item}));
    return(
        <View>
            <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name={Home}
                component = {App}>
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
          <View>
              {movie}
              <Image source = {require(this.state.data.Poster)}></Image>
              <Text>{this.state.data.Title}</Text>
              <Text>{this.state.data.Year}</Text>
              <Text>{this.state.data.Director}</Text>
              <FlatList data={this.state.data.Actors} renderItem = {({actor}) => <Text>{actor}</Text>}></FlatList>
          </View>
        </View>
    )
}

export default Movie;
