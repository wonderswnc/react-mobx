import React from 'react';
import { observable, autorun, computed } from 'mobx';
import { observer } from 'mobx-react';
import './MobxReact.less';

@observer
class MobxReact extends React.Component {

  @observable todoList = observable.array();
  @observable currentTodoIndex = null;

  constructor() {
    super();
    this.colorMap = {
      working: 'rgb(183, 241, 136)',
      complete: 'rgb(211, 99, 142)'
    }
  }

  componentDidMount() {
    Array.isArray(this.getShowDate()) &&
    this.getShowDate().forEach(item => this.todoList.push(item));
    autorun(() => this.saveDate());
  }

  saveDate = () => {
    window.localStorage.setItem('todo', JSON.stringify(this.todoList.toJS()));
  }

  getShowDate = () => JSON.parse(window.localStorage.getItem('todo'));

  addTodo = () => {
    const value = this.input.value;
    if (value === '') {
      return false;
    }
    this.todoList.push({
      id: (Math.ceil(Math.random() + Math.random())) * 1000 * Math.random() * 100,
      text: value,
      status: 'working'
    });
    this.input.value = '';
  }

  completeTodo = completeId => {
    this.todoList.some(({id}, index) => {
      if ( completeId === id) {
        this.todoList[index].status = 'complete';
        return true;
      }
      return false;
    })
  }

  deleteTodo = deleteId => {
    this.todoList.some(({id}, index) => {
      if (deleteId === id) {
        this.todoList.splice(index, 1);
        return true;
      }
      return false;
    })
  }

  render() {
    return (
      <div className='content'>
        <div className='ctrl-area'>
          <input  onKeyDown= {event => event.keyCode === 13 && this.addTodo()}
                  type="text" ref={input => this.input = input}/>
          <button onClick={this.addTodo}>添加</button>
        </div>
        <div className='todo-list'>
          {this.todoList.length > 0 && <h5>待办事项 : </h5>}
          <ul className='todo-content'>
            {
              this.todoList.map(({text, id, status}) => 
              <li key={id} style={{backgroundColor: this.colorMap[status]}}>
                {text}
                {
                  status === 'working' ?
                  <div className='change-status'>
                    <span onClick={() => this.completeTodo(id)}>完成</span>
                  </div> :
                  <div className='change-status'>
                    <span onClick={() => this.deleteTodo(id)}>删除</span>
                  </div>
                }
              </li>)
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default MobxReact;