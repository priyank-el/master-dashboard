import { useRef } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { sendOtpInEmail } from "store/actions/userActions"

function ForgotPassword() {

  const [buttonText, setButtonText] = useState("send otp")
  const [type, setType] = useState(1)
  const email = useRef()
  const otp = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // SEND OTP PROCESS:
  const sendOtp = async () => {
    const object = {
      email: email?.current?.value,
      type
    }
    try {
      const data = await dispatch(sendOtpInEmail(object))
      if (data) {
        setType(2)
        setButtonText("verify otp")
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // VERIFY OTP PROCESS:
  const verifyOtp = async () => {
    const object = {
      email: email?.current?.value,
      otp: otp?.current?.value,
      type,
    }
    try {
      const data = await dispatch(sendOtpInEmail(object))
      console.log("data is -> ", data);

      if (data.success === true) {
        toast.success(data.message)
        navigate('/reset-password', {
          state: {
            email: email.current.value
          }
        })
      }
      else {
        // console.log("error is -> ", JSON.stringify(data.error.response.data.error));
        toast.error(data.error.response.data.error)
      }
    } catch (error) {
      // toast.error(error.res)
    }
  }

  // ONCLICK HANDLER:
  const onFinish = () => {
    if (type === 1) {
      sendOtp()
    }
    else {
      verifyOtp()
    }
  }

  return (
    <div class="container vh-100">
      <div class="row h-100 mt-5">
        <div class="col-sm"></div>
        <div class="col-sm"></div>
        <div class="col-sm">
          <div class="card text-center" style={{ width: "300px" }}>
            <div class="card-header h5 text-white bg-primary">Password Reset</div>
            <div class="card-body px-5">
              <p class="card-text py-2">
                Enter your registerd email for get otp
              </p>
              <div class="form-outline">
                {
                  type === 2
                    ?
                    <input readOnly type="email" ref={email} name="email" id="typeEmail" class="form-control my-3" />
                    :
                    <input type="email" ref={email} name="email" id="typeEmail" class="form-control my-3" />
                }
                <div>
                  <label htmlFor="otpInput" className="text-start">Enter otp for verify</label>
                </div>
                {
                  type === 1
                    ?
                    <input readOnly type="text" id="otpInput" class="form-control my-3" />
                    :
                    <input ref={otp} name="otp" type="text" id="otpInput" class="form-control my-3" />
                }
              </div>
              <button onClick={onFinish} class="btn btn-primary w-100">{buttonText}</button>
              <div class="d-flex justify-content-between mt-4">
                <Link to={'/signin'} className="text-primary"> Signin</Link>
                <Link to={'/signup'} className="text-primary"> Signup</Link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm"></div>
        <div class="col-sm"></div>
      </div>
    </div>
  )
}

export default ForgotPassword