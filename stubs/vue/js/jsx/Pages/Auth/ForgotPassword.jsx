import { defineComponent, withModifiers } from 'vue';
import { useForm } from '@inertiajs/inertia-vue3';
import { MailIcon, PaperAirplaneIcon } from '@heroicons/vue/outline';
import InputIconWrapper from '@/Components/InputIconWrapper';
import Button from '@/Components/Button';
import GuestLayout from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';

export default defineComponent({
    props: {
        status: String,
    },

    setup(props) {
        const form = useForm({
            email: '',
        });

        const submit = () => {
            form.post(route('password.email'));
        };

        return () => (
            <GuestLayout title="Forgot Password">
                <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </div>

                {props.status && (
                    <div class="mb-4 font-medium text-sm text-green-600">
                        {props.status}
                    </div>
                )}

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
                                    class="block w-full"
                                    placeholder="Email"
                                    v-model={form.email}
                                    required
                                    autofocus
                                    autocomplete="username"
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
                                    <PaperAirplaneIcon
                                        aria-hidden="true"
                                        class={iconSizeClasses}
                                    />
                                    <span>Email Password Reset Link</span>
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </GuestLayout>
        );
    },
});
