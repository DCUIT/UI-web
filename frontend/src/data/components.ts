import type { Component } from '@/types/component';

export const componentsData: Component[] = [
  {
    id: 1,
    name: 'Button',
    category: 'UI',
    description: 'Primary and secondary button styles for your interface.',
    source: '<Button variant="primary">Primary</Button>',
  },
  {
    id: 2,
    name: 'Input',
    category: 'Form',
    description: 'A styled form input with focus ring and dark mode support.',
    source: '<Input placeholder="Enter your email" />',
  },
  {
    id: 3,
    name: 'Card',
    category: 'Layout',
    description: 'A subtle card container with glassy shadows and rounded corners.',
    source: '<Card>Card content goes here</Card>',
  },
];

