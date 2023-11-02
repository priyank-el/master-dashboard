import { messages } from "constants/allActions"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { updateAdminProfileData, uploadFile } from "store/actions/userActions"

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

    // ONCLICK HANDLER:
    const onFinish = () => {
        updateProfile()
    }

    // ACTION FOR UPDATE PROFILE:
    const updateProfile = () => {

        const formData = new FormData();
        formData.append('image', selectedFile);
        // console.log("file data -> ", selectedFile);
        // console.log("form data -> ", formData);

        uploadFileHandler(formData)

    }

    const uploadFileHandler = async (objectData) => {
        const data = await dispatch(uploadFile(objectData))
        if (data.success === true) {
            const image = data.data.file_name
            console.log("image is -> ", image);
            // toast.success(data.message)

            addUpdatedData(image)
        }
    }

    const addUpdatedData = async (image) => {
        const objectData = {
            name: userObject.name,
            email: userObject.email,
            mobile: userObject.mobile,
            address: userObject.address,
            image
        }

        const data = await dispatch(updateAdminProfileData(objectData))
        if (data.success === true) {
            toast.success(messages.UPDATE_PROFILE)
            navigate('/dashboard')
        }
    }

    const onValueChangeHandler = (e) => {
        const value = e.target.value
        const name = e.target.name
        console.log("Enter here -> ", value);
        console.log("Enter here -> ", name);
        setUserObject({
            ...userObject,
            [name]: value,
        })
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input name="name" onChange={onValueChangeHandler} type="text" className="form-control" value={userObject?.name} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input name="email" onChange={onValueChangeHandler} type="text" className="form-control" value={userObject?.email} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Phone</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input name="mobile" onChange={onValueChangeHandler} type="text" className="form-control" value={userObject?.mobile} />
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
                                        <input name="address" onChange={onValueChangeHandler} type="text" className="form-control" value={userObject?.address} />
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
                                        <input type="button" onClick={onFinish} className="btn btn-success px-4" value="Save Changes" />
                                        <input onClick={() => navigate('/profile')} type="button" className="btn btn-danger px-4 ms-3" value="cancel" />
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

export default UpdateAdminProfile
