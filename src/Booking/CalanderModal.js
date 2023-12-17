/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import {CurrentYearReducer, bookingModalReducer} from '../../hooks/Slice';

const {width, height} = Dimensions.get('window');

const CalanderModal = ({mondayDate}) => {
  const [selectedDay, setSelectedDay] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const modalView = useSelector(state => state.globalStore.bookingModal);
  const dateYear = useSelector(state => state.globalStore.currentYear);
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.5)');
    }
  }, []);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalView.status}>
        <View style={styles.modalContainer}>
          <Calendar
            onMonthChange={month => {
              if (dateYear !== month.year) {
                dispatch(CurrentYearReducer(month.year));
              }
            }}
            style={{
              borderRadius: 20,
              width: width - 20,
              height: 'auto',
              padding: 10,
            }}
            onDayPress={day => {
              setSelectedDay(day.dateString);
              dispatch(
                bookingModalReducer({
                  status: false,
                  dateSelected: day,
                }),
              );
            }}
            disableAllTouchEventsForDisabledDays
            markedDates={{
              ...mondayDate,
              [selectedDay]: {marked: true},
              [selectedDay]: {selected: true, selectedColor: '#2c65e0'},
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  messageContainer: {
    width: width - 25,
    backgroundColor: '#fff',
  },
});

export default CalanderModal;
