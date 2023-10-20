import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// styles
import "./Signup.css";

// components
import toast, { Toaster } from "react-hot-toast";
import Dropdown from "../../components/Dropdown";
import typeList from "../../data/typeList";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("Select Type");
    const [name, setName] = useState("");

    // student
    const [registration_no, setRegistration_no] = useState("");
    const [branch, setBranch] = useState("");
    const [institute, setInstitute] = useState("");

    // employee
    const [employeeID, setEmployeeID] = useState("");
    const [specialization, setSpecialization] = useState("");

    // institute
    const [address, setAddress] = useState("");
    const [instituteCode, setInstituteCode] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data = {};

            data.email = email;
            data.password = password;
            data.name = name;

            switch (type) {
                case "Student":
                    data.registration_no = registration_no;
                    data.branch = branch;
                    data.institute = institute;
                    break;

                case "Faculty":
                    data.employeeID = employeeID;
                    data.qualifications_and_specializations = specialization;
                    data.institute = institute;
                    break;

                case "Institute":
                    data.address = address;
                    data.institute_code = instituteCode;
                    break;
            }

            const res = await axios.post(`/api/v1/auth/register`, data);

            if (res && res.data.success) {
                toast.success(res.data.message, {
                    duration: 5000,
                });
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <form className="signup-form">
            <h2>Sign up</h2>
            <Toaster />

            <label>
                <span>Email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>

            <label>
                <span>Password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>

            <Dropdown name={type} itemList={typeList} setItem={setType} />

            {type === "Student" && (
                <>
                    <label>
                        <span>Name:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </label>
                    <label>
                        <span>Registration Number:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setRegistration_no(e.target.value)}
                            value={registration_no}
                        />
                    </label>

                    <label>
                        <span>Branch:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setBranch(e.target.value)}
                            value={branch}
                        />
                    </label>

                    <label>
                        <span>Institute:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setInstitute(e.target.value)}
                            value={institute}
                        />
                    </label>
                </>
            )}
            {type === "Faculty" && (
                <>
                    <label>
                        <span>Name:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </label>
                    <label>
                        <span>Employee ID:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setEmployeeID(e.target.value)}
                            value={employeeID}
                        />
                    </label>

                    <label>
                        <span>Specialization:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setSpecialization(e.target.value)}
                            value={specialization}
                        />
                    </label>

                    <label>
                        <span>Institute:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setInstitute(e.target.value)}
                            value={institute}
                        />
                    </label>
                </>
            )}
            {type === "Institute" && (
                <>
                    <label>
                        <span>Name:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </label>
                    <label>
                        <span>Address:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        />
                    </label>
                    <label>
                        <span>Institute Code:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setInstituteCode(e.target.value)}
                            value={instituteCode}
                        />
                    </label>
                </>
            )}

            <button
                type="submit"
                className="btn btn-outline-success"
                onClick={handleSubmit}
            >
                Sign up
            </button>
        </form>
    );
}
