import Todos from './components/Todos';

export default function App() {
  return (
    <div>
      <Todos items={["Learn React", "Learn TypeScript", "Learn to use TypeScript in React projects"]} />
    </div>
  );
}
