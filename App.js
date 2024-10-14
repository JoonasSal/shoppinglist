import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { db } from './firebase';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [item, setItem] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('shoppinglist').onSnapshot(snapshot => {
      setShoppingList(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
    });

    return unsubscribe;
  }, []);

  const addItem = () => {
    if (item.length > 0) {
      db.collection('shoppinglist').add({ name: item });
      setItem('');
    }
  };

  const removeItem = (id) => {
    db.collection('shoppinglist').doc(id).delete();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping list</Text>
      <TextInput
        style={styles.input}
        placeholder="Add new item..."
        value={item}
        onChangeText={text => setItem(text)}
      />
      <Button title="Add" onPress={addItem} />
      <FlatList
        data={shoppingList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.data.name}</Text>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Ionicons name="trash" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});