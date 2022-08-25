import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import Side from "./Side";
import { signIn } from "../services/users.service";

function Login() {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async(user) => {
        let data =  { user };
        
        await signIn(data).then( (response) => {
            console.log(response);
            Swal.fire(response.data?.message, '', 'success');

            localStorage.setItem('token', response.headers.authorization);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/todo', { replace: true });
        })
        .catch( (error) => { 
            console.log(error.response);
            Swal.fire(error.response.data?.error, '', 'error');
        });
    }

    return (
        <div id="loginPage" className="bg-yellow">
            <div className="conatiner loginPage vhContainer ">
                <Side />
                <div>
                    <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                        <label className="formControls_label" for="email">Email</label>
                        <input className="formControls_input" type="text" id="email" name="email" 
                            {...register("email", { required: {value : true, message: "此欄位不可留空"} })} placeholder="請輸入 email" />
                        <span>{errors.email?.message}</span>

                        <label className="formControls_label" for="pwd">密碼</label>
                        <input className="formControls_input" type="password" name="password" id="password" 
                            {...register("password", { required: {value : true, message: "此欄位不可留空"} })} placeholder="請輸入密碼" />
                            <span>{errors.password?.message}</span>

                        <input className="formControls_btnSubmit" type="submit" value="登入" />
                        <Link className="formControls_btnLink" to="/signUp">註冊帳號</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;