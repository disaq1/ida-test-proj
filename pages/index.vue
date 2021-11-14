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
              name="category"
            />
            <label for="min-price">По минимальной цене</label>
          </div>

          <div class="option" @click="sortBy('max')">
            <input
              id="max-price"
              type="radio"
              class="radio"
              name="category"
            />
            <label for="max-price">По максимальной цене</label>
          </div>

          <div class="option" @click="sortBy('name')">
            <input
              id="by-name"
              type="radio"
              class="radio"
              name="category"
            />
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
        <Card v-for="item in items" :key="item.id" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>

import AddsCard from '~/components/AddsCard'
import Card from '~/components/Card'
export default {
  components: { Card, AddsCard },
  data () {
    return {
      items: [
        {
          id: 1,
          cardImage: 'https://icdn.lenta.ru/images/2021/04/27/16/20210427163138131/square_320_c09ebae17387b7d6eeb9fa0d42afe5ee.jpg',
          cardName: 'Наименование товара 1',
          cardDescription: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          cardPrice: '2000'
        },
        {
          id: 2,
          cardImage: 'data:image/jpeg;base64,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',
          cardName: 'Наименование товара 2',
          cardDescription: '',
          cardPrice: '9999'
        },
        {
          id: 3,
          cardImage: 'https://img3.akspic.ru/previews/3/4/8/1/5/151843/151843-gory-ozero-otrazhenie-gornyj_relef-prirodnyj_landshaft-550x310.jpg',
          cardName: 'Наименование товара 3',
          cardDescription: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          cardPrice: '500'
        }
      ]
    }
  },
  methods: {
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
        this.items = this.items.sort((a, b) => a.cardPrice - b.cardPrice)
      } else if (e === 'max') {
        this.items = this.items.sort((a, b) => b.cardPrice - a.cardPrice)
      } else if (e === 'name') {
        this.items = this.items.sort((a, b) => a.cardName.localeCompare(b.cardName))
      }
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
