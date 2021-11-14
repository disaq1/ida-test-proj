<template>
  <div class="card">
    <div class="card__delete-btn delete-btn" @click="deleteCard()">
      <img src="../assets/img/deleteBtn.svg" alt="delete button" class="delete-btn__img">
    </div>
    <img :src="item.cardImage" :alt="item.cardName" class="card__img">
    <h2 class="card__name">
      {{ item.cardName }}
    </h2>
    <p class="card__description">
      {{ item.cardDescription }}
    </p>
    <span class="card__price">
      {{ moneyFormat(item.cardPrice)}}
    </span>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    deleteCard () {
      console.log('deleted')
    },
    moneyFormat (number) {
      return parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.w)/g, '$1 ').replace(/ /g, ' ')
    }

  }
}
</script>

<style lang="scss">
  .card {
    width: 100%;
    height: 100%;
    max-width: 550px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    position: relative;

    background: #FFFEFB;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;

    &:hover {
      cursor: pointer;
    }
    &:hover .delete-btn {
      display: block;
    }
    &__delete-btn {
      display: none;
      width: 32px;
      height: 32px;
      position: absolute;
      top: -8px;
      right: -8px;
      margin: 0;
      padding: 8px;
      background: #FF8484;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      cursor: pointer;
      z-index: 2;
    }
    &__img {
      width: 100%;
      max-height: 200px;
      height: 100%;
    }
    &__name {
      margin: 16px 0 16px 16px;
      padding: 0;

      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 25px;
      letter-spacing: 0;
      text-align: left;
    }
    &__description {
      margin: 0 16px 32px;
      padding: 0;

      height: 80px;
      overflow: scroll;

      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0;
      text-align: left;
    }
    &__price {
      margin: 0 0 24px 16px;
      padding: 0;

      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 30px;
      letter-spacing: 0;
      text-align: left;
    }
    @media screen and (min-width: 1204px) {
      max-width: 332px;
    }
  }
</style>
