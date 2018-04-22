import React from 'react';
import ReactDOM from 'react-dom';
import App, {Search} from './App';
import renderer from 'react-test-renderer';


describe('App', ()=>{
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });
  test('存在错误快照',()=>{
    const component = renderer.create(
      <App/>
    );
    let tree = component.toJSON;
    expect(tree).toMatchSnapshot;

  })

});

