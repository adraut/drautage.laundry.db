import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterBar } from '../FilterBar';

describe('FilterBar', () => {
  it('should render when isVisible is true', () => {
    render(<FilterBar onClick={() => {}} isVisible={true} />);

    expect(screen.getByRole('button', { name: 'Open filters' })).toBeInTheDocument();
    expect(screen.getByText('FILTERS')).toBeInTheDocument();
  });

  it('should not render when isVisible is false', () => {
    render(<FilterBar onClick={() => {}} isVisible={false} />);

    expect(screen.queryByRole('button', { name: 'Open filters' })).not.toBeInTheDocument();
    expect(screen.queryByText('FILTERS')).not.toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<FilterBar onClick={handleClick} isVisible={true} />);

    const button = screen.getByRole('button', { name: 'Open filters' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<FilterBar onClick={handleClick} isVisible={true} />);

    const button = screen.getByRole('button', { name: 'Open filters' });
    button.focus();
    await user.keyboard('{Enter}');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when Space key is pressed', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<FilterBar onClick={handleClick} isVisible={true} />);

    const button = screen.getByRole('button', { name: 'Open filters' });
    button.focus();
    await user.keyboard(' ');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have proper accessibility attributes', () => {
    render(<FilterBar onClick={() => {}} isVisible={true} />);

    const button = screen.getByRole('button', { name: 'Open filters' });
    expect(button).toHaveAttribute('tabIndex', '0');
    expect(button).toHaveAttribute('aria-label', 'Open filters');
  });
});
