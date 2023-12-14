import {StyleSheet, View, Dimensions, StatusBar} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {userBookingsReducer} from '../../hooks/Slice';
import BookingCard from '../components/Booking/BookingCard';
import {useRoute} from '@react-navigation/native';
import Animation from '../components/Animation';

const {width} = Dimensions.get('window');
const ServiceHistory = () => {
  const [UserBookings, setUserBookings] = useState([]);
  const loggedInUser = useSelector(state => state.globalStore.LoggedInUserData);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const route = useRoute(); // Use useRoute to access the route object

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const snapshot = await firestore()
          .collection('Bookings')
          .where('UserEmail', '==', route.params.email)
          .get();
        const bookings = snapshot.docs.map(doc =>
          Object.assign(doc.data(), {
            id: doc.id,
          }),
        );
        setUserBookings(bookings);
        dispatch(userBookingsReducer(bookings));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUserBookings();
  }, []);

  useEffect(() => {
    performAsyncAction();
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, []);

  const performAsyncAction = async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(300);
    StatusBar.setBarStyle('dark-content');
  };
  return (
    <View style={styles.container}>
      <Header headerText={'Service History'} />
      {loading ? (
        <Animation />
      ) : (
        <BookingCard
          bookingData={UserBookings}
          employeeData={[]}
          isAdmin={loggedInUser.isAdmin}
          loading={false}
        />
      )}
    </View>
  );
};

export default ServiceHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  historyRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 18,
    marginRight: 18,
    elevation: 3,
    backgroundColor: '#fff',
    shadowColor: '#fff',
    marginBottom: 5,
  },
  Image: {
    width: width * 0.33,
    height: width * 0.33,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: 20,
  },
  infoContainer: {
    paddingLeft: 15,
  },
  typeText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'left',
    textAlignVertical: 'bottom',
    fontWeight: '700',
    paddingLeft: 20,
  },
  doneContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    marginTop: 2,
  },
  doneImage: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
  },
  doneText: {
    fontSize: 15,
    textAlign: 'left',
    color: '#118220',
    fontWeight: '700',
    paddingLeft: 3,
  },
  pendingContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    marginTop: 2,
  },
  pendingImage: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  statusText: {
    fontSize: 15,
    textAlign: 'left',
    color: '#2463eb',
    fontWeight: '700',
    paddingLeft: 3,
  },
  dateText: {
    fontSize: 15,
    color: '#8c8b8b',
    textAlign: 'left',
    textAlignVertical: 'bottom',
    fontWeight: '500',
    paddingTop: 3,
    paddingLeft: 20,
  },
  header: {
    paddingHorizontal: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  content: {
    overflow: 'hidden',
    backgroundColor: 'white',
    padding: 10,
  },
  collopsableBox: {
    flexDirection: 'row',
  },
  headContainer: {
    borderColor: '#a8a5a5',
    margin: 5,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#3b3b3b93',
    backgroundColor: '#fff',
  },
});
