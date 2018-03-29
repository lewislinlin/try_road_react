import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: "1mm1",
    url: "12",
    author: "12",
    point: "1",
    objectID: "12",
  },
  {
    title: "ammms",
    url: "as",
    author: "as",
    point: "as",
    objectID: "as",
  },
]
const complexUser = {user: "name", age: 112};

function isSearched(searchTerm){
   return function(item){
    //  do 
    // return true;
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
   }
}

class App extends Component {

  
  constructor(props){
    
    super(props);
    this.state = {
      list,
      complexUser,
      searchTerm: '',
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    // this.onDismiss = this.onDismiss.bind(this); // 箭头函数，自动绑定
  }
  onDismiss=(id)=>{ // 箭头函数，自动绑定
  // onDismiss(id){
    // function isNotId(item){
    //   return item.objectID !== id
    // };
    const isNotId = item =>  item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    console.log(this);
    this.setState({list: updatedList});
  }

  onSearchChange(event){
    console.log(event.target.value);
    this.setState({searchTerm: event.target.value})

  }

  render() {

    var helloWorld = "欢迎来到react世界"

    // console.info("hot change 2 3 4 6 b");
   const {searchTerm,list} = this.state;
    return (
      <div className="App"  >
          {/* <form>
            <input
             type="text"
             value={searchTerm}
             onChange={this.onSearchChange}
            
            />
          </form>

          {
            list.filter(isSearched(searchTerm)).map( item =>{
              // this.state.list.filter(isSearched(this.state.searchTerm)).map( item =>{

              // const onHanderDismiss = ()=>
              //   this.onDismiss(item.objectID);
                
          
              return(
              <div key={item.objectID}>
                <span>{item.title} </span>
                <span>{item.author}</span>
                <span>
                  <button
                    onClick={()=>{this.onDismiss(item.objectID)}}
                    // onClick={this.onDismiss(item.objectID)}// 立即执行
                    // onClick={this.onDismiss}// 点击执行，但不传参
                    // onClick={onHanderDismiss}
                    type="button"
                  
                  ></button>
                </span>
                
              </div>
              )

            } 
          )} */}

          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
          
          />

          <Table 
            list = {list}
            filterPattern ={searchTerm}
            onDismiss = {this.onDismiss}
          
          />

        <h2>{helloWorld} </h2>
        <h3>年龄：{this.state.complexUser.age}, 名字zzz：{this.state.complexUser.user} </h3>
      </div>
    );
  }
}

class Search extends Component {
  render(){
    const {value, onChange } = this.props;
    return(
      <form>
        <input
        type="text"
        value={value}
        onChange={onChange}
        
        />
      </form>
      );
  }
}

class Table extends Component{
  render(){
    const {list, filterPattern, onDismiss} = this.props;
    return(
      <div>
      {list.filter(isSearched(filterPattern)).map( item =>
       
        <div key={item.objectID}>
          <span>{item.title} </span>
          <span>{item.author}</span>
          <span>
            <button
              onClick={()=>{onDismiss(item.objectID)}}
              type="button"
            
            >
            dismiss
            </button>
          </span>
          
        </div>
     
    )}
  </div>
  )
  }

}

export default App;
