import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const DateRangeSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [openEndPicker, setOpenEndPicker] = useState(false);

  const handleConfirmStartDate = (date) => {
    setStartDate(date);
    setOpenStartPicker(false);
    // Ensure end date is not before start date
    if (moment(date).isAfter(endDate)) {
      setEndDate(date);
    }
  };

  const handleConfirmEndDate = (date) => {
    if (moment(date).isBefore(startDate)) {
      alert("End date cannot be before start date!");
      return;
    }
    setEndDate(date);
    setOpenEndPicker(false);
  };

  return (
    <View style={styles.container}>
      {/* Start Date Picker */}
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setOpenStartPicker(true)}
      >
        <Text style={styles.dateText}>
          Start Date: {moment(startDate).format('YYYY-MM-DD')}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={openStartPicker}
        date={startDate}
        mode="date"
        onConfirm={handleConfirmStartDate}
        onCancel={() => setOpenStartPicker(false)}
        minimumDate={new Date(2000, 0, 1)} // Optional: Set min/max dates
        maximumDate={new Date(2030, 11, 31)}
      />

      {/* End Date Picker */}
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setOpenEndPicker(true)}
      >
        <Text style={styles.dateText}>
          End Date: {moment(endDate).format('YYYY-MM-DD')}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={openEndPicker}
        date={endDate}
        mode="date"
        onConfirm={handleConfirmEndDate}
        onCancel={() => setOpenEndPicker(false)}
        minimumDate={startDate} // Ensure end date >= start date
        maximumDate={new Date(2030, 11, 31)}
      />

      {/* Display Selected Range */}
      <Text style={styles.summaryText}>
        Selected: {moment(startDate).format('MMM D')} to {moment(endDate).format('MMM D, YYYY')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  dateButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
  },
  summaryText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

export default DateRangeSelector;