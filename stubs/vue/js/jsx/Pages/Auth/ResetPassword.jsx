import { defineComponent, withModifiers } from 'vue';
import { useForm } from '@inertiajs/inertia-vue3';
import { MailIcon, LockClosedIcon } from '@heroicons/vue/outline';
import InputIconWrapper from '@/Components/InputIconWrapper';
import Button from '@/Components/Button';
import GuestLayout from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';

export default defineComponent({
    props: {
        email: String,
        token: String,
    },

    setup(props) {
        const form = useForm({
            token: props.token,
            email: props.email,
            password: '',
            password_confirmation: '',
        });

        const submit = () => {
            form.post(route('password.store'), {
                onFinish: () => form.reset('password', 'password_confirmation'),
            });
        };

        return () => (
            <GuestLayout title="Reset Password">
                <ValidationErrors class="mb-4" />

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
                                    placeholder="Email"
                                    class="block w-full"
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
                                    placeholder="Password"
                                    class="block w-full"
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
                                    placeholder="Confirm Password"
                                    class="block w-full"
                                    v-model={form.password_confirmation}
                                    required
                                    autocomplete="new-password"
                                />
                            </InputIconWrapper>
                        </div>

                        {/* Submit */}
                        <Button
                            class="justify-center w-full"
                            disabled={form.processing}
                        >
                            Reset Password
                        </Button>
                    </div>
                </form>
            </GuestLayout>
        );
    },
});
