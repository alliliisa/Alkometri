import React, {useState} from "react";
import { StyleSheet, TextInput, View, Text, Button } from "react-native";
import RadioForm from 'react-native-simple-radio-button';

//nimetään tarvittavat muuttujat laskentaa varten
export default function App(){
  const [bottles, setBottles] = useState();
  const [time, setTime] = useState();
  const [weight, setWeight] = useState();
  const [gender, setGender] = useState('male')
  const [promilles, setPromilles] = useState(0);
  
//nimetään sukupuolet
  const genders =[
    {label:'Male', value: 'male'},
    {label: 'Female',  value: 'female'}
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
    <View style={styles.container}>
      <Text style={styles.title}>Alli's drunkometer</Text>
    
      <View style={styles.field}>
        <Text>How many bottles did you drink?</Text>
        <TextInput style={styles.input} value={bottles} onChangeText={text => setBottles(text)} placeholder='quantity' keyboardType='decimal-pad'/>
          </View>

      <View style={styles.field}> 
        <Text style={styles.field}>In how many hours?</Text>
        <TextInput style={styles.input} value={time} onChangeText={text => setTime(text)} placeholder='hours' keyboardType='decimal-pad'/>
      </View>

      <View style={styles.field}>  
        <Text style={styles.field}>How much do you weight?</Text>
        <TextInput style={styles.input} value={weight} onChangeText={text => setWeight(text)} placeholder='kg' keyboardType='decimal-pad'/>
      </View>

      <View style={styles.field}>  
        <Text style={styles.field}>Gender:</Text>
          <RadioForm style={styles.radio} buttonSize = {10} radio_props={genders} initial={0} onPress={(value) => {setGender(value)}}/>
      </View>

      <View style={styles.field}>
        <Text style={styles.field}>Promilles:</Text>
        <Text style={styles.input}>{promilles.toFixed(2)}</Text>
      </View>  
        <Button onPress={calculate} title="calculate"></Button>
    </View>
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
});

