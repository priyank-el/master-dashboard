import { messages } from "constants/allActions"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { updateAdminProfileData, uploadFile } from "store/actions/userActions"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useCallback } from "react"

const schema = yup.object().shape({
    name: yup.string().min(5).required(),
    email: yup.string().email().required(),
    mobile: yup.string().min(10).max(10).required(),
    address: yup.string().required(),
})

function UpdateAdminProfile() {

    const location = useLocation()
    const user = location.state.user
    const [selectedFile, setSelectedFile] = useState(null)
    const [userObject, setUserObject] = useState(user)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const onImageChangeHandler = (e) => {
        setSelectedFile(e.target.files[0])
    }

    // // ONCLICK HANDLER:
    // const onFinish = () => {
    //     updateProfile()
    // }

    // ACTION FOR UPDATE PROFILE:
    const updateProfile = (objectData) => {

        const formData = new FormData();
        formData.append('image', selectedFile);
        // console.log("file data -> ", selectedFile);
        // console.log("form data -> ", formData);

        uploadFileHandler(formData, objectData)

    }

    const uploadFileHandler = async (objectData, data2) => {
        const data = await dispatch(uploadFile(objectData))
        if (data.success === true) {
            const image = data.data.file_name
            console.log("image is -> ", image);
            // toast.success(data.message)

            addUpdatedData(image, data2)
        }
        else {
            const image = ""
            addUpdatedData(image, data2)
        }
    }

    const addUpdatedData = async (image, data3) => {

        const objectData =
            image === ""
                ?
                {
                    name: data3.name,
                    email: data3.email,
                    mobile: data3.mobile,
                    address: data3.address
                }
                :
                {
                    name: data3.name,
                    email: data3.email,
                    mobile: data3.mobile,
                    address: data3.address,
                    image
                }

        const data = await dispatch(updateAdminProfileData(objectData))
        if (data.success === true) {
            toast.success(messages.UPDATE_PROFILE)
            navigate('/dashboard')
        }
    }

    // INITIALIZING FORMIK HERE:
    const formik = useFormik({
        initialValues: {
            name: userObject?.name ? userObject?.name : "",
            email: userObject?.email ? userObject?.email : "",
            mobile: userObject?.mobile ? userObject?.mobile : "",
            address: userObject?.address ? userObject?.address : "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            const objectData = {
                name: values.name,
                email: values.email,
                mobile: values.mobile,
                address: values.address
            }
            console.log("data is ->", values);
            updateProfile(objectData)

        },
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
                            <form onSubmit={formik.handleSubmit}>
                                <div className="card-body">
                                    <div className="row mb-3 mt-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input name="name" type="text" className="form-control" value={formik.values.name} onChange={(e) => setInputValue("name", e.target.value)} />
                                            <small className="text-danger">{formik.errors.name}</small>

                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input name="email" type="text" className="form-control" value={formik.values.email} onChange={(e) => setInputValue("email", e.target.value)} />
                                            <small className="text-danger">{formik.errors.email}</small>

                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input name="mobile" type="text" className="form-control" value={formik.values.mobile} onChange={(e) => setInputValue("mobile", e.target.value)} />
                                            <small className="text-danger">{formik.errors.mobile}</small>

                                        </div>
                                    </div>
                                    {/* <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Mobile</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value="(320) 380-4539" />
                                    </div>
                                </div> */}
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input name="address" type="text" className="form-control" value={formik.values.address} onChange={(e) => setInputValue("address", e.target.value)} />
                                            <small className="text-danger">{formik.errors.address}</small>

                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Update Image</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input onChange={onImageChangeHandler} type="file" id="formFile" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mt-5 mb-3">
                                        <div className="col-sm-3"></div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="submit" className="btn btn-success px-4" value="Save Changes" />
                                            <input onClick={() => navigate('/profile')} type="button" className="btn btn-danger px-4 ms-3" value="cancel" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default UpdateAdminProfile
