import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

export default function HomePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const result = await response.json();
      const countryList = result.map(item => ({
        id: item.name.common,
        flagUrl: item.flags.svg,
        name: item.name.common,
        ptName: item.translations.por.common,
        population: item.population,
        capital: item.capital,
        region: item.region,
      }));
      setCountries(countryList);
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderCountry = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Image style={styles.flag} source={{ uri: item.flagUrl }} />
      </View>
      <View>
        <Text style={styles.text1}>{item.name}</Text>
        <Text style={styles.text2}>{item.ptName}</Text>
        <Text style={styles.text3}> CAPITAL: {item.capital}</Text>
        <Text style={styles.text4}> CONTINENTE: {item.region}</Text>
        <Text style={styles.text5}> POPULAÇÃO: {item.population}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PAÍSES</Text>
      <FlatList
        data={countries}
        renderItem={renderCountry}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#D8BFD8',
      alignItems: 'center',
      justifyContent: 'flex-start',
   },

   title: {
      fontSize: 50,
      fontWeight: '600',
      marginVertical:60,
   },

   text1:{
      fontSize: 25,
      marginHorizontal:-170,
      marginVertical:10,
   },

   text2:{
      fontSize: 20,
      marginHorizontal:-15,

   },
   text3:{
      fontSize: 20,
      marginHorizontal:-19,

   },
   text4:{
      fontSize: 20,
      marginHorizontal:-18,

   },
   text5:{
      fontSize: 20,
      marginHorizontal:-18,

   },
   
   card: {
      width:600,
      height:200,
      backgroundColor: '#FFF0F5',
      borderRadius: 30,
      flexDirection:'row',
      justifyContent: 'flex-start',
      marginVertical:20,
      marginHorizontal:25,
      borderEndColor:'#4B0082'
   },

   flag:{
      width:150,
      height:100,
      marginVertical:60,
      marginHorizontal: 20,
   }

    

});