<template>
    <div id="TimeSelection">
    <div id="present"> Present </div>
    <div id="future"> Future </div>
    </div>
</template>

<script>
export default {
  name: 'TimeSelection'
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
}

#present {
  float:left;
  width:49vw;
}

#future{
  border-left: solid 2px var(--my-main-color);
  float:right;
  width:50vw;
}
</style>