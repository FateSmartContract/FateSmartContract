import Vue from 'vue'
import Index from '@/components/Index'
import router from '@/router'

describe('Index.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(Index)
        const vm = new Constructor({router}).$mount()
        expect(vm.$el.querySelector('.display-4 h1').textContent)
            .to.equal('Fate/Smart Contract')
    })
})
