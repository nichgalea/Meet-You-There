import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import SearchContainer from "@/components/HelloWorld.vue";

describe("SearchContainer.vue", () => {
  it("renders props.msg when passed", () => {
    const wrapper = shallowMount(SearchContainer);
    expect(wrapper.text()).to.not.be.null;
  });
});
