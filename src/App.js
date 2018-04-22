import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// const list = [
//   {
//     title: "1mm1",
//     url: "12",
//     author: "12",
//     point: "1",
//     objectID: "12",
//   },
//   {
//     title: "ammms",
//     url: "as",
//     author: "as",
//     point: "as",
//     objectID: "as",
//   },
// ]
const complexUser = {user: "name", age: 112};
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const DEFAULT_QUERY = "aaa" //"redux"

// const url = PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + DEFAULT_QUERY


// function isSearched(searchTerm){
//    return function(item){
//     //  do 
//     // return true;
//     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//    }
// }

class App extends Component {

  
  constructor(props){
    
    super(props);
    this.state = {
      result: null,
      complexUser,
      searchTerm: DEFAULT_QUERY,
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    // this.onDismiss = this.onDismiss.bind(this); // 箭头函数，自动绑定
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopStroies = this.setSearchTopStroies.bind(this);
    this.fetchSearchTopStroies = this.fetchSearchTopStroies.bind(this);
  }
  onDismiss=(id)=>{ // 箭头函数，自动绑定
  // onDismiss(id){
    // function isNotId(item){
    //   return item.objectID !== id
    // };
    const isNotId = item =>  item.objectID !== id;
    console.log(id);
    // const updatedList = this.state.list.filter(isNotId);
    console.log(this);
    // this.setState({list: updatedList});
    const updatedList = this.state.result.hits.filter(isNotId);
    // this.state.result.hits = updatedList //don't do this: to change data struct
    const updatedHits = {hits: updatedList};
    // const updatedResult = Object.assign({}, this.state.result, updatedHits);
    // this.setState(
    //   {result: updatedResult}
    // )
    // ... 扩展操作符
    this.setState(
      {result: { ...this.state.result, ...updatedHits}}
    )
    
   
  }

  setSearchTopStroies(result){
    this.setState({result});

  }

  fetchSearchTopStroies(searchTerm){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStroies(result))
      .catch(e => e);

  }

  componentDidMount(){
    const {searchTerm} = this.state;
    this.fetchSearchTopStroies(searchTerm);

  }

  onSearchSubmit(event){
    const {searchTerm} = this.state;
    this.fetchSearchTopStroies(searchTerm);
    // console.info(searchTerm);
    event.preventDefault();
  }

  onSearchChange(event){
    // console.log(event.target.value);
    this.setState({searchTerm: event.target.value})

  }

  render() {

    var helloWorld = "欢迎来到react世界"

    // console.info("hot change 2 3 4 6 b");
  //  const {searchTerm,list} = this.state;
   const {searchTerm,result} = this.state;
  //  if (!result) { 
  //    return  "返回空"; //null;
  //  }

    return (
      <div className="page"  >

       <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit = {this.onSearchSubmit} 
          >
           Search222
          </Search>
          </div>

          {result 
           ? <Table 
                list = {result.hits}
                // filterPattern ={searchTerm}
                onDismiss = {this.onDismiss}
              />
           : null
          }

         {result &&
            <Table 
                list = {result.hits}
                // filterPattern ={searchTerm}
                onDismiss = {this.onDismiss}
              />
          
          }
         

        <h2>{helloWorld} </h2>
        <h3>年龄：{this.state.complexUser.age}, 名字zzz：{this.state.complexUser.user} </h3>
      </div>
    );
  }
}

// class Search extends Component {
//   render(){
//     const {value, onChange, children } = this.props;
//     return(
//       <form>
        
//         <input
//         type="text"
//         value={value}
//         onChange={onChange}
        
//         />
//         {children}
//       </form>
//       );
//   }
// }

function Search({value,onChange,onSubmit,children}){
  // const {value,onChange,children} = props
  return(
    <form onSubmit = {onSubmit}>
       {/* {children} */}
       <input
        type="text"
        value={value}
        onChange={onChange}
        />
        <button type="submit"> 
          {children}
        </button>
   </form>
  );
}
const smallColumn={width: "10%"};
const Table = ({list, onDismiss})=>
  // render(){
    // const {list, filterPattern, onDismiss} = this.props;
    
    // return(
      <div className="table">
      {/* {list.filter(isSearched(filterPattern)).map( item => */}
        {list.map( item =>
       
        <div key={item.objectID} className="table-row">
          <span style={{width: '40%' }}>{item.title} </span>
          <span style={{width: '40%' }}>{item.author}</span>
          <span style={{smallColumn }}>
            {/* <button
              onClick={()=>{onDismiss(item.objectID)}}
              type="button"
            
            >
            dismiss
            </button> */}
            <Button
            onClick={()=>{onDismiss(item.objectID)}}
            className="button-inline"
            >
            dismissButton
            </Button>
          </span>
          
        </div>
     
    )}
  </div>
  // )
  // }



// class Button extends Component{
//   render(){
//     const {
//       onClick,
//        className='',
//         children,
//       } = this.props;
 
//     return(
//       <button
//         onClick = {onClick}
//         className = {className}
//         type = "button" 
      
//       >
//         {children}
//       </button>
//     )
//   }

// }

const Button = (
  {
  onClick,
   className='',
    children
  })=>{
//  do somthing
 
    return(
      <button
        onClick = {onClick}
        className = {className}
        type = "button" 
      
      >
        {children}
      </button>
    )
  

}
export default App;
