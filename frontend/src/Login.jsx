import { useState } from "react";
import { useAuth } from "./auth/auth_helpers";
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';

export default function Login() {
    let { signIn } = useAuth();
    let navigate = useNavigate();
    let location = useLocation();

    let state = location.state;
    let from = state ? state.from.pathname : "/";

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required")
    });

    const onSubmit = async (credentials) => {
        console.log("DONE");
        const response = await signIn(credentials.email, credentials.password, () => { });
        response.success ? navigate(from, { replace: true }) : alert(response.message);
    };
    
    return (
<>
<marquee><h5>This site has been created using MERN Stack</h5></marquee>
<div className="justify-content-center"><h1>Welcome to Shoply</h1>
<h5 style={{color:"red"}}>Unleash your style</h5></div>
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
            <div>
                <div className="form-wrapper">
                    
                    <Formik initialValues={formValues} onSubmit={onSubmit} enableReinitialize validationSchema={validationSchema}>
                        <Form>
                            <FormGroup>
                                <FormLabel>Email</FormLabel>
                                <Field name="email" type="email" className="form-control" />
                                <ErrorMessage name="email" className='d-block invalid-feedback' component="span" />
                            </FormGroup><br></br>
                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <Field name="password" type="password" className="form-control" />
                                <ErrorMessage name="password" className='d-block invalid-feedback' component="span" />
                            </FormGroup><br></br>
                            <Button variant='success' size="lg" block="block" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
        </>
    );
}
