<template>
    <Head title="Reset Password" />

    <BreezeValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
        <div class="grid gap-4">
            <div class="space-y-2">
                <BreezeLabel for="email" value="Email" />
                <BreezeInputIconWrapper>
                    <template #icon>
                        <MailIcon aria-hidden="true" class="w-5 h-5" />
                    </template>
                    <BreezeInput withIcon id="email" type="email" placeholder="Email" class="block w-full" v-model="form.email" required autofocus autocomplete="username" />
                </BreezeInputIconWrapper>
            </div>

            <div class="space-y-2">
                <BreezeLabel for="password" value="Password" />
                <BreezeInputIconWrapper>
                    <template #icon>
                        <LockClosedIcon aria-hidden="true" class="w-5 h-5" />
                    </template>
                    <BreezeInput withIcon id="password" type="password" placeholder="Password" class="block w-full" v-model="form.password" required autocomplete="new-password" />
                </BreezeInputIconWrapper>
            </div>

            <div class="space-y-2">
                <BreezeLabel for="password_confirmation" value="Confirm Password" />
                <BreezeInputIconWrapper>
                    <template #icon>
                        <LockClosedIcon aria-hidden="true" class="w-5 h-5" />
                    </template>
                    <BreezeInput withIcon id="password_confirmation" type="password" placeholder="Confirm Password" class="block w-full" v-model="form.password_confirmation" required autocomplete="new-password" />
                </BreezeInputIconWrapper>
            </div>

            <div>
                <BreezeButton class="w-full justify-center" :disabled="form.processing">
                    Reset Password
                </BreezeButton>
            </div>
        </div>
    </form>
</template>

<script>
import BreezeInputIconWrapper from '@/Components/InputIconWrapper.vue'
import BreezeButton from '@/Components/Button.vue'
import BreezeGuestLayout from '@/Layouts/Guest.vue'
import BreezeInput from '@/Components/Input.vue'
import BreezeLabel from '@/Components/Label.vue'
import BreezeValidationErrors from '@/Components/ValidationErrors.vue'
import { Head } from '@inertiajs/inertia-vue3';
import { MailIcon, LockClosedIcon } from '@heroicons/vue/outline';

export default {
    layout: BreezeGuestLayout,

    components: {
        BreezeInputIconWrapper,
        BreezeButton,
        BreezeInput,
        BreezeLabel,
        BreezeValidationErrors,
        Head,
        MailIcon,
        LockClosedIcon,
    },

    props: {
        email: String,
        token: String,
    },

    data() {
        return {
            form: this.$inertia.form({
                token: this.token,
                email: this.email,
                password: '',
                password_confirmation: '',
            })
        }
    },

    methods: {
        submit() {
            this.form.post(this.route('password.update'), {
                onFinish: () => this.form.reset('password', 'password_confirmation'),
            })
        }
    }
}
</script>
