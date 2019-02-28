import React from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import api from '../utils/api';
import { addTodo } from '../actions';

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 0
        }
        this.submitTodo = this.submitTodo.bind(this)
    }
    componentDidMount() {
        console.log(api)
        console.log(this.props.todos)
    }

    submitTodo() {
        this.props.addTodo(
            this.state.todoText
        )
    }
    handleChange(key, e) {
        this.setState({
            [key]: e.target.value
        })
    }

    render() {
        const todoArr = this.props.todos.map(item =>
            <li key={item.id}>
                {item.text}
            </li>
        );
        return <div>
            <h1>Hello,Yue!</h1>
            <input onChange={this.handleChange.bind(this, 'todoText')} placeholder="请输入待办事项" /> <button onClick={() => this.submitTodo()}>提交</button>
            {todoArr}
        </div>
    }
}

Test.propTypes = {
    submitTodo: PropTypes.func
}
const mapStateToProps = state => ({
    todos: state.todo
})

export default connect(mapStateToProps, { addTodo })(Test)