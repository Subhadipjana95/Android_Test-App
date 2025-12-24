/**
 * To-Do App
 * @format
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TodoApp isDarkMode={isDarkMode} />
    </SafeAreaProvider>
  );
}

function TodoApp({ isDarkMode }) {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          text: taskText.trim(),
          completed: false,
        },
      ]);
      setTaskText('');
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const styles = getStyles(isDarkMode);
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>📝 My Tasks</Text>
          <Text style={styles.subtitle}>
            {completedCount} of {tasks.length} completed
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task..."
            placeholderTextColor={isDarkMode ? '#999' : '#666'}
            value={taskText}
            onChangeText={setTaskText}
            onSubmitEditing={addTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tasks yet! 🎉</Text>
              <Text style={styles.emptySubtext}>Add one above to get started</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <TouchableOpacity
                style={styles.taskContent}
                onPress={() => toggleTask(item.id)}>
                <View
                  style={[
                    styles.checkbox,
                    item.completed && styles.checkboxChecked,
                  ]}>
                  {item.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text
                  style={[
                    styles.taskText,
                    item.completed && styles.taskTextCompleted,
                  ]}>
                  {item.text}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    },
    header: {
      padding: 20,
      paddingTop: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 14,
      color: isDarkMode ? '#aaa' : '#666',
    },
    inputContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 20,
      gap: 10,
    },
    input: {
      flex: 1,
      backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    addButton: {
      backgroundColor: '#007AFF',
      borderRadius: 12,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    addButtonText: {
      fontSize: 32,
      color: '#fff',
      fontWeight: '300',
    },
    listContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    taskItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    taskContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: isDarkMode ? '#555' : '#ddd',
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: '#34C759',
      borderColor: '#34C759',
    },
    checkmark: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    taskText: {
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
      flex: 1,
    },
    taskTextCompleted: {
      textDecorationLine: 'line-through',
      color: isDarkMode ? '#666' : '#999',
    },
    deleteButton: {
      padding: 8,
      marginLeft: 8,
    },
    deleteButtonText: {
      fontSize: 20,
    },
    emptyContainer: {
      alignItems: 'center',
      marginTop: 60,
    },
    emptyText: {
      fontSize: 24,
      color: isDarkMode ? '#666' : '#999',
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      color: isDarkMode ? '#555' : '#aaa',
    },
  });

export default App;
