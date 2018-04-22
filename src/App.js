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
const PARAM_PAGE = 'page=';

const DEFAULT_QUERY = "aaa" //"redux"
const DEFAULT_HPP = '2'
const PARAM_HPP = 'hitsPerPage='

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
      // result: null,
      results: null,
      searchKey: '',
      complexUser,
      searchTerm: DEFAULT_QUERY,
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    // this.onDismiss = this.onDismiss.bind(this); // 箭头函数，自动绑定
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needToSearchTopStroies = this.needToSearchTopStroies.bind(this);
    this.setSearchTopStroies = this.setSearchTopStroies.bind(this);
    this.fetchSearchTopStroies = this.fetchSearchTopStroies.bind(this);
  }
  onDismiss=(id)=>{ // 箭头函数，自动绑定

    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey];
  // onDismiss(id){
    // function isNotId(item){
    //   return item.objectID !== id
    // };
    const isNotId = item =>  item.objectID !== id;
    console.log(id);
    // const updatedList = this.state.list.filter(isNotId);
    console.log(this);
    // this.setState({list: updatedList});
    // const updatedList = this.state.result.hits.filter(isNotId);
    // this.state.result.hits = updatedList //don't do this: to change data struct
    const updatedHits = hits.filter(isNotId);
    // const updatedResult = Object.assign({}, this.state.result, updatedHits);
    // this.setState(
    //   {result: updatedResult}
    // )
    // ... 扩展操作符
    this.setState(
      // {result: { ...this.state.result, ...updatedHits}}
      {results:{
        ...results,
        [searchKey]:{hits: updatedHits, page}
      }
    }
    );
    
   
  }

  setSearchTopStroies(result){
    
    const {hits, page} = result;
    const {searchKey, results} = this.state
    // const oldHits = page !== 0 
    //   ? this.state.result.hits  
    //   : [];
      const oldHits = results && results[searchKey] 
      ? results[searchKey].hits  
      : [];
      const updatedHits = [
        ...oldHits,
        ...hits
      ];
      // this.setState({result});
      this.setState({
        // result: {hits: updatedHits, page}
        results: {
          ...results,
          [searchKey]: {hits: updatedHits, page}
        }
      });



  }

  needToSearchTopStroies(searchTerm){
    return !this.state.results[searchTerm];
  }

  fetchSearchTopStroies(searchTerm, page = 0){
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    console.info(url)
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStroies(result))
      .catch(e => e);

  }

  componentDidMount(){
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopStroies(searchTerm);

  }

  onSearchSubmit(event){
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});
    if (this.needToSearchTopStroies(searchTerm)){
    this.fetchSearchTopStroies(searchTerm);
    }
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
   const {searchTerm,results, searchKey} = this.state;
  //  const page = (result && result.page ) || 0
   const page = (results 
                && results[searchKey]
                && results[searchKey].page ) || 0;
  const list = (results && 
                results[searchKey] && 
                results[searchKey].hits) || [];

                
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

         {list &&
            <Table 
                // list = {result.hits}
                list = {list}
                // filterPattern ={searchTerm}
                onDismiss = {this.onDismiss}
              />
          
          }
          <div className="interactions">
           <Button onClick = {()=> this.fetchSearchTopStroies(searchKey, page + 1)}>
             更多
           </Button>

          </div>
         

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
