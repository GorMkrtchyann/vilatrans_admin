import {Link} from "react-router-dom";
import {Images} from "../../assets/images/Images";
import {useForm} from "react-hook-form";


export const Login = () => {
    const {handleSubmit, register} = useForm()

    const Submit = (data) => {
        console.log(data)
    }

    return(
        <div className="page-wrapper" id="main-wrapper">
            <div
                className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-8 col-lg-6 col-xxl-3">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <Link to="/"
                                       className="text-nowrap logo-img text-center d-block py-3 w-100">
                                        <img src={Images.logo} width="180" alt="" />
                                    </Link>
                                    <p className="text-center">Welcome to admin panel</p>
                                    <form onSubmit={handleSubmit(Submit)}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                {...register('name')}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                {...register('password')}
                                            />
                                        </div>
                                        <button className={'btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2'}>Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}