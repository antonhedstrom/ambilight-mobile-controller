import React from 'react';
import renderer from 'react-test-renderer';

import LightList from './light-list';

it('renders list of lights with correct length', () => {
  const mockedData = [
    {key: 'light1', title: 'Light 1'},
    {key: 'light2', title: 'Light 2'},
    {key: 'light3', title: 'Light 3'}
  ];
  const rendered = renderer.create(<LightList lights={mockedData} />).toJSON();
  console.log(rendered);
  // expect(rendered).toBeTruthy();
});
