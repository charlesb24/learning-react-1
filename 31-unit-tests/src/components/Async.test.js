import { render, screen } from '@testing-library/react';

import Async from './Async';

describe('<Async /> component', () => {

  test('renders posts if request succeeds', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }],
    });

    render(<Async />);

    const posts = await screen.findAllByRole('listitem');

    expect(posts).not.toHaveLength(0);
  });

});