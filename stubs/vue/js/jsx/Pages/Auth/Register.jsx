import { defineComponent, withModifiers } from 'vue';
import { Link, useForm } from '@inertiajs/inertia-vue3';
import {
    UserIcon,
    MailIcon,
    LockClosedIcon,
    UserAddIcon,
} from '@heroicons/vue/outline';
import GuestLayout from '@/Layouts/Guest';
import InputIconWrapper from '@/Components/InputIconWrapper';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import Button from '@/Components/Button';

export default defineComponent({
    setup() {
        const form = useForm({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            terms: false,
        });

        const submit = () => {
            form.post(route('register'), {
                onFinish: () => form.reset('password', 'password_confirmation'),
            });
        };

        return () => (
            <GuestLayout title="Register">
                <ValidationErrors class="mb-4" />
                <form onSubmit={withModifiers(submit, ['prevent'])}>
                    <div class="grid gap-6">
                        {/* Name */}
                        <div class="space-y-2">
                            <Label for="name" value="Name" />
                            <InputIconWrapper
                                v-slots={{
                                    icon: () => (
                                        <UserIcon
                                            aria-hidden="true"
                                            class="w-5 h-5"
                                        />
                                    ),
                                }}
                            >
                                <Input
                                    withIcon
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    class="block w-full"
                                    v-model={form.name}
                                    required
                                    autofocus
                                    autocomplete="name"
                                />
                            </InputIconWrapper>
                        </div>

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
                                    autocomplete="new-password"
                                />
                            </InputIconWrapper>
                        </div>

                        {/* Password confirmation */}
                        <div class="space-y-2">
                            <Label
                                for="password_confirmation"
                                value="Confirm Password"
                            />
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
                                    id="password_confirmation"
                                    type="password"
                                    class="block w-full"
                                    placeholder="Confirm Password"
                                    v-model={form.password_confirmation}
                                    required
                                    autocomplete="new-password"
                                />
                            </InputIconWrapper>
                        </div>

                        {/* Submit */}
                        <Button
                            class="justify-center gap-2 w-full"
                            disabled={form.processing}
                        >
                            {({ iconSizeClasses }) => (
                                <>
                                    <UserAddIcon
                                        aria-hidden="true"
                                        class={iconSizeClasses}
                                    />
                                    <span>Register</span>
                                </>
                            )}
                        </Button>

                        {/* Login link */}
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link
                                href={route('login')}
                                class="text-blue-500 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </GuestLayout>
        );
    },
});
