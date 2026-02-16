import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from '../Drawer';

describe('Drawer', () => {
  it('should not be visible when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={() => { }}>
        <div>Drawer content</div>
      </Drawer>
    );

    const drawer = screen.getByRole('dialog');
    expect(drawer).not.toHaveClass('drawer-open');
    expect(screen.queryByText('Drawer content')).toBeInTheDocument();
  });

  it('should be visible when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={() => { }}>
        <div>Drawer content</div>
      </Drawer>
    );

    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveClass('drawer-open');
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('should display the title when provided', () => {
    render(
      <Drawer isOpen={true} onClose={() => { }} title="Test Title">
        <div>Drawer content</div>
      </Drawer>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Drawer isOpen={true} onClose={onClose}>
        <div>Drawer content</div>
      </Drawer>
    );

    const closeButton = screen.getByLabelText('Close drawer');
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Drawer isOpen={true} onClose={onClose}>
        <div>Drawer content</div>
      </Drawer>
    );

    const backdrop = document.querySelector('.drawer-backdrop') as Element;
    expect(backdrop).toBeInTheDocument();

    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not render backdrop when drawer is closed', () => {
    render(
      <Drawer isOpen={false} onClose={() => { }}>
        <div>Drawer content</div>
      </Drawer>
    );

    const backdrop = document.querySelector('.drawer-backdrop');
    expect(backdrop).not.toBeInTheDocument();
  });

  it('should call onClose when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Drawer isOpen={true} onClose={onClose}>
        <div>Drawer content</div>
      </Drawer>
    );

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when Escape is pressed and drawer is closed', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Drawer isOpen={false} onClose={onClose}>
        <div>Drawer content</div>
      </Drawer>
    );

    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });
});
