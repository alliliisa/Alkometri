import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, Button, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import RadioForm from 'react-native-simple-radio-button';

//nimetään tarvittavat muuttujat laskentaa varten
export default function App(){
  const [bottles, setBottles] = useState(0);
  const [time, setTime] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState('male');
  const [promilles, setPromilles] = useState(0);
  
//nimetään sukupuolet
  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];

  const amount = [...Array(25).keys()].slice(1).map(n => ({ label: `${n}`, value: n }));
  const hours = [...Array(15).keys()].slice(1).map(n => ({ label: `${n}`, value: n }));

  // Color based on promille level
  const getColor = () => {
    if (promilles < 0.5) return "green";
    if (promilles < 1.0) return "yellow";
    return "red";
  };

  //Lasku funktio
  function calculate() {
    if (weight === 0 || weight === '') {
      Alert.alert("Warning", "Please enter your weight.");
      return;
    }

    let litres = bottles * 0.33;
    let grams = litres * 8 * 4.5;
    let burning = weight / 10;
    let gramsLeft = grams - burning * time;
    
    let promillesMale = gramsLeft / (weight * 0.7);
    let promillesFemale = gramsLeft / (weight * 0.6);

    //If -lauseke määrittämään sukupuoli  
    if (gender === 'male') {
      setPromilles(promillesMale < 0 ? 0 : promillesMale);
    } else {
      setPromilles(promillesFemale < 0 ? 0 : promillesFemale);
    }
  }

  //Appin toiminta
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Alli's Drunkometer</Text>
        
        <View style={styles.field}>
          <Text>How many bottles did you drink?</Text>
          <Picker style={styles.picker}
            onValueChange={(itemValue) => setBottles(itemValue)}
            selectedValue={bottles}>
            {amount.map((amount, index) => (
              <Picker.Item key={index} label={amount.label} value={amount.value} />
            ))}
          </Picker>
        </View>

        <View style={styles.field}> 
          <Text>In how many hours?</Text>
          <Picker style={styles.picker}
            onValueChange={(itemValue) => setTime(itemValue)}
            selectedValue={time}>
            {hours.map((hours, index) => (
              <Picker.Item key={index} label={hours.label} value={hours.value} />
            ))}
          </Picker>
        </View>

        <View style={styles.field}>  
          <Text>How much do you weigh?</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={text => setWeight(text)}
            placeholder='Weight in kg'
            keyboardType='decimal-pad'
          />
        </View>

        <View style={styles.field}>  
          <Text>Gender:</Text>
          <RadioForm
            style={styles.radio}
            buttonSize={10}
            radio_props={genders}
            initial={0}
            onPress={(value) => { setGender(value); }}
          />
        </View>

        <View style={styles.field}>
          <Text>Promilles:</Text>
          <Text style={[styles.result, { color: getColor() }]}>{promilles.toFixed(2)}</Text>
        </View>  
        
        <Button onPress={calculate} title="Calculate"></Button>
      </View>
    </ScrollView>
  );
}

//Ulkoasu
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    color: '#000',
    textAlign: "center",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  title: {
    marginBottom: 20,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 6,
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
  },
  field: {
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  radio: {
    marginTop: 10,
    marginBottom: 20,
  }, 
  picker: {
    width: 200,
    marginVertical: 10,
  },
  result: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 10,
  }
});
