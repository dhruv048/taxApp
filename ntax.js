import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput,ScrollView, SafeAreaView,TouchableOpacity } from 'react-native';
import { Checkbox, RadioButton, Button, Colors } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function InputPage() {


  const [totalTax, setTotalTax] = useState(0);

  const [isMarried, setIsMarried] = useState(false);
  const [gender, setGender] = useState('male');
  const [monthlySalary, setMonthlySalary] = useState('0');
  const [allowances, setAllowances] = useState('0');
  const [bonus, setBonus] = useState('0');
  const [retirementBenefit, setRetirementBenefit] = useState('nothing');
  const [CIT, setCIT] = useState('0');

  const [lifeInsurance, setLifeInsurance] = useState('0');
  const [healthInsurance, setHealthInsurance] = useState('0');
  const [privateBuildingInsurance, setPrivateBuildingInsurance] = useState('0');

  const handleInputValidation = (text, setterFunction) => {
    if (!text || isNaN(text)) {
      setterFunction(0);
    } else {
      setterFunction(parseFloat(text));
    }
  };
  
  const calculateTax = () => {
    let grossIncome = parseInt(monthlySalary, 10);


    if (isNaN(monthlySalary)) {
      Alert.alert('Invalid Input', 'Please enter a valid income.');
      return;
    }
      setMonthlySalary(monthlySalary === '' ? '0' : monthlySalary);
      setAllowances(allowances === '' ? '0' : allowances);
      setBonus(bonus === '' ? '0' : bonus);
      setCIT(CIT === '' ? '0' : CIT);
      setLifeInsurance(lifeInsurance === '' ? '0' : lifeInsurance);
      setHealthInsurance(healthInsurance === '' ? '0' : healthInsurance);
      setPrivateBuildingInsurance(privateBuildingInsurance === '' ? '0' : privateBuildingInsurance);
    
    let PFAmount = retirementBenefit=="PF"?0.2*grossIncome:0
    let SSFAmount = retirementBenefit=="SSF"?0.31*grossIncome:0

    console.log("PF amount: "+PFAmount)
    console.log("SSF amount: "+SSFAmount)

      //ADD ALLOWANCE AND BONUS TO GROSS SALARY
    grossIncome+=parseInt(allowances)+parseInt(bonus)+(PFAmount/2)+(SSFAmount/1.55)
    console.log("Gross imcome: "+grossIncome.toString())


    let benefitAmount =retirementBenefit =="PF"? Math.min((PFAmount+SSFAmount+parseInt(CIT)), (grossIncome/3), 300000): Math.min((PFAmount+SSFAmount+parseInt(CIT)), (grossIncome/3), 500000);
    console.log("Benefit Amount: "+benefitAmount.toString())

   
    let insuranceBenefit = Math.min(lifeInsurance, 40000)+Math.min(healthInsurance, 20000)+Math.min(privateBuildingInsurance, 5000)
    console.log("Insurance Benefit Amount: "+insuranceBenefit.toString())



    let totalTaxAmount = 0;
    let taxableAmount = grossIncome-benefitAmount-insuranceBenefit;
    console.log("Taxable Amount: "+taxableAmount.toString())

    if (isMarried) {
        if (taxableAmount <= 600000) {
            totalTaxAmount = (taxableAmount * retirementBenefit =="SSF"?0: 0.01);
          } else if (taxableAmount <= 800000) {
            totalTaxAmount = 600000 * (retirementBenefit =="SSF"?0: 0.01 )+ (taxableAmount - 600000) * 0.1;
          } else if (taxableAmount <= 1100000) {
            totalTaxAmount =
              600000 * (retirementBenefit =="SSF"?0: 0.01) + 200000 * 0.1 + (taxableAmount - 800000) * 0.2;
          } else if (taxableAmount <= 2000000) {
            totalTaxAmount =
              600000 *( retirementBenefit =="SSF"?0: 0.01) + 200000 * 0.1 + 300000 * 0.2 + (taxableAmount - 1100000) * 0.3;
          } else if(taxableAmount <= 5000000){
            totalTaxAmount =
              600000 * (retirementBenefit =="SSF"?0: 0.01 )+
              200000 * 0.1 +
              300000 * 0.2 +
              900000 * 0.3 +
              
              (taxableAmount - 2000000) * 0.36;
          }else {
            totalTaxAmount =
              600000 * (retirementBenefit =="SSF"?0: 0.01 )+
              200000 * 0.1 +
              300000 * 0.2 +
              900000 * 0.3 +
              3000000 * 0.36+
              (taxableAmount - 5000000) * 0.39;
          }
    } else {
      

    if (taxableAmount <= 500000) {
      totalTaxAmount = taxableAmount * (retirementBenefit =="SSF"?0:0.01);
    } else if (taxableAmount <= 700000) {
      totalTaxAmount = 500000 *( retirementBenefit =="SSF"?0: 0.01 )+ (taxableAmount - 500000) * 0.1;
    } else if (taxableAmount <= 1000000) {
      totalTaxAmount =
        500000 * (retirementBenefit =="SSF"?0: 0.01 )+ 200000 * 0.1 + (taxableAmount - 700000) * 0.2;
    } else if (taxableAmount <= 2000000) {
      console.log(totalTaxAmount)
      totalTaxAmount =
        500000 * (retirementBenefit =="SSF"?0: 0.01 )+200000 * 0.1 + 300000 * 0.2 + (taxableAmount - 1000000) * 0.3;
        console.log(totalTaxAmount)
    } else if (taxableAmount <= 5000000) {
      console.log(totalTaxAmount)
      totalTaxAmount =
        500000 * (retirementBenefit =="SSF"?0: 0.01 )+200000 * 0.1 + 300000 * 0.2 +100000*0.3+ (taxableAmount - 2000000) * 0.36;
        console.log(totalTaxAmount)
    } 
    else {
      totalTaxAmount =
        500000 *  (retirementBenefit =="SSF"?0:0.01 )+
        200000 * 0.1 +
        300000 * 0.2 +
        1000000 * 0.3 +
        3000000 *0.36+
        (taxableAmount - 5000000) * 0.36;
    }
  }
  let tempTax =totalTaxAmount
  if(gender=="female" && isMarried==false){
    
    tempTax -=0.1*tempTax
  }
  

    setTotalTax(tempTax);
  };

  return (
    <SafeAreaView>
            <KeyboardAwareScrollView >

    <View style={styles.container}>
      <Text style={styles.label}>Married</Text>
      <Checkbox.Item
        label="Married"
        status={isMarried ? 'checked' : 'unchecked'}
        onPress={() => setIsMarried(!isMarried)}
        color="#1565C0"
      />

      <Text style={styles.label}>Gender</Text>
      <RadioButton.Group onValueChange={(value) => setGender(value)} value={gender}>
        <View style={styles.radioButtonsContainer}>
          <RadioButton.Item label="Male" value="male" color="#1565C0" />
          <RadioButton.Item label="Female" value="female" color="#1565C0" />
        </View>
      </RadioButton.Group>

      <Text style={styles.label}>Monthly Salary</Text>
      <TextInput
        value={monthlySalary}
        onChangeText={(text) => setMonthlySalary(text)}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Allowances</Text>
      <TextInput
        value={allowances}
        onChangeText={(text) => setAllowances(text)}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Bonus</Text>
      <TextInput
        value={bonus}
        onChangeText={(text) => setBonus(text)}
        keyboardType="numeric"
        style={styles.input}
      />

<Text style={styles.label}>Retirement Benefit</Text>
<RadioButton.Group onValueChange={(value) => setRetirementBenefit(value)} value={retirementBenefit}>
        <View style={styles.radioButtonsContainer}>
          <RadioButton.Item label="Nothing" value="Nothing" color="#1565C0" />
          <RadioButton.Item label="PF" value="PF" color="#1565C0" />

          <RadioButton.Item label="SSF" value="SSF" color="#1565C0" />
        </View>
      </RadioButton.Group>
        <Text style={styles.label}>CIT  </Text>

        <TextInput
        value={CIT}
        onChangeText={(text) => setCIT(text)}
        keyboardType="numeric"
        style={styles.input}
      />
      
       
        

      <Text style={styles.label}>Life Insurance</Text>
      <TextInput
        value={lifeInsurance}
        onChangeText={(text) => setLifeInsurance(text)}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Health Insurance</Text>
      <TextInput
        value={healthInsurance}
        onChangeText={(text) => setHealthInsurance(text)}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Private Building Insurance</Text>
      <TextInput
        value={privateBuildingInsurance}
        onChangeText={(text) => setPrivateBuildingInsurance(text)}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={calculateTax}
        style={styles.button}
      >
        Submit
      </Button>
      <Text>Total Tax (NPR): {totalTax}</Text>

    </View>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  space: {
    width: 10, // Adjust the width to control the space size
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#1565C0',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginRight: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1565C0',
  },
});
