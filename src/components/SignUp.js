import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import Side from "./Side";
import { users } from "../services/users.service";

function SignUp () {
    let navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async(user) => {
        let data =  { user };
        
        await users(data).then( (response) => {
            console.log(response);
            Swal.fire(response.data?.message, '', 'success');
            navigate('/', { replace: true });
        })
        .catch( (error) => { 
            console.log(error.response);
            Swal.fire(error.response?.data?.message, error?.response?.data?.error.join('<br>'), 'error');
        });
    }

    return (
    <div id="signUpPage" className="bg-yellow">
        <div className="conatiner signUpPage vhContainer">
            <Side />
            <div>
                <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="formControls_txt">註冊帳號</h2>
                    <label className="formControls_label" for="email">Email</label>
                    <input className="formControls_input" type="text" id="email" name="email" 
                        {...register("email", { required: {value : true, message: "此欄位不可留空"} })} placeholder="請輸入 email" />
                    <span>{errors.email?.message}</span>
                    
                    <label className="formControls_label" for="name">您的暱稱</label>
                    <input className="formControls_input" type="text" name="name" id="name" {...register("nickname")} placeholder="請輸入您的暱稱" />

                    <label className="formControls_label" for="pwd">密碼</label>
                    <input className="formControls_input" type="password" name="password" id="password" 
                        {...register("password", { required: {value : true, message: "此欄位不可留空"} })} placeholder="請輸入密碼" />
                        <span>{errors.password?.message}</span>
                    
                    <label className="formControls_label" for="pwd2">再次輸入密碼</label>
                    <input className="formControls_input" type="password" name="pwd2" id="pwd2" 
                        {...register("pwd2", { 
                            required: {value : true, message: "此欄位不可留空"}, 
                            validate: (value) => {
                            if (watch('password') !== value) {
                              return "兩次密碼輸入不同";
                            }
                          } })} placeholder="請再次輸入密碼" />
                        <span>{errors.pwd2?.message}</span>

                    <input className="formControls_btnSubmit" type="submit" value="註冊帳號" />
                        <Link className="formControls_btnLink" to="/">登入</Link>
                </form>
            </div>
        </div>

    </div>
    )
}

export default SignUp;