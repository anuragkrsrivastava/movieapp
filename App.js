import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Movie from './Movie;
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Image,
} from 'react-native';


const App = () => {

  state = {
    data: [],
    title: null,
    year: null
  };

  onChangeText = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = () => {
    const title = this.state.title;
    const year = this.state.year;
    if((year != null) && (title != null)){
      fetch('http://www.omdbapi.com/?t=${title}&y=${year}', {method: 'GET'})
      .then(res => res.json())
      .then(movie => this.setState({data: movie}));
    }
  }

  DataPass = (item, yr) => {
    return (
      <Movie post={item} time={yr}></Movie>
    );
  }
  return(
      <View>
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput name="title" onChangeText={onChangeText}></FormInput>
        <FormValidationMessage>This Field is Required</FormValidationMessage>
        <FormLabel>Year</FormLabel>
        <FormInput name="year" onChangeText={onChangeText}></FormInput>
        <FormValidationMessage>This Field is Required</FormValidationMessage>
        <Button type="submit" class="btn btn-success" onPress={onSubmit}>Submit</Button>
      </View>
      <View>
        <ScrollView style={styles.scrollView}>
        <FlatList data={this.state.data} renderItem = {({data}) => (<View><Image source = {require(data.Poster)} style={styles.img}></Image>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name={data.Title}
                component = {Movie}
                onPress = {() => DataPass(this.state.title, this.state.year)}>
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>{data.Year}</View>)}> </FlatList>
        </ScrollView>
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  img: {
    width: 50,
    height: 80,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
