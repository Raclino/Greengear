import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const ForumPost = () => {
  const forumPost = {
    title: 'Post Title',
    content: 'Nisi ipsum irure aute. Deserunt sit aute irure quis nulla eu consequat fugiat...',
    time: '15m ago',
  };

  const bestAnswer = {
    content: 'Labore sunt incididunt id Lorem est duis labore. Lorem incididunt et consectetur fugiat deserunt nisi dolore eiusmod culpa exercitation consectetur.',
    time: '8m ago',
  };

  const answers = [
    {
      id: '1',
      content: 'Nisi ipsum irure aute. Deserunt sit aute irure quis nulla eu consequat fugiat...',
      time: '8m ago',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forum Post</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>Filter</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{forumPost.title}</Text>
          <Text style={styles.postContent}>{forumPost.content}</Text>
          <Text style={styles.postTime}>{forumPost.time}</Text>
        </View>

        <View style={styles.bestAnswerContainer}>
          <Text style={styles.bestAnswerTitle}>Best Answer</Text>
          <Text style={styles.bestAnswerContent}>{bestAnswer.content}</Text>
          <Text style={styles.answerTime}>{bestAnswer.time}</Text>
        </View>

        {answers.map((answer) => (
          <View key={answer.id} style={styles.answerContainer}>
            <Text style={styles.answerContent}>{answer.content}</Text>
            <Text style={styles.answerTime}>{answer.time}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.answerButton}>
        <Text style={styles.answerButtonText}>Answer Post +</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerButton: {
    color: 'green',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  postContainer: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  postTitle: {
    fontWeight: 'bold',
  },
  postContent: {
    marginTop: 5,
  },
  postTime: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  bestAnswerContainer: {
    backgroundColor: '#d2f8d2',
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  bestAnswerTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bestAnswerContent: {
    marginTop: 5,
  },
  answerTime: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  answerContainer: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  answerContent: {
    marginTop: 5,
  },
  answerButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: 'green',
    borderRadius: 30,
    width: 'auto',
    paddingHorizontal: 20,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ForumPost;