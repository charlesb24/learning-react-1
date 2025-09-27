import Todos from './components/Todos';
import Todo from './models/todo';

export default function App() {
  const todos: Todo[] = [
    new Todo("Learn React"),
    new Todo("Learn TypeScript"),
    new Todo("Learn to use TypeScript in React projects"),
  ];

  return (
    <div>
      <Todos items={ todos }/>
    </div>
  );
};
