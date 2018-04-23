import React from 'react';
import ReactDOM from 'react-dom';
import App, {Search, Button,Table} from './App';
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

describe('Search',()=>{
 it ('renders without crashing',()=>{
   const div = document.createElement('div');
   ReactDOM.render(<Search>Search</Search>,div)
 })
 test('验证快照',()=>{
   const component = renderer.create(
     <Search>search</Search>
   );
   let tree = component.toJSON;
   expect(tree).toMatchSnapshot;

 });

});

describe('Button',()=>{
  it ('renders without crashing',()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Button>Search</Button>,div)
  })
  test('验证快照',()=>{
    const component = renderer.create(
      <Button>search</Button>
    );
    let tree = component.toJSON;
    expect(tree).toMatchSnapshot;
 
  });
 
 });

 describe('Table',()=>{
   const props = {
     list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '1', num_comments: 1, points: 2, objectID: 'yy' }

     ]
   }
    
  it ('renders without crashing',()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Table { ...props}></Table>,div)
  })
  test('验证快照',()=>{
    const component = renderer.create(
      <Table { ...props}></Table>
    );
    let tree = component.toJSON;
    expect(tree).toMatchSnapshot;
 
  });
 
 });
