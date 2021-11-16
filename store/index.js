import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    SET_ITEMS_TO_STATE: (state, items) => {
      state.items = items
    },
    ADD_ITEM: (state, newItem) => {
      state.items.unshift(newItem)
    },
    REMOVE_ITEM: (state, index) => {
      state.items.splice(index, 1)
    }
  },
  actions: {
    GET_ITEMS_FROM_API ({ commit }) {
      return axios('http://localhost:3000/items', {
        method: 'GET'
      })
        .then((items) => {
          commit('SET_ITEMS_TO_STATE', items.data)
          return items
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    DELETE_ITEM_FROM_STATE ({ commit }, index) {
      commit('REMOVE_ITEM', index)
    }
  },
  getters: {
    ITEMS (state) {
      return state.items
    }
    // Проверка на заполнение всех полей в форме "добавление товара"
    // VALID_NEW_ITEM (state) {
    //   return state.items.filter((i) => {
    //     return i.cardImage && i.cardName && i.cardDescription && i.cardPrice
    //   })
    // }
  }
})

export default store
