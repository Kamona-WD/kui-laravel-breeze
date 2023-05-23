import { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { MailIcon, LockClosedIcon } from '@heroicons/react/outline'
import Guest from '@/Layouts/Guest'
import ValidationErrors from '@/Components/ValidationErrors'
import InputIconWrapper from '@/Components/InputIconWrapper'
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

                        <InputIconWrapper
                            icon={
                                <MailIcon
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                />
                            }
                        >
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={data.email}
                                className="block w-full mt-1"
                                autoComplete="username"
                                handleChange={onHandleChange}
                                withIcon
                            />
                        </InputIconWrapper>
                    </div>

                    <div className="space-y-2">
                        <Label forInput="password" value="Password" />

                        <InputIconWrapper
                            icon={
                                <LockClosedIcon
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                />
                            }
                        >
                            <Input
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
                        </InputIconWrapper>
                    </div>

                    <div className="space-y-2">
                        <Label
                            forInput="password_confirmation"
                            value="Confirm Password"
                        />

                        <InputIconWrapper
                            icon={
                                <LockClosedIcon
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                />
                            }
                        >
                            <Input
                                type="password"
                                name="password_confirmation"
                                placeholder="Confirm Password"
                                value={data.password_confirmation}
                                className="block w-full mt-1"
                                autoComplete="new-password"
                                handleChange={onHandleChange}
                                withIcon
                            />
                        </InputIconWrapper>
                    </div>

                    <Button
                        className="justify-center w-full"
                        processing={processing}
                    >
                        Reset Password
                    </Button>
                </div>
            </form>
        </Guest>
    )
}
