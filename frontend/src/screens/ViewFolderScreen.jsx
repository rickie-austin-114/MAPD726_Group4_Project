// src/screens/ListPatientsScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
  Pressable,
  Switch,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import "../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowDownTrayIcon,
  Bars3CenterLeftIcon,
  BellIcon,
  GlobeAmericasIcon,
  InformationCircleIcon,
  UserCircleIcon,
  PlusIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { withDecay } from "react-native-reanimated";
import { storeColors } from "../theme";
import { backendURL } from '../config';


const ViewFolderScreen = ({ route, navigation }) => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState("");
  const [listCritical, setListCritical] = useState(false);
  const [search, setSearch] = useState("");

  const isFocused = useIsFocused();

  const categories = ["All", "Sightseeing", "Adventure", "Cultural"];
  const [activeCategory, setActiveCategory] = useState("All");

  const { id, name } = route.params;


  ///folders
  const fetchTours = async () => {
    try {
      //if (activeCategory === "All") {
      const response = await axios.get(`${backendURL}folders/${id}/tours`);
      setTours(response.data);
      //}
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const toggleSwitch = () => {
    setListCritical(!listCritical);
  };
  const viewProfile = (tour) => {
    navigation.navigate("ViewDestination", { tour });
  };

  useEffect(() => {
    fetchTours();
  }, [activeCategory, isFocused]);

  return (
    <LinearGradient
      colors={["rgba(58, 131, 244, 0.4)", "rgba(9, 181, 211, 0.4)"]}
      className="w-full flex-1"
    >
      <View className="container">
        <View className="flex-row justify-between items-center px-4">
          <Bars3CenterLeftIcon color={storeColors.text} size="30" />

          <BellIcon color={storeColors.text} size="30" />
        </View>
      </View>
      <View className="mt-3">
        <Text
          style={{ color: storeColors.text }}
          className="ml-4 text-3xl font-bold"
        >
          View Folder
        </Text>
      </View>

      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        placeholder="search"
        value={search}
        onChangeText={setSearch}
      />

      <View className="pl-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => {
            if (cat == activeCategory) {
              return (
                // <GradientButton key={cat} containerClass="mr-2" value={cat} />
                <TouchableOpacity
                  onPress={() => setActiveCategory(cat)}
                  key={cat}
                  className="bg-blue-400 p-3 px-4 rounded-full mr-2"
                >
                  <Text>{cat}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  onPress={() => setActiveCategory(cat)}
                  key={cat}
                  className="bg-blue-200 p-3 px-4 rounded-full mr-2"
                >
                  <Text>{cat}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </View>
      <Text> </Text>

      <Text style={{ color: storeColors.text }} className="font-semibold">
        Folder Name: {name}
      </Text>
      <Text> </Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <ScrollView style={{ height: 550 }} showsVerticalScrollIndicator={false}>
        {tours.map((tour, index) => {
          let bg = "rgba(255,255,255,0.4)";
          // tour.condition == "Critical"
          //   ? "rgba(192, 132, 252,0.4)"

          if (tour.name.startsWith(search)) {
            return (
              <TouchableOpacity
                style={{ backgroundColor: bg }}
                className="mx-4 p-2 mb-2 flex-row rounded-3xl"
                key={index}
              >
                <Image
                  source={{ uri: tour.profilePicture }}
                  style={{ width: 80, height: 80 }}
                  className="rounded-2xl"
                />
                <View className="flex-1 flex justify-center pl-3 space-y-3">
                  <Text
                    style={{ color: storeColors.text }}
                    className="font-semibold"
                  >
                    {tour.name}
                  </Text>
                  <View className="flex-row space-x-3">
                    <View className="flex-row space-x-1">
                      <InformationCircleIcon
                        size="15"
                        className="text-blue-500"
                      />

                      <Text className="text-xs text-gray-700">
                        Rating: {tour.ratings}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex justify-center items-center">
                  <TouchableOpacity
                    onPress={() => {
                      viewProfile(tour);
                    }}
                    className="bg-blue-400 p-2 px-4 rounded-full mr-2"
                  >
                    <MagnifyingGlassIcon color={storeColors.text} size="20" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          } else {
            return <></>;
          }
        })}
      </ScrollView>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffc5",
  },
  errorText: {
    color: "red",
  },
  tourText: {
    fontSize: 24,
  },
  normalTourContainer: {
    marginVertical: 10,
  },
  criticalTourContainer: {
    marginVertical: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 1,
    elevation: 3,
    width: 100,
    height: 40,
    backgroundColor: "#ADDFFF",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row", // Aligns children horizontally
    justifyContent: "space-around", // Adjusts spacing between buttons
    alignItems: "center", // Centers buttons vertically
  },
  menuContainer: {
    flexDirection: "row", // Aligns children horizontally
    justifyContent: "space-around", // Adjusts spacing between buttons
    alignItems: "center", // Centers buttons vertically
  },
});

export default ViewFolderScreen;
