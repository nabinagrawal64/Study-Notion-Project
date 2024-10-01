import Template from "../components/core/Auth/Template";
import signupImg from "../assets/image/signup.webp";

function SignUp() {
    return (
        <Template
            title="join the millions learning to code with Study Nation for free"
            desc1="Build skills for today, tommorow and beyond"
            desc2="Education to furute-proof your career"
            image={signupImg}
            formType="signup"
        />
    );
}

export default SignUp;

