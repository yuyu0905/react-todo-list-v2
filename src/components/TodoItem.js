import Swal from 'sweetalert2';
import { toggleTodo } from "../services/todos.service";

function TodoItem({ item, getTodoList, removeTodo }) {
  const remove = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '確定要刪除此代辦事項?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.isConfirmed) {
        removeTodo(item);
      }
    });
  };

  const changeItem = (item) => {
    toggleTodo(item.id).then( (response) => {
      console.log(response);
      getTodoList();
      Swal.fire('狀態更新成功!', '', 'success');
    })
    .catch( (error) => { 
        console.log(error);
        Swal.fire(error.response?.data?.message, "", 'error');
    })
  }

  return (
    <>
      <label className="todoList_label">
        <input
          className="todoList_input"
          type="checkbox"
          value={item.completed_at ? item.completed_at : ""}
          checked={item.completed_at ? "checked" : ""}
          onChange={() => { changeItem(item)}}
        />
        <span>{item.content}</span>
      </label>
      <a href="#" onClick={(e) => remove(e)} >
        <i className="fa fa-times"></i>
      </a>
    </>
  );
}

export default TodoItem;