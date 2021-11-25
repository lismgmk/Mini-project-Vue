import {computed, ref} from "vue";


export function useSortedSearchPosts(sortedPosts) {
    const searchQuery = ref('')

    const sortSearch = computed(
        () => {
            return sortedPosts.value.filter((option) => {
                return option.title.toLowerCase().includes(searchQuery.value.toLocaleLowerCase())
            })
        }
    )
    return {
        sortSearch, searchQuery
    }
}


