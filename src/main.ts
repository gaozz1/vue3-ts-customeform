import { createApp, defineComponent, h, reactive, ref } from 'vue'
// import App from './App.vue'
// import HelloWorldVue from './components/HelloWorld.vue'

import App from './App'

// const img = require('./assets/logo.png') // eslint-disable-line

// createElement
// const App = defineComponent({
//   setup() {
//     const state = reactive({
//       name: 'joker',
//     })

//     const numberRef = ref(1)

//     setInterval(() => {
//       state.name += '1'
//       numberRef.value += 1
//     }, 1000)

//     // const number = numberRef.value

//     return () => {
//       const number = numberRef.value
//       return h('div', { id: 'app' }, [
//         h('img', {
//           alt: 'Vue logo',
//           // src: require('./assets/logo.png'),
//           src: img,
//         }),
//         // h(HelloWorldVue, {
//         //   msg: 'Welcome to Your Vue.js + TypeScript App',
//         //   age: 12,
//         // }),
//         h('p', state.name + ':' + number),
//       ])
//     }
//   },
// })

createApp(App).mount('#app')
