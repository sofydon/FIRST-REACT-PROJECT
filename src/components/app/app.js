import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [
        {name: 'John S.', salary: 800, increase:false, rise:true, id:1},
        {name: 'Alex M.', salary: 1000, increase:true, rise:false, id:2},
        {name: 'Carl W.', salary: 5000, increase:false, rise:false, id:3}
      ],
      term: '',
      filter: 'rise'
    }
    this.maxId = 4;
  }

  deleteItem = (id)=>{
    this.setState(({data}) => {
      //const index = data.findIndex(elem => elem.id === id)
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name,salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    })
  }

  onToggleProp = (id, prop) => {
    // this.setState(({data})=> {
    //   const index = data.findIndex(elem => elem.id === id);
    //   const old = data[index];
    //   const newItem = {...old, increase: !old.increase};
    //   const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
    //   return {
    //     data: newArr
    //   }
    // })
    this.setState(({data})=> ({
      data: data.map(item =>{
        if(item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  }

  // onToggleRise = (id) => {
  //   this.setState(({data})=> ({
  //     data: data.map(item => {
  //       if(item.id === id) {
  //         return {...item, rise: !item.rise}
  //       }
  //       return item;
  //     })
  //   }))
  // }
  searchEmp = (items, term) => {
    if(term.length === 0){
      return items;
    }
    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  onFilterEmp = (items, filter) => {
    switch(filter) {
        case 'rise':
          return items.filter(item => item.rise);
        case 'more than 1000':
          return items.filter(item => item.salary > 1000);
        default: 
          return items
    }
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.onFilterEmp(this.searchEmp(data, term), filter);
    
    return (
      <div className="app">
          <AppInfo 
          employees={employees}
          increased={increased}/>
  
          <div className="search-panel">
              <SearchPanel
              onUpdateSearch={this.onUpdateSearch}/>
              <AppFilter/>
          </div>
          
          <EmployeesList 
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}/>
          <EmployeesAddForm
          onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
