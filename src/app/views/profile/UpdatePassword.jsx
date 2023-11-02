import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { updatePass } from "store/actions/userActions"

function UpdatePassword() {

    const oldpassword = useRef()
    const newpassword = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = () => {
        onPasswordChangeHandler()
    }

    const onPasswordChangeHandler = async () => {
        const objectData = {
            oldPass: oldpassword.current.value,
            newPass: newpassword.current.value
        }

        const data = await dispatch(updatePass(objectData))
        if (data.success === true) {
            toast.success(data.message)
            navigate('/dashboard')
        } else {
            toast.error(data.message)
        }
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <div className="card">
                            <div className="card-body">
                                <div className="container">
                                    <h2 className='mb-5 text-center'>Update Password Form</h2>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label>Old Password</label>
                                            <div className="form-group pass_show">
                                                <input ref={oldpassword} type="password" name='oldpassword' className="form-control mt-3" placeholder="Old Password" />
                                            </div>
                                            <label>New Password</label>
                                            <div className="form-group pass_show">
                                                <input ref={newpassword} type="password" name='newpassword' className="form-control mt-3 mb-3" placeholder="New Password" />
                                            </div>
                                            {/* <label>Confirm Password</label>
                                            <div className="form-group pass_show">
                                                <input type="password" className="form-control mt-3" placeholder="Confirm Password" />
                                            </div> */}
                                            <button onClick={onFinish} className='btn btn-success mt-3 mb-3 px-4'>update</button>
                                        </div>
                                    </div>
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