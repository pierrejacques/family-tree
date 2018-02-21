<template>
    <div>
        {{data.name}}
        <ul v-if="data.children">
            <li v-for="(child, idx) in data.children" :key="idx">
                <branch :data="child"></branch>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'branch',
    props: ['data'],
}
</script>