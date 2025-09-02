import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import useTheme from "@/hooks/useTheme";
import { useQuery, useMutation } from "convex/react";
import {api} from "@/convex/_generated/api";
//import { Link } from "expo-router";
export default function Index() {
  const {toggleDarkMode} = useTheme();

  const todo = useQuery(api.todos.getTodos);
  console.log(todo);

  const addTodo = useMutation(api.todos.addTodo);

  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  return (
    <View style={styles.container} >
      <Text style={styles.content}>Edit app/index.tsx to edit this screen123.</Text>
    
       <TouchableOpacity onPress={toggleDarkMode}><Text>Toggle Mode</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => addTodo({ text: "New Todo" })}><Text>Add a new todo</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => clearAllTodos()}><Text>Clear All Todos</Text></TouchableOpacity>
    </View>

  );
}

const styles= StyleSheet.create({
  container: {
    flex: 1, //column direction
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  content:{
    color:"#000",
    fontSize:20
  }
});