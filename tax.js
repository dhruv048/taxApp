import React, { useState } from 'react';
import CheckBox from 'expo-checkbox';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
const PRIMARY_COLOR = '#0288D1';

const TaxCalculator = () => {
  const [income, setIncome] = useState('');
  const [totalTax, setTotalTax] = useState(0);
  const [isMarried, setIsMarried] = useState(false);

  const calculateTax = () => {
    const monthlyIncome = parseInt(income, 10)*12;

    if (isNaN(monthlyIncome)) {
      Alert.alert('Invalid Input', 'Please enter a valid income.');
      return;
    }

    let totalTaxAmount = 0;

    if (isMarried) {
        if (monthlyIncome <= 600000) {
            totalTaxAmount = monthlyIncome * 0.01;
          } else if (monthlyIncome <= 800000) {
            totalTaxAmount = 600000 * 0.01 + (monthlyIncome - 600000) * 0.1;
          } else if (monthlyIncome <= 1100000) {
            totalTaxAmount =
              600000 * 0.01 + 200000 * 0.1 + (monthlyIncome - 800000) * 0.2;
          } else if (monthlyIncome <= 2000000) {
            totalTaxAmount =
              600000 * 0.01 + 200000 * 0.1 + 300000 * 0.2 + (monthlyIncome - 1100000) * 0.3;
          } else {
            totalTaxAmount =
              600000 * 0.01 +
              200000 * 0.1 +
              300000 * 0.2 +
              900000 * 0.3 +
              (monthlyIncome - 2000000) * 0.36;
          }
    } else {
      

    if (monthlyIncome <= 500000) {
      totalTaxAmount = monthlyIncome * 0.01;
    } else if (monthlyIncome <= 700000) {
      totalTaxAmount = 500000 * 0.01 + (monthlyIncome - 500000) * 0.1;
    } else if (monthlyIncome <= 1000000) {
      totalTaxAmount =
        500000 * 0.01 + 200000 * 0.1 + (monthlyIncome - 700000) * 0.2;
    } else if (monthlyIncome <= 2000000) {
      totalTaxAmount =
        500000 * 0.01 + 200000 * 0.1 + 300000 * 0.2 + (monthlyIncome - 1000000) * 0.3;
    } else {
      totalTaxAmount =
        500000 * 0.01 +
        200000 * 0.1 +
        300000 * 0.2 +
        1000000 * 0.3 +
        (monthlyIncome - 2000000) * 0.36;
    }
  }
  

    setTotalTax(totalTaxAmount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nepal Tax Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your monthly income (NPR)"
        keyboardType="numeric"
        onChangeText={(text) => setIncome(text)}
        value={income}
      />
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Married:</Text>
        <CheckBox
          value={isMarried}
          disabled = {false}
          onValueChange={() => setIsMarried(!isMarried)}
          tintColors={{ true: PRIMARY_COLOR, false: 'gray' }}
        />
      </View>
      <Button title="Calculate Tax" onPress={calculateTax} color={PRIMARY_COLOR} />
      <Text style={styles.result}>Total Tax (NPR): {totalTax}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
});

export default TaxCalculator;
