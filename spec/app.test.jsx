import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/js/components/container/app.jsx';


Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('should display a title', () => {
    const wrapper = shallow(<App />);
    const title = wrapper.find('div h1');
    expect(title).toBeDefined();
  });

  it('should display an image', () => {
    const wrapper = shallow(<App />);
    const image = wrapper.find('div img');
    expect(image).toBeDefined();
  });

  it('should display a list', () => {
    const wrapper = shallow(<App />);
    const list = wrapper.find('div ul li');
    expect(list).toBeDefined();
  });

});