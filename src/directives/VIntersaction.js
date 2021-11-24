export default {
    mounted(el, binding) {
        console.log(el)
        console.log(binding)

        const options = {
          root: null,
          rootMargin: '0px',
          threshold: 1.0
        }
        const callback = (entries, observer)=> {
          if (entries[0].isIntersecting) {
            binding.value()
          }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el)
    },
    name: 'intersaction'
}
