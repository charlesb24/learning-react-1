import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('<Greeting /> component', () => {

  test('renders hello world as a heading', () => {
    render(<Greeting />);

    const text = screen.getByRole('heading', { name: /hello world/i });

    expect(text).toBeInTheDocument();
  });

});
