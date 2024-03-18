import { useState } from "react";
import { useDispatch } from "react-redux";
// import { changePassword } from "../redux/apiRequest";

const ChangePassword = ({ onCancelPasswordForm, onPasswordChanged }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const dispatch = useDispatch();

    const token = localStorage.getItem("ACCESS_TOKEN");

    const [formErrors, setFormErrors] = useState({
        oldPassword: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [formSuccessMessage, setFormSuccessMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const userPassword = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword,
        };

        // Perform form validation
        const currentPasswordRequired = oldPassword.trim() === "";
        const newPasswordRequired = newPassword.trim() === "";
        const confirmPasswordRequired = confirmNewPassword.trim() === "";

        setFormErrors({
            oldPassword: currentPasswordRequired,
            newPassword: newPasswordRequired,
            confirmNewPassword: confirmPasswordRequired,
        });

        if (currentPasswordRequired || newPasswordRequired || confirmPasswordRequired) {
            setFormErrorMessage("Please fill in all required fields.");
            setFormSuccessMessage("");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setFormErrorMessage("Confirm password failed. Try again.");
            setFormSuccessMessage("");
            return;
        }

        // Call the API request function passing the necessary data
        // changePassword(userPassword, dispatch, token);

        // Clear the form fields
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");

        // Invoke the callback function if provided
        if (onPasswordChanged) {
            onPasswordChanged();
        }

        // Invoke the onCancelPasswordForm function to close the form
        if (onCancelPasswordForm) {
            onCancelPasswordForm();
        }

        // Reset form errors and messages
        setFormErrors({
            oldPassword: false,
            newPassword: false,
            confirmNewPassword: false,
        });
        setFormErrorMessage("");
        setFormSuccessMessage("Password changed successfully.");
    };

    const handleCancel = () => {
        if (onCancelPasswordForm) {
            onCancelPasswordForm();
        }

        // Clear the form fields
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");

        // Reset form errors and messages
        setFormErrors({
            oldPassword: false,
            newPassword: false,
            confirmNewPassword: false,
        });
        setFormErrorMessage("");
        setFormSuccessMessage("");
    };

    return (
        <div className="password-form-overlay">
            <form className="password-form" onSubmit={handleSubmit}>
                <h3 className="text-center">Mật khẩu</h3>
                <div className="mb-3 mt-3 content">
                    <label htmlFor="oldPassword" className="form-label">
                        Mật khẩu cũ:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    {formErrors.oldPassword && (
                        <div className="text-danger">Hãy nhập mật khẩu cũ của bạn.</div>
                    )}
                </div>
                <div className="mb-3 content">
                    <label htmlFor="newPassword" className="form-label">
                        Mật khẩu mới:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {formErrors.newPassword && (
                        <div className="text-danger">Hãy nhập mật khẩu mới của bạn.</div>
                    )}
                </div>
                <div className="mb-3 content">
                    <label htmlFor="confirmNewPassword" className="form-label">
                        Xác nhận mật khẩu:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    {formErrors.confirmNewPassword && (
                        <div className="text-danger">Hãy xác nhận mật khẩu của bạn.</div>
                    )}
                </div>
                {formErrorMessage && <div className="text-danger">{formErrorMessage}</div>}
                {formSuccessMessage && <div className="text-success">{formSuccessMessage}</div>}
                <div className="button-container">
                    <button type="button" className="btn-primary" style={{ marginRight: "10px" }} onClick={handleCancel}>
                        Huỷ
                    </button>
                    <button type="submit" className="btn-primary" >
                        Xác nhận
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
