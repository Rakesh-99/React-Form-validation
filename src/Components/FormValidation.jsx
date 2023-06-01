import React, { useState, useEffect } from 'react';
import './FormValidation.css';

const FormValidation = () => {



    const initialState = {

        username: '',
        email: '',
        password: ''
    };

    const [userInfo, setUserInfo] = useState(initialState);
    const [error, setError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const changeHandle = (e) => {

        let { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const submitHandle = (event) => {
        event.preventDefault();
        setError(validation(userInfo));
        setIsSubmit(true);


    

    };

    useEffect(() => {
        if (Object.keys(error).length === 0 && isSubmit) {
            console.log(userInfo)
        }
    }, [error])


    const validation = (values) => {

        const err = {};

        const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


        // Username Validation : 
        if (!values.username) {
            err.username = 'Username field can not be empty';
        } else if (values.username.length < 2) {
            err.username = 'Username must be at least two char';
        } else if (values.username.length > 20) {
            err.username = 'Username can not be more than 15 char';
        };
        // Email Validation : 

        if (!values.email) {
            err.email = 'Email field can not be empty';
        } else if (!regx.test(values.email)) {
            err.email = 'Please enter a valid email';
        };

        // Password Validation : 

        if (!values.password) {
            err.password = 'Password field can not be empty';
        } else if (values.password.length < 5) {
            err.password = 'Password must contain 6 char';
        } else if (values.password.length > 10) {
            err.password = 'Password can not be more than 10 char';
        };

        return err;
    };



    return (
        <>


            <div className='container'>
                <div className='message-container'>
                    {
                        (Object.keys(error).length === 0 && isSubmit) ? <div className='success'>Sign in successful</div> :
                            <pre>{JSON.stringify(userInfo, undefined, 2)}</pre>
                    }
                </div>
                <div className="formContainer" >
                    <form action="" style={{ display: 'flex', flexDirection: 'column' }} onSubmit={submitHandle}>

                        <input type="text" name='username' placeholder='Username' onChange={changeHandle} />
                        <p style={{ color: 'red', fontSize: '14px' }}>{error.username}</p>

                        <input type="text" name='email' placeholder='Email' onChange={changeHandle} />
                        <p style={{ color: 'red', fontSize: '14px' }}>{error.email}</p>

                        <input type="password" name='password' placeholder='password' onChange={changeHandle} />
                        <p style={{ color: 'red', fontSize: '14px' }}>{error.password}</p>

                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );

};
export default FormValidation;