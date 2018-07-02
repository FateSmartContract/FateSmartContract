import Vue from 'vue'
import Index from '@/components/Index'
import router from '@/router'

describe('Index.vue', () => {
    it('Should render correct title', () => {
        const Constructor = Vue.extend(Index)
        const vm = new Constructor({router}).$mount()
        expect(vm.$el.querySelector('h1.display-4').textContent)
            .to.equal('Fate/Smart Contract')
    })
})
