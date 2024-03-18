<template>
  <h3>{{displayDays}}:{{displayHours}}:{{displayMinutes}}:{{displaySeconds}}</h3>
</template>

<script>
export default {
  data(){
    return {
      displayDays: 0,
      displayHours: 0,
      displayMinutes: 0,
      displaySeconds: 0
    }
  },
  props: {
    dataJson:{
      type: String,
      required: true
    }
  },
  computed: {
    seconds: () => 1000,
    minutes() {
      return this.seconds * 60
    },
    hours(){
      return this.minutes * 60
    },
    days(){
      return this.hours * 24
    }
  },
  methods: {
    zeroAdd: (number) => {
      return number < 10 ? "0" + number: number
    },
    showRemaining(){
      const timer = setInterval(() => {
        const now = Date.now()
        const end = new Date(this.dataJson)
        const distance = end - now

        if(distance <= 0){
          this.$emit("close")
          clearInterval(timer)
          return
        }
        const days = Math.floor(distance / this.days)
        const hours = Math.floor((distance % this.days) / this.hours)
        const minutes = Math.floor((distance % this.hours) / this.minutes)
        const seconds = Math.floor((distance % this.minutes) / this.seconds)

        this.displayDays = this.zeroAdd(days)
        this.displayHours = this.zeroAdd(hours)
        this.displayMinutes = this.zeroAdd(minutes)
        this.displaySeconds = this.zeroAdd(seconds)

      }, 1000)
    }
  },
  mounted() {
    this.showRemaining()
  },
  name: "MyTimer"
}
</script>

<style scoped>
  .main__body{
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 50px;
    background: white;
    color: black;
    font-size: 20px;
    font-weight: bold;
  }
</style>