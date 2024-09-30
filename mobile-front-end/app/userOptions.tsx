
import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const UserOptions = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(true);

  const handleConfirm = () => {
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Options</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>Next</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Change username here"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Change email here"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Change password here"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />

      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Option #1</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={option1 ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={setOption1}
          value={option1}
        />
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Option #2</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={option2 ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={setOption2}
          value={option2}
        />
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Option #3</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={option3 ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={setOption3}
          value={option3}
        />
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ececec',
  },
  headerButton: {
    color: 'green',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  optionLabel: {
    fontSize: 18,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 100,
    borderRadius: 20,
    marginBottom: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UserOptions;
