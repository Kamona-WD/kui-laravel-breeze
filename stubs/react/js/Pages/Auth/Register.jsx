import { useEffect } from 'react'
import { Link, useForm } from '@inertiajs/react'
import Guest from '@/Layouts/Guest'
import ValidationErrors from '@/Components/ValidationErrors'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import Button from '@/Components/Button'

export default () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('register'))
    }

    return (
        <Guest title="Register">
            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div className="grid gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label forInput="name" value="Name" />

                        <Input
                            icon="tabler--user"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={data.name}
                            autoComplete="name"
                            isFocused={true}
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label forInput="email" value="Email" />

                        <Input
                            icon="tabler--mail"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={data.email}
                            autoComplete="username"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label forInput="password" value="Password" />

                        <Input
                            icon="tabler--lock"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            autoComplete="new-password"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    {/* Password confirmation */}
                    <div className="space-y-2">
                        <Label
                            forInput="password_confirmation"
                            value="Confirm Password"
                        />

                        <Input
                            icon="tabler--lock"
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            value={data.password_confirmation}
                            className="block w-full mt-1"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        className="justify-center w-full gap-2"
                        processing={processing}
                        startIcon="tabler--user-plus"
                        text="Register"
                    />

                    {/* Login link */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </Guest>
    )
}
