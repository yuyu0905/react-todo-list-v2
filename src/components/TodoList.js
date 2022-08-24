import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddInput from "./AddInput";
import TodoItem from "./TodoItem";
import empty from "../images/empty-bg.png";
import Swal from 'sweetalert2';
import { signOut } from "../services/users.service";
import { todos, deleteTodo } from "../services/todos.service";

function TodoList() {
    let navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem("user")));
    const [text, setText] = useState("");
    const [todoState, setTodoState] = useState("all");
    const [stateList] = useState([
      {
        todoState: "all",
        content: "全部"
      },
      {
        todoState: "active",
        content: "待完成"
      },
      {
        todoState: "completed",
        content: "已完成"
      }
    ]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getTodoList();
    }, [  ]);

    const getTodoList = async () => {
        await todos().then( (response) => {
            console.log(response);
            setData(response.data?.todos);
        })
        .catch( (error) => { 
            console.log(error);
            Swal.fire(error.response?.data?.message, "", 'error');
        });
    }
  
    const filterTodo = () => {
      if (todoState === "completed")
        return data.filter((item) => item.completed_at);
      else if (todoState === "active")
        return data.filter((item) => !item.completed_at);
      else return data;
    };

    const changeState = (e, item) => {
        e.preventDefault();
        setTodoState(item.todoState);
    } 

    const clearAll = async(e) => {
        e.preventDefault();
        Swal.fire({
            title: '確定要清除已完成項目?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '確認',
            cancelButtonText: '取消',
        }).then((result) => {
            if (result.isConfirmed) {
                removeTodos();
                Swal.fire('清除成功!', '', 'success');
            }
        });
    }

    const logout = async(e) => {
        e.preventDefault();
        await signOut().then( (response) => {
            console.log(response);
            localStorage.clear();
            Swal.fire(response.data?.message, '', 'success');
            navigate('/', { replace: true });
        })
        .catch( (error) => { 
            console.log(error);
            Swal.fire(error.response?.data?.message, "", 'error');
        });
    }

    const removeTodo = async(item, deleteType = "single") => {
        await deleteTodo(item.id).then( (response) => {
            console.log(response);
            if(deleteType === "single") {
                getTodoList();
                Swal.fire(response.data?.message, '', 'success');
            }
        })
        .catch( (error) => { 
            console.log(error);
            Swal.fire(error.response?.data?.message, "", 'error');
        });
    }

    const removeTodos = async () => {
        const needDeletes = data.filter((item) => item.completed_at).map(item => {
            return new Promise(async resolve => {
                await removeTodo(item, "many");
                resolve();
            });
        });
        await Promise.all(needDeletes);
        getTodoList();
    }

    return (
        <div id="todoListPage" className="bg-half">
            <nav>
                <h1><Link to="/">ONLINE TODO LIST</Link></h1>
                <ul>
                    <li className="todo_sm"><a href="#"><span>{user.nickname} 的代辦</span></a></li>
                    <li>
                        <a href="/" onClick={(e) => logout(e) }>登出</a>
                    </li>
                </ul>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <AddInput text={text} setText={setText} getTodoList={getTodoList} />
                    { data.length > 0 ?
                    (<div className="todoList_list">
                        <ul className="todoList_tab">
                            {stateList.map((item, i) => {
                                return (
                                <li key={i}>
                                    <a href="#" className={todoState === item.todoState ? "active" : ""}
                                        onClick={(e) => changeState(e, item)} >
                                    {item.content}
                                    </a>
                                </li>
                                );
                            })}
                        </ul>
                        <div className="todoList_items">
                            <ul className="todoList_item">
                                {filterTodo().map((item, i) => {
                                    return (
                                        <li key={i}>
                                            <TodoItem item={item} data={data} setData={setData} getTodoList={getTodoList} removeTodo={removeTodo}/>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="todoList_statistics">
                                <p>
                                    {data.filter((item) => !item.completed_at).length} 個待完成項目
                                </p>
                                <a href="#" onClick={(e) => clearAll(e) }>
                                    清除已完成項目
                                </a>
                            </div>
                        </div>
                    </div>) :
                    (
                        <div className="empty">
                            <p>目前尚無待辦事項</p>
                            <img src={empty} alt="empty"/>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
  }

  export default TodoList;