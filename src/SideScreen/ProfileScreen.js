import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import UserEditScreen from './UserEditScreen';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../components/Button/CustomButton';
import {useSelector} from 'react-redux';
import {isEmpty} from '../../utilities/utils';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute to access the route object
  const reducer = useSelector(state => state.globalStore.LoggedInUserData);
  const [profileData, setProfileData] = useState();
  const [userEdit, setUserEdit] = useState(true);
  const [loading, setLoading] = useState(true);

  const [avatarSource, setavatarSource] = useState(
    'https://cdn.mos.cms.futurecdn.net/bKtcvGPKXHfBuNqtNbgsWC-1200-80.jpg',
  );
  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchImage = async img => {
    try {
      const res = await axios.get(
        `https://firebasestorage.googleapis.com/v0/b/beyondwash-c2b4f.appspot.com/o/Users%2F${img}`,
      );
      const parseData = JSON.parse(res.request.response);
      setavatarSource(
        `https://firebasestorage.googleapis.com/v0/b/beyondwash-c2b4f.appspot.com/o/Users%2F${img}?alt=media&token=${parseData.downloadTokens}`,
      );
      setLoading(false);
    } catch (error) {
      console.log('Error => ', error);
    }
  };
  const performAsyncAction = async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(500);
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('transparent');
  };

  useEffect(() => {
    performAsyncAction();
    return () => {
      clearTimeout();
    };
  }, []);
  useEffect(() => {
    // Function to fetch and set image data
    const fetchImageData = async img => {
      if (route.params?.profileDetails === undefined) {
        console.log('first', reducer);
        setProfileData(reducer);
        setUserEdit(true);
        fetchImage(reducer?.photoURL);
      } else {
        console.log('route.param', route.params);
        setProfileData(route.params?.profileDetails);
        setUserEdit(false);
        fetchImage(route.params?.profileDetails?.photoURL);
      }
    };
    fetchImageData();
  }, [reducer]);

  function handleNav() {
    StatusBar.setBarStyle('dark-content');
    navigation.navigate('AddAddress');
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.ImageStyle}
        source={require('../../assets/Carousel/radiant.png')}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <AntDesign style={{top: 5}} name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.editButton}>{userEdit && <UserEditScreen />}</View>
      </View>
      <View style={styles.profilePictureContainer}>
        {loading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <Image
            style={styles.profilePicture}
            source={{
              uri: avatarSource,
            }}
          />
        )}
      </View>
      <View style={styles.DetailsContainer}>
        <View style={styles.userDataField}>
          <FontAwesome5
            style={{top: 5}}
            name="user"
            color="#000000"
            size={height * 0.023}
            solid
          />
          <View style={styles.details}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.dataField}>
              {isEmpty(profileData?.displayName)
                ? userEdit
                  ? 'Click on edit to add address'
                  : 'Name not added by user'
                : profileData?.displayName}
            </Text>
          </View>
        </View>
        <View style={styles.userDataField}>
          <FontAwesome5
            style={{top: 5}}
            name="phone-alt"
            color="#000000"
            size={height * 0.023}
            solid
          />
          <View style={styles.details}>
            <Text style={styles.label}>Phone number</Text>
            <Text style={styles.dataField}>
              {isEmpty(profileData?.mobileNumber)
                ? userEdit
                  ? 'Click on edit to add phone number'
                  : 'Phone number not added by user'
                : profileData?.mobileNumber}
            </Text>
          </View>
        </View>
        <View style={styles.userDataField}>
          <FontAwesome5 name="envelope" color="#000000" size={20} solid />
          <View style={styles.details}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.dataField}>
              {}
              {isEmpty(profileData?.email)
                ? userEdit
                  ? 'Click on edit to add Email'
                  : 'Email not added by user'
                : profileData?.email}
            </Text>
          </View>
        </View>
        <View style={styles.userDataField}>
          <FontAwesome5 name="envelope" color="#000000" size={20} solid />
          <View style={styles.details}>
            <Text style={styles.label}>Address</Text>
            {profileData?.address === 'address' ||
            isEmpty(profileData?.address) ? (
              <Text style={styles.dataField}>
                {userEdit ? 'Click Here to add address' : 'Address not added'}
              </Text>
            ) : (
              <Text style={styles.dataField}>
                {profileData?.address.address}
              </Text>
            )}
            {profileData?.address === 'address' ||
            isEmpty(profileData?.address) ? (
              <Text style={styles.dataField}>
                {userEdit ? 'Click Here to add address' : 'Address not added'}
              </Text>
            ) : (
              <Text style={styles.dataField}>
                {profileData?.address.parkingLocation} |{' '}
                {profileData?.address.parkingNumber}
              </Text>
            )}
            {userEdit && (
              <TouchableOpacity
                style={{
                  width: width * 0.183,
                  height: height * 0.05,
                  marginHorizontal: width * 0.063,
                  marginTop: width * 0.023,
                }}
                onPress={handleNav}>
                <Text
                  style={{
                    color: '#2c65e0',
                    fontWeight: '800',
                    borderWidth: 0.65,
                    width: width * 0.283,
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    padding: 5,
                    borderRadius: 4,
                  }}>
                  Change address
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.Divider}>
          <CustomButton
            onPress={() =>
              navigation.navigate('ServiceHistory', {
                email: profileData?.email,
              })
            }
            title={'Service History'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fd',
    height: 10,
  },
  DetailsContainer: {
    width: width,
    height: height,
    top: -(height / 2.3),
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 12,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
    top: -height / 2.898,
    marginBottom: 40,
  },
  backButton: {
    borderRadius: 70,
    width: 40,
    height: 40,
    borderColor: '#fff',
    alignSelf: 'flex-start',
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
  },
  editButton: {
    alignSelf: 'flex-end',
  },
  Details: {
    color: '#000',
    fontSize: width * 0.045,
    fontWeight: '500',
    marginHorizontal: width * 0.03,
    paddingVertical: width * 0.03,
    borderBottomWidth: 0.5,
    marginBottom: width * 0.03,
  },
  profilePictureContainer: {
    borderWidth: 3,
    width: height * 0.2,
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 200,
    borderColor: '#fff',
    marginTop: height * 0.05,
    top: -height * 0.485,
  },
  profilePicture: {
    borderRadius: 75,
    width: width / 3.1,
    height: width / 3.1,
  },
  AddAddressTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  AddAddressContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#000',
    padding: 10,
    width: width / 2.5,
    height: width * 0.12,
  },
  AddressIcon: {
    alignSelf: 'center',
    fontSize: width * 0.05,
  },
  AddAddressText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center',
    marginHorizontal: 1,
  },
  ImageStyle: {
    width: width,
    height: height * 0.35,
  },
  privacyPolicyContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: width * 0.02,
  },
  privacyPolicyText: {
    color: '#000',
    marginLeft: 25,
    marginRight: 25,
    padding: 5,
    paddingLeft: 4,
    borderBottomColor: '#ded8d7',
    borderBottomWidth: 1.2,
    fontWeight: '700',
  },
  Divider: {
    paddingVertical: 20,
  },
  userDataField: {
    margin: 2,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    flexDirection: 'column',
    width: width - 50,
  },
  label: {
    color: '#000',
    marginLeft: 26,
    marginBottom: 2,
    fontFamily: 'AlongSansExtraBold',
    fontWeight: '400',
  },
  dataField: {
    color: '#000',
    marginLeft: 25,
    marginRight: 25,
    padding: 5,
    paddingLeft: 4,
    borderBottomColor: '#ded8d7',
    borderBottomWidth: 1.2,
    fontWeight: '700',
  },
  title: {
    fontWeight: '700',
    fontSize: 35,
    paddingBottom: 3,
    marginHorizontal: 5,
    color: '#000',
  },
});

export default ProfileScreen;
