import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Header from '../components/Header';

const {width, height} = Dimensions.get('window');

const FeedbackDetails = () => {
  const route = useRoute(); // Use useRoute to access the route object
  const renderItem = ({item}) => {
    return (
      <View style={styles.DetailsContainer}>
        <Text style={styles.emailText}>
          {item.email} | {item.type}
        </Text>
        <Text style={styles.commentText}>{item.comment}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header headerText={'Feedback Details'} />
      {route?.params?.FeedbackDetails?.length > 0 ? (
        <FlatList
          style={styles.DetailsContainerFlatList}
          data={route?.params?.FeedbackDetails}
          horizontal={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <Text style={styles.NoDataText}>No Feedback Recived yet</Text>
      )}
    </View>
  );
};

export default FeedbackDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  DetailsContainerFlatList: {
    padding: 10,
  },
  DetailsContainer: {
    width: '100%',
    height: 'auto',
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
  },
  emailText: {
    color: '#2c65e0',
    fontSize: height * 0.018,
    fontWeight: '700',
  },
  commentText: {
    color: '#000',
    fontWeight: '500',
    fontSize: height * 0.016,
    marginTop: 10,
  },
  NoDataText: {
    color: '#2c65e0',
    fontSize: height * 0.018,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
