import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Plant = () => {

  const progressBars = [
    { label: 'Water', value: 50 },
    { label: 'Sunlight', value: 75 },
    { label: 'Nutrients', value: 30 },
  ];


  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>My Plant</Text>
      <Image
        source={{ uri: 'path-to-your-plant-image' }}
        style={styles.plantImage}
      />
      <Text style={styles.title}>My Plant</Text>
      <Text style={styles.description}>
        Detailed information about your plant
      </Text>
      <Text style={styles.advice}>
        Advice about how to improve your plant's well-being and growth
      </Text>
      <View style={styles.progressBarsContainer}>
        {progressBars.map((item, index) => (
          <View key={index} style={styles.progressBar}>
            <Text>{item.label}</Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarValue,
                  { width: `${item.value}%` },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    margin: 10,
    color: 'blue',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  plantImage: {
    width: '100%',
    height: 200,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'center',
  },
  advice: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'center',
  },
  progressBarsContainer: {
    marginVertical: 20,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  progressBarBackground: {
    height: 20,
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarValue: {
    height: '100%',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: 'green',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Plant;