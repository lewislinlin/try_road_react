import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {

    var helloWorld = "欢迎来到react世界"

    const complexUser = {user: "hot change 2 3 4 sss7", age: 112}

    const list = [
      {
        title: "11",
        url: "12",
        author: "12",
        point: "1",
        objectID: "12",
      },
      {
        title: "as",
        url: "as",
        author: "as",
        point: "as",
        objectID: "as",
      },
    ]

    // console.info("hot change 2 3 4 6 b");

    return (
      <div className="App"  >
          {
            list.map( item =>

              <div key={item.objectID}>
                <span>{item.title} </span>
                <span>{item.author}</span>
                
              </div>
             
          )
          }

        <h2>{helloWorld} </h2>
        <h3>年龄：{complexUser.age}, 名字zzz：{complexUser.user} </h3>
      </div>
    );
  }
}

export default App;
