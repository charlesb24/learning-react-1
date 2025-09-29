import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import { TodosContextProvider } from './store/todos-context';

export default function App() {
  return (
    <TodosContextProvider>
      <NewTodo />
      <Todos />
    </TodosContextProvider>
  );
};
