import React from "react";
import { shallow } from 'enzyme';
import { Logo } from './Logo';

describe('Logo component', () => {
  it('Renders without crashing', () => {
    const size = { width: 300, height: 300 };
    const wrapper = shallow(<Logo {...size} />);
    expect(wrapper.find(`[height=${size.height}]`)).toHaveLength(1);
    expect(wrapper.find(`[width=${size.width}]`)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('Change logo opacity', () => {
    const props = { width: 300, height: 300, opacity: 0.3 };
    const wrapper = shallow(<Logo {...props} />);
    expect(wrapper.find(`[opacity=${props.opacity}]`)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('Renders with classname', () => {
    const props = { width: 300, height: 300, className: 'my-class' };
    const wrapper = shallow(<Logo {...props} />);
    expect(wrapper.hasClass(props.className)).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
