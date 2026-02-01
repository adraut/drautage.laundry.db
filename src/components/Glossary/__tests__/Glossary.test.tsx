import { render, screen } from '@testing-library/react';
import Glossary from '../Glossary';

describe('Glossary', () => {
  it('renders the glossary heading', () => {
    render(<Glossary />);
    
    expect(screen.getByRole('heading', { name: 'Glossary' })).toBeInTheDocument();
  });

  it('renders all glossary terms', () => {
    render(<Glossary />);
    
    expect(screen.getByText('Enzymes')).toBeInTheDocument();
    expect(screen.getByText('Surfactants')).toBeInTheDocument();
    expect(screen.getByText('Optical Brighteners')).toBeInTheDocument();
    expect(screen.getByText('pH Level')).toBeInTheDocument();
    expect(screen.getByText('Hard Water')).toBeInTheDocument();
    expect(screen.getByText('HE (High Efficiency)')).toBeInTheDocument();
  });

  it('renders term definitions', () => {
    render(<Glossary />);
    
    expect(screen.getByText(/Biological catalysts that break down/)).toBeInTheDocument();
    expect(screen.getByText(/Surface-active agents that reduce/)).toBeInTheDocument();
    expect(screen.getByText(/Fluorescent compounds that absorb/)).toBeInTheDocument();
  });
});
