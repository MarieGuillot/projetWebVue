<template>
    <div id="TimeSelection">
    <div id="present" v-on:click="time" :class="{'active': isPresent}">Present </div>
    <div id="future" v-on:click="time" :class="{'active': !isPresent}">Future </div>
    </div>
</template>

<script>
export default {
  name: 'TimeSelection',
  data() {
    return {
     isPresent:true,
    }
  },
  methods : {
    time(event) {
      if(event.target.id == "present" && this.isPresent == false) {
        this.isPresent = true;
        this.$emit('presentWanted', this.isPresent);
      } else if (event.target.id == "future" && this.isPresent == true) {
        this.isPresent = false;
        this.$emit('presentWanted', this.isPresent);
      }
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style> 
#TimeSelection {
  text-align: center;
  border-bottom: solid 2px var(--my-main-color);
  padding: 5px 0px 5px 0px;
  line-height: 30px;
  overflow:hidden;
  font-family: 'Cyrene', sans-serif;
  font-size: 20px;
  transition : border 2s, color 2s;
}

#present {
  float:left;
  width:49vw;
}

#future{
  border-left: solid 2px var(--my-main-color);
  float:right;
  width:50vw;
  transition : border 2s;
}

.active{
  color:var(--my-paper-color);
  text-shadow: var(--my-main-color) 0px 0 5px, var(--my-main-color) 0px 0 20px;
  transition : color 1s, text-shadow 1s;
}

/*Responsive */
@media screen and (max-aspect-ratio : 3/4) {
  #TimeSelection {
    font-size : min(2.5vh, 20px);
  }
}

@media screen and (max-aspect-ratio : 1/3) {
  #future {
    border:none;
  }
}

</style>