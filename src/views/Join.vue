<template>
  <div class="container is-fluid">
    <h1 class="title has-text-primary">
      Join a session!
    </h1>
    <section id="form">
      <b-field label="Session Name">
        <b-input
          v-model="sessionName"
          placeholder="What's the name of the session you wnat to join?"
        ></b-input>
      </b-field>
      <b-field label="Password">
        <b-input
          type="password"
          placeholder="The session's password. Ask the creator!"
          password-reveal
        >
        </b-input>
      </b-field>
      <hr />
      <b-field label="Username">
        <b-input
          placeholder="Your username for this session"
          maxlength="30"
        ></b-input>
      </b-field>
      <b-button type="is-primary" expanded>Join this session now</b-button>
    </section>
  </div>
</template>

<script>
export default {
  name: "Join"
};
</script>

<style lang="scss" scoped>
hr {
  background-color: grey;
  height: 2px;
  border-radius: 10px;
}
</style>
