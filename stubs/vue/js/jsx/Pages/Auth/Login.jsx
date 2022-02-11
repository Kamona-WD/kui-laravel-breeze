import { defineComponent, withModifiers } from 'vue';
import { Link, useForm } from '@inertiajs/inertia-vue3';
import { MailIcon, LockClosedIcon, LoginIcon } from '@heroicons/vue/outline';
import InputIconWrapper from '@/Components/InputIconWrapper';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';

export default defineComponent({
    props: {
        canResetPassword: Boolean,
        status: String,
    },

    setup(props) {
        const form = useForm({
            email: '',
            password: '',
            remember: false,
        });

        const submit = () => {
            form.post(route('login'), {
                onFinish: () => form.reset('password'),
            });
        };

        return () => (
            <GuestLayout title="Log in">
                <ValidationErrors class="mb-4" />

                {props.status && (
                    <div class="mb-4 font-medium text-sm text-green-600">
                        {props.status}
                    </div>
                )}

                <form onSubmit={withModifiers(submit, ['prevent'])}>
                    <div class="grid gap-6">
                        {/* Email */}
                        <div class="space-y-2">
                            <Label for="email" value="Email" />
                            <InputIconWrapper
                                v-slots={{
                                    icon: () => (
                                        <MailIcon
                                            aria-hidden="true"
                                            class="w-5 h-5"
                                        />
                                    ),
                                }}
                            >
                                <Input
                                    withIcon
                                    id="email"
                                    type="email"
                                    class="block w-full"
                                    placeholder="Email"
                                    v-model={form.email}
                                    required
                                    autofocus
                                    autocomplete="username"
                                />
                            </InputIconWrapper>
                        </div>

                        {/* Password */}
                        <div class="space-y-2">
                            <Label for="password" value="Password" />
                            <InputIconWrapper
                                v-slots={{
                                    icon: () => (
                                        <LockClosedIcon
                                            aria-hidden="true"
                                            class="w-5 h-5"
                                        />
                                    ),
                                }}
                            >
                                <Input
                                    withIcon
                                    id="password"
                                    type="password"
                                    class="block w-full"
                                    placeholder="Password"
                                    v-model={form.password}
                                    required
                                    autocomplete="current-password"
                                />
                            </InputIconWrapper>
                        </div>

                        {/* Remember */}
                        <div class="flex items-center justify-between">
                            <label class="flex items-center">
                                <Checkbox
                                    name="remember"
                                    v-model:checked={form.remember}
                                />
                                <span class="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>

                            {props.canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    class="text-sm text-blue-500 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>

                        {/* Submit */}
                        <div>
                            <Button
                                class="justify-center gap-2 w-full"
                                disabled={form.processing}
                            >
                                {({ iconSizeClasses }) => (
                                    <>
                                        <LoginIcon
                                            aria-hidden="true"
                                            class={iconSizeClasses}
                                        />
                                        <span>Log in</span>
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Register link */}
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link
                                href={route('register')}
                                class="text-blue-500 hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </GuestLayout>
        );
    },
});
