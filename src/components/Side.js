import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import workImg from "../images/workImg.png";

function Side () {
    return (
        <div className="side">
            <Link to="/"><img className="logoImg" src={logo} alt="logo" /></Link>
            <img className="d-m-n" src={workImg} alt="workImg" />
        </div>
    )
}

export default Side;