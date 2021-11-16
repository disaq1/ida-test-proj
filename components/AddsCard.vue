<template>
  <form class="add" @submit.prevent="submit">
    <div class="add__block point">
      <h3>Наименование товара</h3>
      <input
        id="product_name"
        v-model="cardName"
        type="text"
        placeholder="Введите наименование товара"
      >
    </div>
    <div class="add__block">
      <h3>Описание товара</h3>
      <textarea
        id="product_description"
        v-model="cardDescription"
        placeholder="Введите описание товара"
      />
    </div>
    <div class="add__block point">
      <h3>Ссылка на изображение товара</h3>
      <input
        id="product_link"
        v-model="cardImage"
        type="text"
        placeholder="Введите ссылку"
      >
    </div>
    <div class="add__block point">
      <h3>Цена товара</h3>
      <input
        id="product_price"
        v-model="cardPrice"
        type="text"
        placeholder="Введите цену"
      >
    </div>
    <button
      type="submit"
      class="add__btn"
    >
      <p>Добавить товар</p>
    </button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      cardImage: '',
      cardName: '',
      cardDescription: '',
      cardPrice: ''
    }
  },
  methods: {
    ...mapMutations(['ADD_ITEM']),
    submit () {
      this.ADD_ITEM({
        id: Date.now(),
        cardImage: this.cardImage,
        cardName: this.cardName,
        cardDescription: this.cardDescription,
        cardPrice: this.cardPrice
      })
      this.cardImage = this.cardName = this.cardDescription = this.cardPrice = ''
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
  @mixin smooth {
    transition: 0.3s;
  }
  .add {
    width: 100%;
    margin: 0 0 20px;
    padding: 24px;

    background: #FFFEFB;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;

    &__block {
      margin: 0 0 16px;
      & h3 {
        margin: 0 0 4px;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: -0.02em;
        text-align: left;
        color: #49485E;
      }
      & input,
      & textarea {
        width: 100%;
        padding: 10px 16px 11px;
        background: #FFFEFB;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        border: none;
        border-radius: 4px;
        &::placeholder {
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 15px;
          letter-spacing: 0;
          color: #B4B4B4;
        }
      }
      & textarea {
        height: 108px;
        resize: none;
      }
    }
    & .point {
      & h3 {
        position: relative;
        display: inline;
        &:after {
          position: absolute;
          top: 1px;
          right: -5px;
          content: '';
          width: 4px;
          height: 4px;
          background: red;
          border-radius: 50%;
        }
      }
    }
    &__btn {
      width: 100%;
      margin: 8px 0 0;
      padding: 10px 0 11px;
      background: #EEEEEE;
      border: none;
      border-radius: 10px;

      cursor: pointer;
      @include smooth;
      & p {
        margin: 0;
        padding: 0;

        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 15px;
        letter-spacing: -0.02em;
        text-align: center;

        color: #B4B4B4;
        @include smooth;
      }
      &:hover {
        background: #cecece;
      }
      &:hover p {
        color: #444;
      }
    }
    @media screen and (min-width: 768px) {
      margin: 0 16px 0 0;
      min-width: 332px;
      width: 332px;
    }
  }
</style>
