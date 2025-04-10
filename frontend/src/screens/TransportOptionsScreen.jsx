import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
// src/screens/ListPatientsScreen.tsx
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
  Dimensions,
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
  CurrencyDollarIcon,
} from "react-native-heroicons/solid";
import { storeColors } from "../theme";
import StarRating from "../components/StarRating";

import { backendURL } from "../config";

import Spacer from "../components/Spacer.jsx";


const TransportOptionsScreen = ({ route, navigation }) => {

  const categories = ["All", "Plane", "Bus"];

  const [distance, setDistance] = useState([]);

  const [city, setCity] = useState("Toronto");
  const [country, setCountry] = useState("CA");

  const [tours, setTours] = useState([]);
  const [error, setError] = useState("");
  const [listCritical, setListCritical] = useState(false);
  const [search, setSearch] = useState("");

  const isFocused = useIsFocused();

  const [activeCategory, setActiveCategory] = useState("All");

  const [currentLatitude, setCurrentLatitude] = useState(43.64227871336288);
  const [currentLongitude, setCurrentLongitude] = useState(-79.38824781692587);

  const { latitude, longitude, category } = route.params;

  useEffect(() => {
    fetchTours();
    axios
      .get("https://ipinfo.io/199.212.27.183?token=f310970223fa07")
      .then((response) => {
        console.log(response.data);
        setCity(response.data.city);
        setCountry(response.data.country);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchTours = async () => {
    try {
        const land = category === "America";
        const url = `${backendURL}api/transports/?land=${land}`;
        console.log(url);
        const response = await axios.get(url);
        console.log(response.data);
        setTours(response.data);

    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  function calculateDistance(lat1, lon1, lat2, lon2) {
    // Convert degrees to radians
    const toRad = (value) => (value * Math.PI) / 180;
  
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }
  

  const toggleSwitch = () => {
    setListCritical(!listCritical);
  };

  useEffect(() => {
    fetchTours();
  }, [activeCategory, isFocused]);


  const viewProfile = (tour, price) => {
    navigation.navigate("ViewTransport", { tour , ticketPrice: price});
  };

  const navigateToFavorites = () => {
    navigation.navigate("FoldersList");
  };

  const navigateToProfile = () => {
    navigation.navigate("ViewProfile", { id: "67b73ee28885fbfe362254a1" });
  };

  return (
    <LinearGradient
      colors={["rgba(58, 131, 244, 0.4)", "rgba(9, 181, 211, 0.4)"]}
      className="w-full flex-1"
    >
      <View className="container">
        <View className="flex-row justify-between items-center px-4">
          <Bars3CenterLeftIcon color={storeColors.text} size="30" />

          <TouchableOpacity onPress={navigateToProfile}>
            <UserCircleIcon color={storeColors.text} size="30" />
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToFavorites}>
            <StarIcon color={storeColors.text} size="30" />
          </TouchableOpacity>

          <BellIcon color={storeColors.text} size="30" />
        </View>
      </View>
      <View className="mt-3">
        <Text
          style={{ color: storeColors.text }}
          className="ml-4 text-3xl font-bold"
        >
          Transportation Options from {city}, {country}
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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <ScrollView
        // style={{ height: 1000 }}
        showsVerticalScrollIndicator={true}
      >
        {tours.map((tour, index) => {
          let bg = "rgba(255,255,255,0.4)";
          // tour.condition == "Critical"
          //   ? "rgba(192, 132, 252,0.4)"

          const transportPrice = Math.round( tour.price * calculateDistance(currentLatitude, currentLongitude, latitude, longitude) / 2000)

          if (tour.name.startsWith(search) && (tour.category == activeCategory || activeCategory == "All")) {
            return (


              <TouchableOpacity
                style={{ backgroundColor: bg }}
                className="mx-4 p-2 mb-2 flex-row rounded-3xl"
                key={index}
              >
                <Image
                  source={{ uri: tour.image }}
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

                      <Text className="text-xs text-gray-700">Rating:</Text>

                      <StarRating numberOfStars={tour.ratings} />
                      {}
                    </View>
                  </View>

                  <View className="flex-row space-x-3">
                    <View className="flex-row space-x-1">
                      <CurrencyDollarIcon
                        size="15"
                        className="text-blue-500"
                      />

                      <Text className="text-xs text-gray-700">Price :{transportPrice}</Text>

                      {}
                    </View>
                  </View>
                </View>
                <View className="flex justify-center items-center">
                  <TouchableOpacity
                    onPress={() => {
                      viewProfile(tour, transportPrice);
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

      <Spacer />


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
  starContainer: {
    flexDirection: "row",
  },
});

export default TransportOptionsScreen;
