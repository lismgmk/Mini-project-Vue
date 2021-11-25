import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        loading: false,
        optionValue: '',
        optionsData: ['title', 'body'],
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPage: 0,
    }),

    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((a, b) => {
                return a[state.optionValue]?.localeCompare(b[state.optionValue])
            })
        },
        sortSearch(state, getters) {
            return getters.sortedPosts.filter((option) => {
                return option.title.toLowerCase().includes(state.searchQuery.toLocaleLowerCase())
            })
        }
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, loading) {
            state.loading = loading
        },
        setOptionValue(state, optionValue) {
            state.optionValue = optionValue
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPage(state, totalPage) {
            state.totalPage = totalPage
        },


    },

    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true)
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _limit: state.limit,
                            _page: state.page
                        }
                    })
                    commit('setPosts', response.data)
                    commit('setLoading', false)
                    commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit))
                }, 2000)

            } catch (e) {
                alert('Error')
            }
        },
        async fetchNewPosts({state, commit}) {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.page += 1
                    }
                })
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data])
            } catch (e) {
                alert('Error')
            }
        },
    },
    namespaced: true
}