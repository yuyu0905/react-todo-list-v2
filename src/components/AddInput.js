import Swal from 'sweetalert2';
import { addTodo } from "../services/todos.service";

function AddInput({ text, setText, getTodoList }) {
    const add = async (e) => {
      e.preventDefault();
      if (text === "") {
        Swal.fire('請輸入代辦事項內容!', '', 'error');
      } else {
        setText("");
        let item = { todo : { content: text } };
        await addTodo(item).then( (response) => {
          console.log(response);
          getTodoList();
          Swal.fire('新增成功!', '', 'success');
        })
        .catch( (error) => { 
          console.log(error.response);
          Swal.fire(error.response?.data?.message, error.response?.data?.error, 'error');
        });
      }
    };
    return (
      <div className="inputBox">
        <input
          type="text"
          placeholder="請輸入待辦事項"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <a href="#" onClick={(e) => add(e)}>
          <i className="fa fa-plus"></i>
        </a>
      </div>
    );
}

export default AddInput;