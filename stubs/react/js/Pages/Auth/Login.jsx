import { useEffect } from 'react'
import { Link, useForm } from '@inertiajs/react'
import { MailIcon, LockClosedIcon, LoginIcon } from '@heroicons/react/outline'
import Guest from '@/Layouts/Guest'
import ValidationErrors from '@/Components/ValidationErrors'
import InputIconWrapper from '@/Components/InputIconWrapper'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import Button from '@/Components/Button'
import Checkbox from '@/Components/Checkbox'

export default ({ status, canResetPassword }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    })

    useEffect(() => {
        return () => {
            reset('password')
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

        post(route('login'))
    }

    return (
        <Guest title="Log in">
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div className="grid gap-6">
                    {/* Email */}
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
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={data.email}
                                className="block w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                                withIcon
                            />
                        </InputIconWrapper>
                    </div>

                    {/* Password */}
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
                                className="block w-full"
                                autoComplete="current-password"
                                handleChange={onHandleChange}
                                withIcon
                            />
                        </InputIconWrapper>
                    </div>

                    {/* Remember */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                            <Checkbox
                                name="remember"
                                value={data.remember}
                                handleChange={onHandleChange}
                            />

                            <span className="text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-blue-500 ext-sm hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    {/* Submit */}
                    <Button
                        className="justify-center w-full gap-2"
                        processing={processing}
                    >
                        <LoginIcon aria-hidden="true" className="w-6 h-6" />
                        <span>Log in</span>
                    </Button>

                    {/* Register link */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link
                            href={route('register')}
                            className="text-blue-500 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </Guest>
    )
}
