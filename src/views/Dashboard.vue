<template>
  <div>Dashboard here</div>
</template>

<script>
export default {
  name: "Dashboard",
  created() {
    alert("Dashboard created with url:" + window.location);
    let token = window.location.hash
      .substr(1)
      .split("&")[0]
      .split("=")[1];
    alert(token);
  }
};
</script>

<style></style>
