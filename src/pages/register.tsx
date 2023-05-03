import HomeLayout from '@/layout/home'
import { RegisterForm } from '@/components/user/register'

const Register = () => {
    return (
        <HomeLayout>
            <>
                <h1>Register</h1>
                <div>
                    <RegisterForm />
                </div>
            </>
        </HomeLayout>
    )
}

export default Register
