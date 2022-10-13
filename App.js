import React, {useState} from "react";
import { StyleSheet, TextInput, View, Text, Button, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import RadioForm from 'react-native-simple-radio-button';

//nimetään tarvittavat muuttujat laskentaa varten
export default function App(){
  const [bottles, setBottles] = useState(0);
  const [time, setTime] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState('male')
  const [promilles, setPromilles] = useState(0);
  
//nimetään sukupuolet
  const genders =[
    {label:'Male', value: 'male'},
    {label: 'Female',  value: 'female'}
  ];

  const amount = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
    {label: '6', value: 6},
    {label: '7', value: 7},
    {label: '8', value: 8},
    {label: '9', value: 9},
    {label: '10', value: 10},
    {label: '11', value: 11},
    {label: '12', value: 12},
    {label: '13', value: 13},
    {label: '14', value: 14},
    {label: '15', value: 15},
    {label: '16', value: 16},
    {label: '17', value: 17},
    {label: '18', value: 18},
    {label: '19', value: 19},
    {label: '20', value: 20},
    {label: '21', value: 21},
    {label: '22', value: 22},
    {label: '23', value: 23},
    {label: '24', value: 24},
  ];

  const hours = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
    {label: '6', value: 6},
    {label: '7', value: 7},
    {label: '8', value: 8},
    {label: '9', value: 9},
    {label: '10', value: 10},
    {label: '11', value: 11},
    {label: '12', value: 12},
    {label: '13', value: 13},
    {label: '14', value: 14},
  ];

  //Lasku funktio
    function calculate(){
      console.log(time)
        let litres = bottles * 0.33;
        let grams = litres * 8 * 4.5;
        let burning = weight / 10;
        let gramsLeft = grams - burning * time;
    
        let promillesMale = gramsLeft / (weight * 0.7);
        let promillesFemale = gramsLeft / (weight * 0.6);

  //If -lauseke määrittämään sukupuoli  
      if (gender === 'male'){
        setPromilles(promillesMale);
        if(promillesMale < 0 ){
          setPromilles(0);
        }
      }
      else{
        setPromilles(promillesFemale);
        if(promillesFemale < 0 ){
          setPromilles(0);
        }
      }
    }

    //Appin toiminta
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Alli's drunkometer</Text>
    
      <View style={styles.field}>
        <Text>How many bottles did you drink?</Text>
        <Picker style={styles.picker}
        onValueChange={(itemValue) => setBottles(itemValue)}
        selectedValue={bottles}>
          
          {amount.map((amount,index)=>(
            <Picker.Item key={index} label={amount.label} 
            value={amount.value}/>
            ))
          }
        </Picker>
      </View>

      <View style={styles.field}> 
        <Text>In how many hours?</Text>
        <Picker style={styles.picker}
        onValueChange={(itemValue) => setTime(itemValue)}
        selectedValue={time}>
          
          {hours.map((hours,index)=>(
            <Picker.Item key={index} label={hours.label} 
            value={hours.value}/>
            ))
          }
        </Picker>
      </View>

      <View style={styles.field}>  
        <Text>How much do you weight?</Text>
        <TextInput style={styles.input} value={weight} onChangeText={text => setWeight(text)} placeholder='quantity' keyboardType='decimal-pad'/>
      </View>

      <View style={styles.field}>  
        <Text>Gender:</Text>
          <RadioForm style={styles.radio} buttonSize = {10} radio_props={genders} initial={0} onPress={(value) => {setGender(value)}}/>
      </View>

      <View style={styles.field}>
        <Text>Promilles:</Text>
        <Text style={styles.input}>{promilles.toFixed(2)}</Text>
      </View>  
        <Button onPress={calculate} title="calculate"></Button>
    </View>
    </ScrollView>
  );
}

//Ulkoasu
const styles = StyleSheet.create({
  input: {
    height: 2,
    margin: 2,
    borderWidth: 1,
    padding: 20,
    fontSize: 20,
    color: '#00030a',
    textAlign: "center",
  },
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    marginTop: 1,
    marginLeft: 40,
    marginRight: 40,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    marginBottom: 10, 
  },
  field:{
    marginTop: 2,
    textAlign:"center",
  },
  radio:{
    marginTop: 10,
    marginBottom: 10,
  }, 
  picker:{
    width:200,
  },
});