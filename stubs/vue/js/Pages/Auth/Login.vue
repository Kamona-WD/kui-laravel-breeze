<script setup>
import { Link, useForm } from '@inertiajs/vue3'
import Button from '@/Components/Button'
import Checkbox from '@/Components/Checkbox'
import GuestLayout from '@/Layouts/Guest'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import ValidationErrors from '@/Components/ValidationErrors'

defineProps({
    canResetPassword: Boolean,
    status: String,
})

const form = useForm({
    email: '',
    password: '',
    remember: false
})

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    })
}
</script>

<template>
    <GuestLayout title="Log in">
        <ValidationErrors class="mb-4" />

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div class="grid gap-6">
                <div class="space-y-2">
                    <Label for="email" value="Email" />

                    <Input icon="tabler--mail" id="email" type="email" class="block w-full" placeholder="Email" v-model="form.email" required autofocus autocomplete="username" />
                </div>

                <div class="space-y-2">
                    <Label for="password" value="Password" />

                    <Input icon="tabler--lock" id="password" type="password" class="block w-full" placeholder="Password" v-model="form.password" required autocomplete="current-password" />
                </div>

                <div class="flex items-center justify-between">
                    <label class="flex items-center">
                        <Checkbox name="remember" v-model:checked="form.remember" />
                        <span class="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>

                    <Link v-if="canResetPassword" :href="route('password.request')" class="text-sm text-blue-500 hover:underline">
                        Forgot your password?
                    </Link>
                </div>

                <Button 
                    class="justify-center gap-2 w-full" 
                    :disabled="form.processing" 
                    start-icon="tabler--login"
                    text="Login"
                />

                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?
                    <Link :href="route('register')" class="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </form>
    </GuestLayout>
</template>
