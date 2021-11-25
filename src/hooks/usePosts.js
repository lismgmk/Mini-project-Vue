import axios from "axios";
import {onMounted, ref} from "vue";


export function usePosts(limit) {
    const posts = ref([])
    const loading = ref(false)
    const page = ref(1)
    const totalPage = ref(0)

    const fetching = async () => {
        try {
            loading.value = true
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _limit: limit,
                    _page: page.value
                }
            })
            posts.value = response.data
            totalPage.value = Math.ceil(response.headers['x-total-count'] / limit)
        } catch (e) {
            alert('Error')
        } finally {
            loading.value = false
        }
    }
    onMounted(fetching)


    return {
        posts, loading, totalPage
    }

}