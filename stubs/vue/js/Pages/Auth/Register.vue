<template>
    <Head title="Register" />

    <BreezeValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
        <div class="grid gap-6">
            <div class="space-y-2">
                <BreezeLabel for="name" value="Name" />
                <BreezeInputIconWrapper>
                    <template #icon>
                        <UserIcon aria-hidden="true" class="w-5 h-5" />
                    </template>
                    <BreezeInput withIcon id="name" type="text" placeholder="Name" class="block w-full" v-model="form.name" required autofocus autocomplete="name" />
                </BreezeInputIconWrapper>
            </div>

            <div class="space-y-2">
                <BreezeLabel for="email" value="Email" />
                <BreezeInputIconWrapper>
                    <template #icon>
                        <MailIcon aria-hidden="true" class="w-5 h-5" />
                    </template>
                    <BreezeInput withIcon id="email" type="email" class="block w-full" placeholder="Email" v-model="form.email" required autocomplete="username" />
                </BreezeInputIconWrapper>
            </div>

            <div class="space-y-2">
                <BreezeLabel for="password" value="Password" />
                <BreezeInputIconWrapper>
                    <template #icon>
                        <LockClosedIcon aria-hidden="true" class="w-5 h-5" />
                    </template>
                    <BreezeInput withIcon id="password" type="password" class="block w-full" placeholder="Password" v-model="form.password" required autocomplete="new-password" />
                </BreezeInputIconWrapper>
            </div>

            <div class="space-y-2">
                <BreezeLabel for="password_confirmation" value="Confirm Password" />
                <BreezeInputIconWrapper>
                    <template #icon>
                        <LockClosedIcon aria-hidden="true" class="w-5 h-5" />
                    </template>
                    <BreezeInput withIcon id="password_confirmation" type="password" class="block w-full" placeholder="Confirm Password" v-model="form.password_confirmation" required autocomplete="new-password" />
                </BreezeInputIconWrapper>
            </div>

            <div>
                <BreezeButton class="justify-center gap-2 w-full" :disabled="form.processing" v-slot="{ iconSizeClasses }">
                    <UserAddIcon aria-hidden="true" :class="iconSizeClasses" />
                    <span>Register</span>
                </BreezeButton>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?
                <Link :href="route('login')" class="text-blue-500 hover:underline">
                    Login
                </Link>
            </p>
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
import { Head, Link } from '@inertiajs/inertia-vue3';
import { UserIcon, MailIcon, LockClosedIcon, UserAddIcon } from '@heroicons/vue/outline';

export default {
    layout: BreezeGuestLayout,

    components: {
        BreezeInputIconWrapper,
        BreezeButton,
        BreezeInput,
        BreezeLabel,
        BreezeValidationErrors,
        Head,
        Link,
        UserIcon,
        MailIcon,
        LockClosedIcon,
        UserAddIcon,
    },

    data() {
        return {
            form: this.$inertia.form({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                terms: false,
            })
        }
    },

    methods: {
        submit() {
            this.form.post(this.route('register'), {
                onFinish: () => this.form.reset('password', 'password_confirmation'),
            })
        }
    }
}
</script>
