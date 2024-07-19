/**
 * Signin Firebase
 */

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { emailrgx } from "../constant";
import Axios from "axios";

const schema = yup
	.object({
		name: yup.string().required("Name is required"),
		lastName: yup.string().required("Last Name is required"),
		email: yup.string().matches(emailrgx, "Email is required").required("Email is required").trim(),
		password: yup.string().min(8).max(25).required("Password is required").trim(),
		repeatPassword: yup.string().min(8).max(25).required("Confirm Password is required").trim(),
		mobileNo: yup.string().required("Contact No is required"),
		role: yup.string().required("Role is required")
	})
	.required();

const Registrationpage = (props) => {
	/**
	 * On User Login
	 */
	const history = useHistory();
	const [eye, seteye] = useState(true);
	const [eye2, seteye2] = useState(true);
	const [emailerror, setEmailError] = useState("");
	const [nameerror, setNameError] = useState("");
	const [passworderror, setPasswordError] = useState("");
	const [formgroup, setFormGroup] = useState("");
	const [inputValues, setInputValues] = useState({
		email: "",
		password: ""
	});

	// registration states
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [role, setRole] = useState("");

	const [posts, setPosts] = useState([]);
	const {
		handleSubmit,
		control,
		setError,
		clearErrors,
		formState: { errors }
	} = useForm({ resolver: yupResolver(schema) });

	// const [datas, setDatas] = useState([]);
	const onSubmit = (data) => {
		if (data.password != data.passwordConfirm) {
			setError("password", {
				message: "Incorrect Password"
			});
		} else {
			clearErrors("password");
			props.history.push("login");
		}
	};
	const onEyeClick = () => {
		seteye(!eye);
	};
	const onEye2Click = () => {
		seteye2(!eye2);
	};
	const onUserLogin = (e) => {
		e.preventDefault();

		if (this.state.email !== "" && this.state.password !== "") {
			this.props.signinUserInFirebase(this.state, this.props.history);
		}
	};

	const onApplyJob = (e) => {
		e.preventDefault();
		localStorage.removeItem("jobview");
		this.props.history.push("/applyjob/joblist");
	};

	const submit = (e) => {
		e.preventDefault();
		const formData = {
			name: name,
			lastName: lastName,
			email: email,
			password: password,
			password_confirm: passwordConfirm,
			mobileNo: mobileNo,
			role: role
		};

		Axios.post(baseApiUrl + "/api/register", formData)
			.then((res) => {
				console.log(res.data);
				history.push("/login");
			})
			.catch((err) => console.log(err));
	};
	const { loading } = props;
	return (
		<>
			<Helmet>
				<title>Register - Sheranwala Developer</title>
				<meta name="description" content="Login page" />
			</Helmet>
			<div className="account-content">
				<Link to="/applyjob/joblist" className="btn btn-primary apply-btn">
					Apply Job
				</Link>
				<div className="container">
					{/* Account Logo */}
					<div className="account-logo">
						<Link to="/app/main/dashboard">
							<img src={Applogo} alt="Dreamguy's Technologies" />
						</Link>
					</div>
					{/* /Account Logo */}
					<div className="account-box">
						<div className="account-wrapper">
							<h3 className="account-title">Register</h3>
							<p className="account-subtitle">Access to our dashboard</p>
							{/* Account Form */}
							<div>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="form-group">
										<label>Name</label>
										<Controller
											name="name"
											control={control}
											render={() => (
												<input
													className={`form-control  ${errors?.name ? "error-input" : ""}`}
													type="text"
													value={name}
													onChange={(e) => setName(e.target.value)}
													autoComplete="false"
												/>
											)}
										/>
										<small>{errors?.name?.message}</small>
									</div>
									<div className="form-group">
										<label>Last Name</label>
										<Controller
											name="name"
											control={control}
											render={() => (
												<input
													className={`form-control  ${errors?.name ? "error-input" : ""}`}
													type="text"
													value={lastName}
													onChange={(e) => setLastName(e.target.value)}
													autoComplete="false"
												/>
											)}
										/>
										<small>{errors?.lastName?.message}</small>
									</div>
									<div className="form-group">
										<label>Email</label>
										<Controller
											name="email"
											control={control}
											render={() => (
												<input
													className={`form-control  ${errors?.email ? "error-input" : ""}`}
													type="text"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													autoComplete="false"
												/>
											)}
										/>
										<small>{errors?.email?.message}</small>
									</div>

									<div className="form-group">
										<label>Password</label>
										<Controller
											name="password"
											control={control}
											render={() => (
												<div className="pass-group">
													<input
														type={eye ? "password" : "text"}
														className={`form-control  ${errors?.password ? "error-input" : ""}`}
														value={password}
														onChange={(e) => setPassword(e.target.value)}
														autoComplete="false"
													/>
													<span
														onClick={onEyeClick}
														className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye"}`}
													/>
												</div>
											)}
										/>
										<small>{errors?.password?.message}</small>
									</div>

									<div className="form-group">
										<label>Repeat Password</label>
										<Controller
											name="repeatPassword"
											control={control}
											render={() => (
												<div className="pass-group">
													<input
														type={eye2 ? "password" : "text"}
														className={`form-control  ${errors?.repeatPassword ? "error-input" : ""}`}
														value={passwordConfirm}
														onChange={(e) => setPasswordConfirm(e.target.value)}
														autoComplete="false"
													/>
													<span
														onClick={onEye2Click}
														className={`fa toggle-password" ${eye2 ? "fa-eye-slash" : "fa-eye"}`}
													/>
												</div>
											)}
										/>
										<small>{errors?.repeatPassword?.message}</small>
									</div>
									<div className="form-group">
										<label>Contact No</label>
										<Controller
											name="name"
											control={control}
											render={() => (
												<input
													className={`form-control  ${errors?.name ? "error-input" : ""}`}
													type="text"
													value={mobileNo}
													onChange={(e) => setMobileNo(e.target.value)}
													autoComplete="false"
												/>
											)}
										/>
										<small>{errors?.mobileNo?.message}</small>
									</div>
									<div className="form-group">
										<label>Role</label>
										<Controller
											name="name"
											control={control}
											render={() => (
												<input
													className={`form-control  ${errors?.name ? "error-input" : ""}`}
													type="text"
													value={role}
													onChange={(e) => setRole(e.target.value)}
													autoComplete="false"
												/>
											)}
										/>
										<small>{errors?.role?.message}</small>
									</div>
									<div className="form-group text-center">
										<button className="btn btn-primary account-btn" type="submit" onClick={submit}>
											Register
										</button>
									</div>
								</form>
								<div className="account-footer">
									<p>
										Already have an account? <Link to="/login">Login</Link>
									</p>
								</div>
							</div>
							{/* /Account Form */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Registrationpage;
