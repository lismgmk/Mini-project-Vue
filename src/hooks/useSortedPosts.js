import {computed, ref} from "vue";


export function useSortedPosts(posts) {
    const optionValue = ref('')
    const sortedPosts = computed(
        () => {
            return [...posts.value].sort((a, b) => {
                return a[optionValue]?.localeCompare(b[optionValue])
            })
        }
    )
    return {
        sortedPosts, optionValue
    }
}


