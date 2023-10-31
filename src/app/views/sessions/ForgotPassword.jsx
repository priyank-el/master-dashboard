import { useState } from "react"
import { Link } from "react-router-dom"

function ForgotPassword() {

  const [buttonText, setButtonText] = useState("send otp")

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
                <input type="email" id="typeEmail" class="form-control my-3" />
                <div>
                  <label htmlFor="otpInput" className="text-start">Enter otp for verify</label>
                </div>
                <input type="text" id="otpInput" class="form-control my-3" />
              </div>
              <a href="#" class="btn btn-primary w-100">{buttonText}</a>
              <div class="d-flex justify-content-between mt-4">
                <Link className="text-primary"> Login</Link>
                <Link className="text-primary"> Register</Link>
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