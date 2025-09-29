import React, { useState } from 'react';

import Todo from '../models/todo';

type TodosContextType = {
  items: Todo[],
  addTodo: (text: string) => void,
  removeTodo: (id: string) => void,
};

export const TodosContext = React.createContext<TodosContextType>({
  items: [],
  addTodo: (text: string) => {},
  removeTodo: (id: string) => {},
});

export const TodosContextProvider: React.FC = (props: any) => {
  const [ todos, setTodos ] = useState<Todo[]>([]);

  const handleAddTodo = (text: string): void => {
    setTodos(prevState => [ ...prevState, new Todo(text) ]);
  };

  const handleRemoveTodo = (id: string): void => {
    setTodos(prevState => prevState.filter(it => it.id !== id));
  };

  const context: TodosContextType = {
    items: todos,
    addTodo: handleAddTodo,
    removeTodo: handleRemoveTodo,
  };

  return (
    <TodosContext.Provider value={ context }>
      { props.children }
    </TodosContext.Provider>
  );
}