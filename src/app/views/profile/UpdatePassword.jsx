
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { updatePass } from "store/actions/userActions"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useCallback } from "react"

const schema = yup.object().shape({
    oldpassword: yup.string().min(5).max(15).required(),
    newpassword: yup.string().min(5).max(15).required(),
})

function UpdatePassword() {

    // const oldpassword = useRef()
    // const newpassword = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // HANDLING ONSUBMIT ACTION:
    const handleOnSubmit = async (values) => {
        console.log("values is ->", values)
        const { oldpassword, newpassword } = values
        const dataObject = {
            oldPass: oldpassword,
            newPass: newpassword
        }
        onPasswordChangeHandler(dataObject)
    }

    const onPasswordChangeHandler = async (objectData) => {
        const data = await dispatch(updatePass(objectData))
        if (data.success === true) {
            toast.success(data.message)
            navigate('/dashboard')
        } else {
            toast.error(data.message)
        }
    }

    // INITIALIZING FORMIK HERE:
    const formik = useFormik({
        initialValues: {
            oldpassword: "",
            newpassword: "",
        },
        validationSchema: schema,
        onSubmit: handleOnSubmit,
    })

    // HANDLING VALUES:
    const setInputValue = useCallback(
        (key, value) =>
            formik.setValues({
                ...formik.values,
                [key]: value,
            }),
        [formik]
    )

    return (
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <div className="card">
                            <div className="card-body">
                                <div className="container">
                                    <h2 className='mb-5 text-center'>Update Password Form</h2>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label>Old Password</label>
                                                <div className="form-group pass_show">
                                                    <input type="password" name='oldpassword' className="form-control" placeholder="Old Password" value={formik.values.oldpassword} onChange={(e) => setInputValue("oldpassword", e.target.value)} />
                                                    <small className="text-danger mb-4">{formik.errors.oldpassword}</small>

                                                </div>
                                                <div className="form-group pass_show">
                                                    <label className="mt-3">New Password</label>
                                                    <input type="password" name='newpassword' className="form-control" placeholder="New Password" value={formik.values.newpassword} onChange={(e) => setInputValue("newpassword", e.target.value)} />
                                                    <small className="text-danger mb-4">{formik.errors.newpassword}</small>

                                                </div>
                                                {/* <label>Confirm Password</label>
                                            <div className="form-group pass_show">
                                                <input type="password" className="form-control mt-3" placeholder="Confirm Password" />
                                            </div> */}
                                                <button type="submit" className='btn btn-success mt-3 mb-3 px-4' disabled={!formik.isValid}>update</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default UpdatePassword