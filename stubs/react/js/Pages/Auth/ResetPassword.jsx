import { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import Guest from '@/Layouts/Guest'
import ValidationErrors from '@/Components/ValidationErrors'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import Button from '@/Components/Button'

export default ({ token, email }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('password.store'))
    }

    return (
        <Guest title="Reset Password">
            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div className="grid gap-6">
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
                        />
                    </div>

                    <div className="space-y-2">
                        <Label forInput="password" value="Password" />

                        <Input
                            icon="tabler--lock"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            className="block w-full mt-1"
                            autoComplete="new-password"
                            isFocused={true}
                            handleChange={onHandleChange}
                            withIcon
                        />
                    </div>

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
                            autoComplete="new-password"
                            handleChange={onHandleChange}
                        />
                    </div>

                    <Button
                        className="justify-center w-full"
                        processing={processing}
                        text="Reset Password"
                    />
                </div>
            </form>
        </Guest>
    )
}
