import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';


const DropdownCheckboxList = (props) => {



  const { idGlobal } = useContext(GlobalContext);

  const tourId = props.id || "67dad40d0d62a9587e30e67a"; // Example tour ID


  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: 'Option 1', containsTour: false },
    { id: 2, name: 'Option 2', containsTour: false },
    { id: 3, name: 'Option 3', containsTour: false },
    { id: 4, name: 'Option 4', containsTour: false },
    { id: 5, name: 'Option 5', containsTour: false },
  ]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    fetchFolders();
  }
  , []);

  const toggleItem =  async (folderId) => {
    
    const response = await axios.post(`https://ninth-rhino-450106-u8.df.r.appspot.com/folders/${folderId}/tours/${tourId}`);

    fetchFolders();
    
  };

  const fetchFolders = async () => {
    try {

      const url = `https://ninth-rhino-450106-u8.df.r.appspot.com/folders/user/${idGlobal}/tours/${tourId}`;

      console.log("Fetching folders from URL:");
      console.log(url);

      const response = await axios.get(url);

      setItems(response.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  } 

  const selectedCount = items.filter(item => item.containsTour).length;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
        <Text style={styles.headerText}>
          {selectedCount > 0 
            ? `${selectedCount} selected` 
            : 'Select options'}
        </Text>
        <Text>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownList}>
          {items.map(item => (
            <TouchableOpacity 
              key={item.id}
              style={styles.item}
              onPress={() => toggleItem(item.id)}
            >
              <Checkbox
                status={item.containsTour ? 'checked' : 'unchecked'}
                onPress={() => toggleItem(item.id)}
                color="#6200ee"
              />
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Styles remain the same as previous example
const styles = StyleSheet.create({
  container: {
    width: '80%',
    margin: 20,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: 16,
  },
  dropdownList: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default DropdownCheckboxList;