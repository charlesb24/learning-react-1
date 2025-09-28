import { useState } from 'react';

import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

export default function App() {
  const [ todos, setTodos ] = useState<Todo[]>([]);

  const handleAddTodo = (text: string): void => {
    setTodos(prevState => [ ...prevState, new Todo(text) ]);
  }

  const handleRemoveTodo = (id: string): void => {
    setTodos(prevState => prevState.filter(it => it.id !== id));
  }

  return (
    <div>
      <NewTodo onAddTodo={ handleAddTodo } />
      <Todos items={ todos } onRemoveTodo={ handleRemoveTodo } />
    </div>
  );
};
