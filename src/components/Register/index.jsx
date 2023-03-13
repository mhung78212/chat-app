import React from "react";

function Register() {
    return (
        <>
            <div className="container">
                <div className="wrapper">
                    <h1 className="title">Đăng ký tài khoản</h1>
                    <form action="">
                        <input type="text" placeholder="Tên đăng nhập"/>
                        <input type="text" placeholder="Email"/>
                        <input type="password" placeholder="Mật khẩu"/>
                        <button>Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
