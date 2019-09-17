<template>
  <div class="results" @click.stop>
    <button class="close" @click="$emit('close')"></button>
    <div class="container">
      <div>
        <h2>Multiple Location Results</h2>

        <p>We found a couple of places for that query. Can you pick the one that makes most sense for you?</p>
      </div>

      <div class="table-section">
        <table>
          <tbody>
            <tr v-for="result of results" :key="result.id" @click="$emit('close', result)">
              <td>{{result.annotations.flag || "🤷"}}</td>
              <td>{{result.formatted}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as OpenCage from "@/models/opencage";

@Component
export default class ResultsModal extends Vue {
  @Prop() results!: OpenCage.Result[];

  mounted() {
    window.addEventListener("click", this.handleOutsideClick);
  }

  destroyed() {
    window.removeEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick() {
    this.$emit("close");
  }
}
</script>

<style lang="scss">
@import "@/styles/colors";
@import "@/styles/mixins";

.results {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  box-sizing: border-box;
  padding: 16px;
  z-index: 999;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  border-radius: 24px;
  height: 80%;

  @include mobile-large(down) {
    top: 0;
    width: 100vw;
    height: 100vh;
    box-shadow: 0;
    border-radius: 0;
  }

  .container {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-flow: column nowrap;
  }

  h2 {
    margin: 0;

    @include mobile {
      font-size: 21px;
    }
  }

  .table-section {
    height: 60%;
    overflow: auto;
    flex: 1 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  tr {
    cursor: pointer;

    &:hover {
      td {
        background: $background;
      }
    }
  }

  td {
    padding: 8px 4px;
    font-size: 20px;

    &:first-child {
      width: 10%;
      text-align: right;
    }

    &:nth-child {
      width: 90%;
    }
  }

  .close {
    appearance: none;
    position: fixed;
    top: -14px;
    right: -14px;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    border: 0;
    background: $primary;
    display: block;
    cursor: pointer;

    @include mobile-large(down) {
      top: 12px;
      right: 12px;
    }

    @include mobile(down) {
      height: 30px;
      width: 30px;
    }

    &::before,
    &::after {
      position: absolute;
      height: 20px;
      border: 2px solid white;
      content: "";

      @include mobile(down) {
        height: 15px;
        border-width: 1.5px;
      }
    }

    &::before {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &::after {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  .maps-link {
    @include button;
  }
}
</style>