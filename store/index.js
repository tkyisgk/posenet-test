export const state = () => ({
  drawData: []
})

export const getters = {
  drawData: state => state.drawData
}

export const mutations = {
  updateCanvas(state, drawData) {
    state.drawData = drawData
  }
}
