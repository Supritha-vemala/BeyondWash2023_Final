import Header from '../components/Header';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {ModalData} from './Brand';
import CustomButton from '../components/Button/CustomButton';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {LoginReducerUpdate, SelectedCarType} from '../../hooks/Slice';
import {useNavigation} from '@react-navigation/native';
import LoadingButton from '../components/Button/LoadingButton';

const {width, height} = Dimensions.get('window');

const list = [
  {
    id: 1,
    carImage: 'https://www.pngmart.com/files/22/Toyota-Fortuner-PNG-Photo.png',
    carType: 'Hatchback',
    carExample: 'Alto, I10, I20 etc...',
  },
  {
    id: 2,
    carImage: 'https://www.pngmart.com/files/22/Sedan-PNG-Clipart.png',
    carType: 'SUV',
    carExample: 'Ford, Toyota, Corolla, Honda, Civic etc...',
  },
];

const CarDetails = () => {
  const [brandOpen, setBrandOpen] = useState(false);
  const [modaldOpen, setModalOpen] = useState(false);

  const [regValue, setRegValue] = useState('KA02KE7733');

  const [brandValue, setBrandValue] = useState([]);
  const [modalValue, setModalValue] = useState([]);

  const [selecteedBrandValue, setSelecteedBrandValue] = useState();
  const [selecteedModalValue, setSelecteedModalValue] = useState();
  const [selecteedTypeValue, setSelecteedTypeValue] = useState();
  const [Loading, setLoading] = useState(false);

  const [brandItems, setBrandItems] = useState(ModalData);
  const [modalItems, setModalItems] = useState([]);
  const reducer = useSelector(state => state.globalStore);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const foundItem = _.find(ModalData, {value: brandValue});

    if (foundItem !== undefined) {
      setModalItems(foundItem.Modal);
    }
  }, [brandValue]);

  async function checkForEmptyValues(...values) {
    let emptyValues = '';
    await values.reduce((acc, value, index) => {
      if (!value || _.isEmpty(value)) {
        if (index === 0) {
          emptyValues = emptyValues.concat('Brand'); // Assign the result back to emptyValues
        } else if (index === 1) {
          emptyValues = emptyValues.concat(', Modal');
        } else if (index === 2) {
          emptyValues = emptyValues.concat(', Type');
        } else if (index === 3) {
          emptyValues = emptyValues.concat(', Number');
        }
      }
    }, []);

    return emptyValues;
  }

  const handleConfirm = async () => {
    setLoading(true);
    const emptyValues = await checkForEmptyValues(
      selecteedBrandValue,
      selecteedModalValue,
      selecteedTypeValue,
      regValue,
    );
    if (emptyValues.length > 1) {
      Toast.show({
        type: 'error',
        text1: `${emptyValues} are empty!`,
        text2: 'Fill these to continue🙂',
        visibilityTime: 2000,
        style: {
          backgroundColor: 'green',
        },
      });
    } else {
      await firestore()
        .collection('Users')
        .doc(reducer.LoggedInUserData.uid)
        .update({
          carDetails: {
            VehicleBrand: selecteedBrandValue,
            VehicleModal: selecteedModalValue,
            VehicleType: selecteedTypeValue.bodyType,
            VehicleNumber: regValue,
            VehicleImage: list.filter(
              data => data.carType === selecteedTypeValue.bodyType,
            ),
          },
        })
        .then(async () => {
          const lastLoginTimestamp = await AsyncStorage.getItem(
            '@last_login_timestamp',
          );
          const parsedData = JSON.parse(lastLoginTimestamp);
          const userData = {
            userDetails: {
              ...parsedData.userDetails,
              carDetails: {
                VehicleBrand: selecteedBrandValue,
                VehicleModal: selecteedModalValue,
                VehicleType: selecteedTypeValue.bodyType,
                VehicleNumber: regValue,
                VehicleImage: list.filter(
                  data => data.carType === selecteedTypeValue.bodyType,
                ),
              },
            },
            isAuthenticated: reducer.isAuthenticated,
          };
          dispatch(LoginReducerUpdate(userData));
          AsyncStorage.setItem(
            '@last_login_timestamp',
            JSON.stringify(userData),
          ); // Set the initial timestamp
          navigation.navigate('HomeScreen');
        });
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Your vehicle is added successfully🙂',
        visibilityTime: 2000,
        style: {
          backgroundColor: 'green',
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header headerText={'Car Selection'} />
      <View style={styles.DropdownContainer}>
        <Text style={styles.LableText}>Add a Brand</Text>
        <DropDownPicker
          open={brandOpen}
          listMode="FLATLIST"
          value={brandValue}
          placeholder="Choose your Brand"
          items={brandItems}
          setOpen={setBrandOpen}
          setValue={setBrandValue}
          setItems={setBrandItems}
          mode="BADGE"
          style={styles.DropDownStyle}
          zIndex={12}
          textStyle={styles.textColor}
          extendableBadgeContainer={true}
          placeholderStyle={styles.placeHolderText}
          ArrowDownIconComponent={() => (
            <EvilIcons
              style={styles.Icon}
              name="chevron-down"
              size={30}
              color={'#2c65e0'}
            />
          )}
          ArrowUpIconComponent={() => (
            <EvilIcons
              style={styles.Icon}
              name="chevron-up"
              size={30}
              color={'#2c65e0'}
            />
          )}
          onSelectItem={opt => setSelecteedBrandValue(opt.label)}
          dropDownContainerStyle={styles.dropDownContainerStyle}
        />
        <Text style={styles.LableText}>Select an Modal</Text>
        <DropDownPicker
          open={modaldOpen}
          value={modalValue}
          listMode="FLATLIST"
          placeholder="Choose your Modal"
          items={modalItems}
          setOpen={setModalOpen}
          setValue={setModalValue}
          setItems={setModalItems}
          mode="BADGE"
          style={styles.DropDownStyle}
          zIndex={11}
          textStyle={styles.textColor}
          extendableBadgeContainer={true}
          placeholderStyle={styles.placeHolderText}
          ArrowDownIconComponent={() => (
            <EvilIcons
              style={styles.Icon}
              name="chevron-down"
              size={30}
              color={'#2c65e0'}
            />
          )}
          ArrowUpIconComponent={() => (
            <EvilIcons
              style={styles.Icon}
              name="chevron-up"
              size={30}
              color={'#2c65e0'}
            />
          )}
          onSelectItem={opt => {
            setSelecteedModalValue(opt.label);
            setSelecteedTypeValue(opt);
          }}
          dropDownContainerStyle={styles.dropDownContainerStyle}
        />
        {selecteedModalValue && selecteedBrandValue ? (
          <View style={styles.StatusContainer}>
            <Text style={styles.LableText}>Select type of vehicle</Text>
            <Text
              style={[
                styles.Lable,
                {
                  backgroundColor: '#E0EED0',
                },
              ]}>
              <Text style={styles.Dot}>&#9679; </Text>
              {selecteedTypeValue.bodyType}
            </Text>
          </View>
        ) : null}
        <Text style={styles.LableText}>Vehicle number</Text>
        <TextInput
          style={styles.input}
          value={regValue}
          onChangeText={text => setRegValue(text)}
          placeholder={'Reg number'}
          placeholderTextColor="#AAAAAA"
          multiline
        />
        <View style={styles.button}>
          <LoadingButton
            handleSignIn={handleConfirm}
            text={'Add Vehicle'}
            loadingProp={Loading}
          />
        </View>
      </View>
    </View>
  );
};

export default CarDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVerticalTop: 20,
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    width: width * 0.95,
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 0.2,
    color: '#000',
  },
  DropDownStyle: {
    borderBottomWidth: 0.3,
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderTopWidth: 0.3,
    borderColor: '#a8a8a8',
  },
  LableText: {
    color: '#000',
    textAlign: 'left',
    paddingHorizontal: 10,
    fontSize: 15,
    paddingVertical: 15,
    fontWeight: '400',
  },
  DropdownContainer: {
    paddingHorizontal: 10,
  },
  dropDownContainerStyle: {
    borderWidth: 0,
    elevation: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  placeHolderText: {color: '#a8a8a8'},
  textColor: {
    color: '#000',
  },
  button: {
    marginVertical: 30,
  },
  success: {
    backgroundColor: 'green',
    width: width * 0.8, // Adjust as needed
    borderRadius: 8,
    padding: 16,
  },
  error: {
    backgroundColor: 'red',
    width: width * 0.8,
    borderRadius: 8,
    padding: 16,
  },
  info: {
    backgroundColor: 'blue',
    width: width * 0.8,
    borderRadius: 8,
    padding: 16,
  },
  warning: {
    backgroundColor: 'orange',
    width: width * 0.8,
    borderRadius: 8,
    padding: 16,
  },
  StatusContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  Lable: {
    marginLeft: 5,
    color: '#333', // Text color
    fontSize: 16, // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
    borderRadius: 9, // Adjust the border radius as needed
    overflow: 'hidden',
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  Dot: {
    fontSize: height * 0.023,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
  },
});
