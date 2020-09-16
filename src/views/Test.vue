<template>
  <div id="test" class="container is-fluid">
    <CurrentPlaybackTest></CurrentPlaybackTest>
    <hr />
    <h1 class="title has-text-left">Upcoming songs</h1>
    <SongTest></SongTest>
    <SongTest></SongTest>
    <SongTest></SongTest>
    <SongTest></SongTest>
  </div>
</template>

<script>
import CurrentPlaybackTest from "../components/test/CurrentPlaybackTest";
import SongTest from "../components/test/SongTest";
export default {
  name: "Test",
  components: {
    CurrentPlaybackTest,
    SongTest
  }
};
</script>

<style></style>
