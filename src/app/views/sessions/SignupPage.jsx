import { useRef } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { registerAdmin } from "store/actions/userActions"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { Formik } from 'formik'
import * as yup from 'yup'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().min(5).required()
})

function SignupPage() {

    // HANDLING ONSUBMIT ACTION:
    const handleOnSubmit = async (values) => {
        const { name, email, password } = values
        const dataObject = {
            name,
            email,
            password
        }
        createAdmin(dataObject)
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const createAdmin = async (objectdata) => {
        try {
            console.log("object data is -> ", objectdata);
            const data = await dispatch(registerAdmin(objectdata))
            // console.log("data is -> ", data.response.data.error);
            if (data.success === true) {
                toast.success(data.message)
                navigate('/signin')
            }
            else {
                console.log(data);
                if (data.error.response.status === 400) {
                    toast.error("admin already exist with this email")
                }
            }
        } catch (error) {
            console.log("error is ->", error)
        }
    }

    return (
        <section className="vh-100" style={{ "backgroundColor": "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ "borderRadius": "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <Formik
                                            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                                            validationSchema={schema}
                                            validate={values => {

                                                const errors = {};
                                                if (!values.name) errors.name = 'name is required.'
                                                if (!values.email) errors.email = 'email is required.'
                                                if (!values.password) errors.password = 'password is required.'
                                                if (values.confirmPassword !== values.password) errors.confirmPassword = 'confirmPassword not match.'

                                                return errors;
                                            }}
                                            onSubmit={(values) => {
                                                handleOnSubmit(values)
                                            }}
                                        >{({
                                            values,
                                            errors,
                                            touched,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit
                                        }) => (
                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            name="name"
                                                            className="form-control"
                                                            value={values.name}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange} />
                                                        <small className="text-danger">{errors.name && touched.name && errors.name}</small>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                        <input
                                                            type="email"
                                                            id="form3Example3c"
                                                            name="email"
                                                            className="form-control"
                                                            value={values.email}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange} />
                                                        <small className="text-danger">{errors.email && touched.email && errors.email}</small>

                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                        <input
                                                            type="password"
                                                            id="form3Example4c"
                                                            name="password"
                                                            className="form-control"
                                                            value={values.password}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange} />
                                                        <small className="text-danger">{errors.password && touched.password && errors.password}</small>

                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                                        <input
                                                            type="password"
                                                            id="form3Example4cd"
                                                            name="confirmPassword"
                                                            className="form-control"
                                                            value={values.confirmPassword}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange} />
                                                        <small className="text-danger">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</small>
                                                    </div>
                                                </div>

                                                {/* <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div> */}

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary" >Register</button>
                                                </div>
                                                <Link to={'/signin'} className="text-primary">Already have an account</Link>
                                            </form>
                                        )}
                                        </Formik>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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

export default SignupPage