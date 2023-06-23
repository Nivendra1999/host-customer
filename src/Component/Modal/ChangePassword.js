import { Link, useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const navigate = useNavigate();
    const resetpasswordpage = () => {
        navigate("/changePassword")
    }
    return <>
        <div
            className="modal fade"
            id="exampleModal2"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <a data-bs-dismiss="modal" aria-label="Close" onClick={resetpasswordpage} id="passwordlink">Change Password</a>
                    </div>
                    <button
                        className="btn btn-secondary m-2"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>

                </div>
            </div>
        </div>
    </>

}