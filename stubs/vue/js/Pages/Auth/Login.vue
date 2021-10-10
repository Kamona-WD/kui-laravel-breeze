<template>
    <Head title="Log in" />

    <BreezeValidationErrors class="mb-4" />

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
        {{ status }}
    </div>

    <form @submit.prevent="submit">
        <div class="grid gap-6">
            <div class="space-y-2">
                <BreezeLabel for="email" value="Email" />
                <BreezeInputIconWrapper>
                    <template #icon>
                        <MailIcon aria-hidden="true" class="w-5 h-5" />
                    </template>
                    <BreezeInput withIcon id="email" type="email" class="block w-full" placeholder="Email" v-model="form.email" required autofocus autocomplete="username" />
                </BreezeInputIconWrapper>
            </div>

            <div class="space-y-2">
                <BreezeLabel for="password" value="Password" />
                <BreezeInputIconWrapper>
                    <template #icon>
                        <LockClosedIcon aria-hidden="true" class="w-5 h-5" />
                    </template>
                    <BreezeInput withIcon id="password" type="password" class="block w-full" placeholder="Password" v-model="form.password" required autocomplete="current-password" />
                </BreezeInputIconWrapper>
            </div>

            <div class="flex items-center justify-between">
                <label class="flex items-center">
                    <BreezeCheckbox name="remember" v-model:checked="form.remember" />
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>

                <Link v-if="canResetPassword" :href="route('password.request')" class="text-sm text-blue-500 hover:underline">
                    Forgot your password?
                </Link>
            </div>

            <div>
                <BreezeButton class="justify-center gap-2 w-full" :disabled="form.processing" v-slot="{iconSizeClasses}">
                    <LoginIcon aria-hidden="true" :class="iconSizeClasses" />
                    <span>Log in</span>
                </BreezeButton>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?
                <Link :href="route('register')" class="text-blue-500 hover:underline">
                    Register
                </Link>
            </p>
        </div>
    </form>
</template>

<script>
import BreezeInputIconWrapper from '@/Components/InputIconWrapper.vue'
import BreezeButton from '@/Components/Button.vue'
import BreezeCheckbox from '@/Components/Checkbox.vue'
import BreezeGuestLayout from '@/Layouts/Guest.vue'
import BreezeInput from '@/Components/Input.vue'
import BreezeLabel from '@/Components/Label.vue'
import BreezeValidationErrors from '@/Components/ValidationErrors.vue'
import { Head, Link } from '@inertiajs/inertia-vue3';
import { MailIcon, LockClosedIcon, LoginIcon } from '@heroicons/vue/outline';

export default {
    layout: BreezeGuestLayout,

    components: {
        BreezeInputIconWrapper,
        BreezeButton,
        BreezeCheckbox,
        BreezeInput,
        BreezeLabel,
        BreezeValidationErrors,
        Head,
        Link,
        MailIcon,
        LockClosedIcon,
        LoginIcon
    },

    props: {
        canResetPassword: Boolean,
        status: String,
    },

    data() {
        return {
            form: this.$inertia.form({
                email: '',
                password: '',
                remember: false
            })
        }
    },

    methods: {
        submit() {
            this.form.post(this.route('login'), {
                onFinish: () => this.form.reset('password'),
            })
        }
    }
}
</script>
