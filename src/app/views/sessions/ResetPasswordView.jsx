import { messages } from "constants/allActions";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { resetPassword } from "store/actions/userActions";

function ResetPasswordView() {

    const newPassword = useRef()
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const email = location?.state?.email

    const onFinish = () => {
        updatehandler()
    }

    const updatehandler = async () => {
        const newPasswordValue = newPassword.current.value
        const objectData = {
            email,
            newPassword: newPasswordValue
        }
        const data = await dispatch(resetPassword(objectData))
        if (data.success === true) {
            toast.success(messages.RESET_PASSWORD)
            navigate('/signin')
        }
    }

    return (
        <div className="container vh-100">
            <div className="row h-100 mt-5">
                <div className="col-sm"></div>
                <div className="col-sm"></div>
                <div className="col-sm">
                    <div className="card text-center" style={{ width: "300px" }}>
                        <div className="card-header h5 text-white bg-primary">Password Reset</div>
                        {
                            email
                                ?
                                <p className="card-text py-2">
                                    email is:{email}
                                </p>
                                :
                                <p className="card-text py-2 text-danger">
                                    GO FOR VERIFY OTP FIRST
                                </p>
                        }
                        <div className="card-body px-5">
                            <p className="card-text py-2">
                                Enter new Password
                            </p>
                            <div className="form-outline">
                                <input ref={newPassword} name="newPassword" type="password" id="passwordInput" className="form-control my-3" />
                                {/* <div>
                                    <label htmlFor="otpInput" className="text-start">Enter otp for verify</label>
                                </div> */}
                                {/* <input type="text" id="otpInput" className="form-control my-3" /> */}
                            </div>
                            <button onClick={onFinish} className="btn btn-primary w-100">update</button>
                            <div className="d-flex justify-content-between mt-4">
                                <Link to={'/signin'} className="text-primary"> Signin</Link>
                                <Link to={'/signup'} className="text-primary"> Signup</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm"></div>
                <div className="col-sm"></div>
            </div>
        </div>
    )
}

export default ResetPasswordView