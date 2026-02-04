import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { quizzes } from '../api';

const QuizScreen = ({ navigation }) => {
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadQuizzes();
  }, [selectedCategory]);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const data = await quizzes.getAll(selectedCategory);
      setQuizList(data);
    } catch (err) {
      console.error('Failed to load quizzes', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { label: 'All', value: '' },
    { label: 'Climate', value: 'climate' },
    { label: 'Waste', value: 'waste' },
    { label: 'Energy', value: 'energy' },
    { label: 'Water', value: 'water' },
  ];

  const renderQuizCard = ({ item }) => (
    <TouchableOpacity
      style={styles.quizCard}
      onPress={() => navigation.navigate('QuizDetail', { quizId: item._id })}
    >
      <Text style={styles.quizTitle}>{item.title}</Text>
      <Text style={styles.quizDesc}>{item.description}</Text>
      <View style={styles.quizMeta}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.difficulty}>{item.difficulty}</Text>
      </View>
      <Text style={styles.quizStats}>
        {item.completionCount} completed • {item.averageScore}% avg
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Environmental Quizzes</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.value}
            style={[
              styles.categoryBtn,
              selectedCategory === cat.value && styles.categoryBtnActive
            ]}
            onPress={() => setSelectedCategory(cat.value)}
          >
            <Text
              style={[
                styles.categoryBtnText,
                selectedCategory === cat.value && styles.categoryBtnTextActive
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading quizzes...</Text>
        </View>
      ) : (
        <FlatList
          data={quizList}
          renderItem={renderQuizCard}
          keyExtractor={(item) => item._id}
          style={styles.quizList}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
  },
  categoryScroll: {
    paddingHorizontal: 10,
  },
  categoryBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  categoryBtnActive: {
    backgroundColor: '#667eea',
  },
  categoryBtnText: {
    color: '#666',
    fontWeight: '500',
  },
  categoryBtnTextActive: {
    color: '#fff',
  },
  quizList: {
    flex: 1,
    padding: 10,
  },
  quizCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quizDesc: {
    color: '#666',
    marginBottom: 10,
  },
  quizMeta: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  category: {
    backgroundColor: '#e3f2fd',
    color: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 12,
  },
  difficulty: {
    backgroundColor: '#f3e5f5',
    color: '#764ba2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 12,
  },
  quizStats: {
    fontSize: 12,
    color: '#999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizScreen;
