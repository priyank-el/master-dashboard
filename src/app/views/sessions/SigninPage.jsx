import { Link } from "react-router-dom"

function SigninPage() {
  return (
    <section className="vh-100" style={{ "backgroundColor": "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ "borderRadius": "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

                    <form className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="email" id="form3Example3c" className="form-control" />
                          <label className="form-label" htmlFor="form3Example3c">Registered Email</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4c" className="form-control" />
                          <label className="form-label" htmlFor="form3Example4c">Password</label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="button" className="btn btn-primary">Login</button>
                      </div>
                      <Link className="text-primary font-weight-bold">Forgot password</Link>
                      <div>
                        <Link className="text-secondary text-decoration-underline font-weight-bold">Create account first!!</Link>
                      </div>
                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img style={{ borderRadius: "20px", height: "400px", width: "400px" }} src="data:image/jpeg;base64,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"
                      className="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SigninPage