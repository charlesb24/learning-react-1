import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greeting from './Greeting';

describe('<Greeting /> component', () => {

  test('renders hello world as a heading', () => {
    render(<Greeting />);

    const text = screen.getByRole('heading', { name: /hello world/i });

    expect(text).toBeInTheDocument();
  });

  test('renders `good to see you` if the button was not clicked', () => {
    render(<Greeting />);

    const beforeClick = screen.getByText('good to see you', { exact: false });

    expect(beforeClick).toBeInTheDocument();
  });

  test('renders `Changed!` if the button was clicked', async () => {
    render(<Greeting />);

    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    const afterClick = screen.getByText('Changed!');

    expect(afterClick).toBeInTheDocument();
  });

  test('does not render `good to see you` if the button was clicked', async () => {
    render(<Greeting />);

    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    const afterClick = screen.queryByText('good to see you', { exact: false });

    expect(afterClick).not.toBeInTheDocument();
  });

});
