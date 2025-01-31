<script setup>
import AuthenticatedLayout from '@/Layouts/Authenticated'
import Button from '@/Components/Button'

let buttonVariants = [
    "primary",
    "success",
    "danger",
    "warning",
    "info",
    "white",
    "black",
    "transparent",
];

let buttonSizes = ["sm", "base", "lg"]
</script>

<template>
    <AuthenticatedLayout title="Buttons">
        <template #header>
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 class="text-xl font-semibold leading-tight">Buttons</h2>

                <Button
                    external
                    variant="black"
                    target="_blank"
                    class="max-w-xs"
                    href="https://github.com/kamona-wd/kui-laravel-breeze"
                    start-icon="tabler--brand-github"
                    text="Star on Github"
                />
            </div>
        </template>

        <div class="grid items-center gap-6 mt-4">
            <div v-for="variant in buttonVariants" :key="variant" class="grid items-start grid-cols-3 gap-4 justify-items-center">
                <Button 
                    v-for="size in buttonSizes" 
                    :key="size" 
                    :variant="variant" 
                    :size="size"
                    text="Button"
                />
            </div>

            <div v-for="variant in buttonVariants" :key="variant" class="grid items-start grid-cols-3 gap-4 justify-items-center">
                <Button 
                    v-for="size in buttonSizes" 
                    :key="size" 
                    :variant="variant" 
                    :size="size"
                    icon="tabler--home" 
                    sr-text="Icon only button"
                />
            </div>

            <div v-for="variant in buttonVariants" :key="variant" class="grid items-start grid-cols-3 gap-4 justify-items-center">
                <Button 
                    v-for="size in buttonSizes" 
                    :key="size" 
                    :variant="variant" 
                    :size="size"
                    start-icon="tabler--circle" 
                    text="Button"
                />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
