<template>
  <div>
    <div class="top">
      <h1>Добавление товара</h1>

      <div class="select-box">
        <div class="options-container">
          <div class="option" @click="sortBy('min')">
            <input
              id="min-price"
              type="radio"
              class="radio"
            >
            <label for="min-price">По минимальной цене</label>
          </div>

          <div class="option" @click="sortBy('max')">
            <input
              id="max-price"
              type="radio"
              class="radio"
            >
            <label for="max-price">По максимальной цене</label>
          </div>

          <div class="option" @click="sortBy('name')">
            <input
              id="by-name"
              type="radio"
              class="radio"
            >
            <label for="by-name">По наименованию</label>
          </div>
        </div>

        <div class="selected" @click="select()">
          По умолчанию
        </div>
      </div>
    </div>

    <div class="main">
      <AddsCard />
      <div class="cardList">
        <Card
          v-for="(item, index) in ITEMS"
          :key="item.id"
          :item="item"
          @addToState="addToState"
          @deleteCard="deleteCard(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddsCard from '~/components/AddsCard'
import Card from '~/components/Card'

export default {
  components: { Card, AddsCard },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'ITEMS'
    ])
  },
  mounted () {
    this.GET_ITEMS_FROM_API()
  },
  methods: {
    ...mapActions([
      'GET_ITEMS_FROM_API', 'DELETE_ITEM_FROM_STATE', 'ADD_ITEM_TO_STATE'
    ]),
    select () {
      const selected = document.querySelector('.selected')
      const optionsContainer = document.querySelector('.options-container')

      const optionsList = document.querySelectorAll('.option')

      optionsContainer.classList.toggle('active')

      optionsList.forEach((o) => {
        o.addEventListener('click', () => {
          selected.innerHTML = o.querySelector('label').innerHTML
          optionsContainer.classList.remove('active')
        })
      })
    },
    sortBy (e) {
      if (e === 'min') {
        this.ITEMS = this.ITEMS.sort((a, b) => a.cardPrice - b.cardPrice)
      } else if (e === 'max') {
        this.ITEMS = this.ITEMS.sort((a, b) => b.cardPrice - a.cardPrice)
      } else if (e === 'name') {
        this.ITEMS = this.ITEMS.sort((a, b) => a.cardName.localeCompare(b.cardName))
      }
    },
    addToState (data) {
      this.ADD_ITEM_TO_STATE()
    },
    deleteCard (index) {
      this.DELETE_ITEM_FROM_STATE()
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap');

@mixin smooth {
  transition: 0.3s;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  max-width: 1440px;
  margin: 15px;
  background: #E5E5E5;
  @media screen and (min-width: 768px) {
    margin: 32px;
  }
  @media screen and (min-width: 1480px) {
    margin: 32px auto;
  }
}
h1  {
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px;
  letter-spacing: 0;
  text-align: left;
}
.top  {
  margin: 0 0 20px;
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 8px;
  }
}
.main {
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
}
.cardList {
  display: grid;
  align-items: flex-start;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 16px;
  @media screen and (min-width: 710px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (min-width: 930px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1204px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.select-box {
  display: flex;
  width: 100%;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    width: max-content;
  }
  & .options-container {
    background: #FFFEFB;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    color: #B4B4B4;
    max-height: 0;
    width: 100%;
    opacity: 0;
    transition: all 0.3s;
    overflow: hidden;

    order: 1;
  }
  & .options-container.active {
    max-height: 240px;
    opacity: 1;
    margin: 10px 0 0;
  }
  & .options-container.active + .selected::after {
    transform: rotateX(180deg);
    top: 10px;
  }
  & .option:hover {
    background: #cecece;
    color: #49485E;
  }
  & .option {
    @include smooth;
    & .radio {
      display: none;
    }
  }
}

.selected {
  background: #FFFEFB;
  color: #B4B4B4;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px 27px 10px 16px;
  position: relative;

  order: 0;

  &::after {
    content: "";
    background: url("assets/img/arrow-down.svg");
    background-size: contain;
    background-repeat: no-repeat;

    position: absolute;
    height: 13px;
    width: 13px;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

    transition: all 0.3s;
  }
}

.select-box .option,
.select-box .option label,
.selected {
  cursor: pointer;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0;
  text-align: left;
}
.select-box .option label {
  padding: 10px 0 10px 16px;
  font-size: 8px;
}

</style>
