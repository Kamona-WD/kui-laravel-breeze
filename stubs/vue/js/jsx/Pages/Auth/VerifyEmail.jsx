import { defineComponent, computed, withModifiers } from 'vue';
import { Link, useForm } from '@inertiajs/inertia-vue3';
import GuestLayout from '@/Layouts/Guest';
import Button from '@/Components/Button';

export default defineComponent({
    props: {
        status: String,
    },

    setup(props) {
        const form = useForm();

        const submit = () => {
            form.post(route('verification.send'));
        };

        const verificationLinkSent = computed(
            () => props.status === 'verification-link-sent'
        );

        return () => (
            <GuestLayout title="Email Verification">
                <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you? If you didn't receive the email, we will
                    gladly send you another.
                </div>

                {verificationLinkSent.value && (
                    <div class="mb-4 text-sm font-medium text-green-600">
                        A new verification link has been sent to the email
                        address you provided during registration.
                    </div>
                )}

                <form onSubmit={withModifiers(submit, ['prevent'])}>
                    <div class="flex items-center justify-between mt-4">
                        <Button disabled={form.processing}>
                            Resend Verification Email
                        </Button>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            class="text-sm text-blue-600 hover:underline dark:text-blue-400"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </GuestLayout>
        );
    },
});
