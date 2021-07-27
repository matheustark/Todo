import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [doneTask, setDoneTask] = useState(false);

  function handleAddTask(newTaskTitle: string) {
    console.log(newTaskTitle)
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: doneTask
    }
    setTasks(oldState => [...oldState, task])
  }

  function handleToggleTaskDone(id: number) {
    let taskDone: Task[] = tasks.map(
      task => {if (task.id === id) {
        task.done = !task.done
      }
      return task;
    })
    setTasks(taskDone)
    
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(
      task => task.id !== id
    ))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})