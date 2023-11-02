import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getProfileData } from 'store/actions/userActions'

function AdminProfileView() {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        getdata()
    }, [])

    const getdata = async () => {
        setLoading(true)
        const data = await dispatch(getProfileData())
        if (data.success === true) {
            // console.log("data is ->", data);
            setUser(data.data)
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <><h1 className='text-center'>Loading...</h1></>
        )
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                            <div className="row g-0">
                                <div className="col-md-4 gradient-custom text-center text-white"
                                // style={{"border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;"}}
                                >
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                        alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />

                                    <i className="far fa-edit mb-5"></i>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <h6>Information</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Email</h6>
                                                <p className="text-muted">{user?.email}</p>
                                            </div>
                                            {
                                                user?.mobile &&
                                                <div className="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p className="text-muted">{user?.mobile}</p>
                                                </div>
                                            }
                                        </div>
                                        <h6>Projects</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Recent</h6>
                                                <p className="text-muted">Lorem ipsum</p>
                                            </div>
                                            {
                                                user?.address &&
                                                <div className="col-6 mb-3">
                                                    <h6>Location</h6>
                                                    <p className="text-muted">{user?.address}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="d-flex justify-content-start">
                                            <button onClick={() => navigate('/update-profile', {
                                                state: {
                                                    user
                                                }
                                            })} className='btn btn-secondary'>update profile</button>
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

export default AdminProfileView