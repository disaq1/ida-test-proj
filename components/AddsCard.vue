<template>
  <form class="add">
    <div class="add__block point" :class="{ 'border--red': nameError}">
      <h3>Наименование товара</h3>
      <input
        id="product_name"
        :value="cardName"
        type="text"
        placeholder="Введите наименование товара"
        @input="handleName($event)"
        @focus="handleName($event)"
      >
      <span v-if="nameError" class="error">
        {{ nameError }}
      </span>
    </div>
    <div class="add__block">
      <h3>Описание товара</h3>
      <textarea
        id="product_description"
        v-model="cardDescription"
        placeholder="Введите описание товара"
      />
    </div>
    <div class="add__block point" :class="{ 'border--red': imageError}">
      <h3>Ссылка на изображение товара</h3>
      <input
        id="product_link"
        :value="cardImage"
        type="text"
        placeholder="Введите ссылку"
        @input="handleImage($event)"
        @focus="handleImage($event)"
      >
      <span v-if="imageError" class="error">
        {{ imageError }}
      </span>
    </div>
    <div class="add__block point" :class="{ 'border--red': priceError}">
      <h3>Цена товара</h3>
      <input
        id="product_price"
        :value="cardPrice"
        type="number"
        placeholder="Введите цену"
        @input="handlePrice($event)"
        @focus="handlePrice($event)"
      >
      <span v-if="priceError" class="error">
        {{ priceError }}
      </span>
    </div>
    <button
      type="submit"
      class="add__btn"
      :disabled="isSubmitDisabled"
      @click.prevent="undisable()"
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
      cardPrice: '',

      nameError: '',
      imageError: '',
      priceError: ''
    }
  },
  computed: {
    isSubmitDisabled () {
      return Boolean(this.nameError || this.imageError || this.priceError)
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
    },
    undisable () {
      const productName = document.getElementById('product_name')
      const productLink = document.getElementById('product_link')
      const productPrice = document.getElementById('product_price')
      if (productName.value !== '' && productLink.value !== '' && productPrice.value !== '') {
        this.submit()
      }
    },
    // name validation
    handleName (e) {
      this.cardName = e.target.value
      this.nameError = !this.cardName.length ? 'Поле является обязательным' : ''
    },
    // image validation
    handleImage (e) {
      this.cardImage = e.target.value
      this.imageError = !this.cardImage.length ? 'Поле является обязательным' : ''
    },
    // price validation
    handlePrice (e) {
      this.cardPrice = e.target.value
      this.priceError = !this.cardPrice.length ? 'Поле является обязательным' : ''
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
  @mixin smooth {
    transition: 0.3s;
  }
  .border--red input {
    outline: none;
    border: 1px solid #FF8484 !important;
    box-sizing: border-box;
  }
  .add {
    width: 100%;
    margin: 0 0 20px;
    padding: 24px;

    background: #FFFEFB;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    box-sizing: border-box;

    & .point {
      position: relative;
      & .error {
        position: absolute;
        top: 60px;
        left: 0;
        margin: 0;
        padding: 0;
        font-size: 8px;
        font-style: normal;
        font-weight: 400;
        line-height: 10px;
        letter-spacing: -0.02em;
        text-align: left;
        color: #FF8484;
      }
    }
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
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        border: 1px solid transparent;
        outline: none;
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
      margin: 0;
      min-width: 332px;
      width: 332px;
      height: 453px;
      position: -webkit-sticky;
      position: sticky;
      top: 24px;
      left: 32px;
    }
  }
</style>
