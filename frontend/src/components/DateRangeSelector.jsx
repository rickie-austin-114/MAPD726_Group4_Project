import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const DateRangeSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [openEndPicker, setOpenEndPicker] = useState(false);
  const [daysBetween, setDaysBetween] = useState(0);

  const calculateDaysBetween = (start, end) => {
    const days = moment(end).diff(moment(start), 'days');
    setDaysBetween(days);
    console.log(`Number of days between: ${days}`);
    console.log(moment(start).format('YYYY-MM-DD'));
    console.log(moment(end).format('YYYY-MM-DD'));
    return days;
  };

  const handleConfirmStartDate = (date) => {
    setStartDate(date);
    setOpenStartPicker(false);
    calculateDaysBetween(date, endDate);
  };

  const handleConfirmEndDate = (date) => {
    if (moment(date).isBefore(startDate)) {
      alert("End date cannot be before start date!");
      return;
    }
    setEndDate(date);
    setOpenEndPicker(false);
    calculateDaysBetween(startDate, date);
  };

  return (
    <View style={styles.container}>
      {/* Start Date Picker */}
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setOpenStartPicker(true)}
      >
        <Text style={styles.dateText}>
          Start Date: {moment(startDate).format('MMMM D, YYYY')}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={openStartPicker}
        date={startDate}
        mode="date"
        onConfirm={handleConfirmStartDate}
        onCancel={() => setOpenStartPicker(false)}
        minimumDate={new Date(2000, 0, 1)}
        maximumDate={endDate}
      />

      {/* End Date Picker */}
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setOpenEndPicker(true)}
      >
        <Text style={styles.dateText}>
          End Date: {moment(endDate).format('MMMM D, YYYY')}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={openEndPicker}
        date={endDate}
        mode="date"
        onConfirm={handleConfirmEndDate}
        onCancel={() => setOpenEndPicker(false)}
        minimumDate={startDate}
        maximumDate={new Date(2030, 11, 31)}
      />

      {/* Results Display */}
      <Text style={styles.resultText}>
        Days between dates: {daysBetween}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  dateButton: {
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1976d2',
  },
  resultText: {
    marginTop: 25,
    fontSize: 18,
    textAlign: 'center',
    color: '#2e7d32',
    fontWeight: 'bold',
  },
});

export default DateRangeSelector;