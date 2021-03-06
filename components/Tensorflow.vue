<template>
  <div class="wrapper">
    <div class="img-box">
      <img
        ref="img"
        :src="targetImg"
        alt=""
        crossorigin="anonymous"
      >

      <DrawLine />

      <div class="msgs" v-if="isMsg">{{ isMsg }}</div>
    </div>

    <div class="actions">
      <button
        type="button"
        class="button"
        @click="handleImgChange()"
      >Try again</button>
    </div>
  </div>
</template>

<script>
// Component
import DrawLine from '~/components/DrawLine.vue'
// liberary
import * as posenet from '@tensorflow-models/posenet'

export default {
  components: {
    DrawLine
  },
  data() {
    return {
      targetImg: '',
      targetParts: ['leftEye', 'rightEye'],
      isMsg: ''
    }
  },
  mounted() {
    this.getImg()
  },
  methods: {
    setLineData(keypoints) {
      if (!keypoints) return

      const points = []

      for (let i = 0; i < keypoints.length; i++) {
        for (let j = 0; j < this.targetParts.length; j++) {
          if (keypoints[i].part === this.targetParts[j]) {
            if (keypoints[i].score < 0.1) {
              this.isMsg = 'I can not recognize your eyes.'
              return
            }
            points.push(keypoints[i].position)
          }
        }
      }
      this.isMsg = null
      this.$store.commit('updateCanvas', points)
    },
    async estimatePoseOnImage(imageElement) {
      const net = await posenet.load()
      const pose = await net.estimateSinglePose(imageElement, 0.5, false, 16)
      return pose
    },
    async initTensor() {
      const pose = await this.estimatePoseOnImage(this.$refs.img)
      this.setLineData(pose.keypoints)
    },
    getImg() {
      this.isMsg = 'Under analysis...'
      this.targetImg = 'https://source.unsplash.com/featured/600x400?face'
      this.$imageOnLoad(this.targetImg, () => {
        this.initTensor()
      })
    },
    handleImgChange() {
      location.reload()
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin: auto;
  width: 100%;
  max-width: 600px;
}
.img-box {
  position: relative;
  width: 100%;
}

img {
  display: block;
  width: 100%;
  min-height: 400px;
}

@media screen and (max-width: 600px) {
  img {
    min-height: calc(100vw * 2 / 3);
  }
}

.msgs {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  font-size: 18px;
  font-weight: 700;
  line-height: 40px;
  background-color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.actions {
  margin-top: 40px;
  text-align: center;
}

.actions .button {
  padding: 14px 40px;
  font-size: 18px;
  color: #535353;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: white;
  transition: none;
  cursor: pointer;
}
.actions .button:hover {
  color: white;
  background-color: #535353;
  transition: 0.2s ease-out;
}
.actions .button:focus {
  outline: none;
}
</style>
