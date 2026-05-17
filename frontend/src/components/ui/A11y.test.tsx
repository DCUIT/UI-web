import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button';
import Input from './Input';
import Table from './Table';

expect.extend(toHaveNoViolations);

describe('Accessibility Audit', () => {
  test('Button should not have a11y violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Input should not have a11y violations', async () => {
    const { container } = render(
      <div>
        <label htmlFor="test-input">Email</label>
        <Input id="test-input" placeholder="Enter email" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Table should not have a11y violations', async () => {
    const columns = [
      { key: 'name' as const, header: 'Name' },
      { key: 'role' as const, header: 'Role' }
    ];
    const data = [{ name: 'John', role: 'Admin' }];
    const { container } = render(<Table data={data} columns={columns} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});