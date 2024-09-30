import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const NewPost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleAddImage = () => {
  };

  const handlePublish = () => {
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>Filter</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
        <Text style={styles.addButtonText}>Add Image</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Post Title Here..."
        value={postTitle}
        onChangeText={setPostTitle}
        style={styles.inputTitle}
      />

      <TextInput
        placeholder="Write your content here..."
        value={postContent}
        onChangeText={setPostContent}
        style={styles.inputContent}
        multiline={true}
      />

      <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
        <Text style={styles.publishButtonText}>Publish Post +</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerButton: {
    color: 'green',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  addButton: {
    backgroundColor: '#e7e7e7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  inputTitle: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
  },
  inputContent: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    height: 200,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  publishButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  publishButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default NewPost;
