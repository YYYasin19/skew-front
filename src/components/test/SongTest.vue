<template>
  <div class="container is-widescreen mb-5">
    <div id="song-box" class="columns box is-mobile is-vcentered pb-1 pt-1">
      <div class="column is-narrow">
        <a :href="song.item.external_urls.spotify" target="_blank">
          <img class="song-image" :src="song.item.album.images[1].url" alt="" />
        </a>
      </div>
      <div class="column">
        <div class="columns has-text-left is-vcentered is-mobile">
          <div class="column">
            <h1 class="is-size-4 has-text-weight-medium">
              {{ song.item.name }}
            </h1>
            <div class="is-size-5">
              <span v-for="a in song.item.artists" :key="a.id">
                {{ a.name }}
              </span>
            </div>
          </div>
          <div class="column is-narrow">
            <a @click="alert('hello')">
              <b-icon
                size="is-medium"
                icon="heart-outline"
                type="is-danger"
              ></b-icon>
            </a>
            {{ upvote_users }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { socketActions } from "../../mixins";

export default {
  name: "Song",
  mixins: [socketActions],
  data: function() {
    return {
      upvote_users: 3,
      song: {
        device: {
          id: "57e39afa142f2573ee041b031572b66d00ec2e1a",
          is_active: true,
          is_private_session: false,
          is_restricted: false,
          name: "YasiPhone (PwC)",
          type: "Smartphone",
          volume_percent: 100
        },
        shuffle_state: false,
        repeat_state: "context",
        timestamp: 1600268799768,
        context: {
          external_urls: {
            spotify: "https://open.spotify.com/playlist/37i9dQZEVXcQo0mSBecPkv"
          },
          href: "https://api.spotify.com/v1/playlists/37i9dQZEVXcQo0mSBecPkv",
          type: "playlist",
          uri: "spotify:playlist:37i9dQZEVXcQo0mSBecPkv"
        },
        progress_ms: 31261,
        item: {
          album: {
            album_type: "album",
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/74yb8EAWGPAcIUo6CFxKIR"
                },
                href:
                  "https://api.spotify.com/v1/artists/74yb8EAWGPAcIUo6CFxKIR",
                id: "74yb8EAWGPAcIUo6CFxKIR",
                name: "NKOHA",
                type: "artist",
                uri: "spotify:artist:74yb8EAWGPAcIUo6CFxKIR"
              }
            ],
            external_urls: {
              spotify: "https://open.spotify.com/album/1rQYN59Fc69SHDwKtTwSKe"
            },
            href: "https://api.spotify.com/v1/albums/1rQYN59Fc69SHDwKtTwSKe",
            id: "1rQYN59Fc69SHDwKtTwSKe",
            images: [
              {
                height: 640,
                url:
                  "https://i.scdn.co/image/ab67616d0000b273c056e3e96e16a67a972a6c51",
                width: 640
              },
              {
                height: 300,
                url:
                  "https://i.scdn.co/image/ab67616d00001e02c056e3e96e16a67a972a6c51",
                width: 300
              },
              {
                height: 64,
                url:
                  "https://i.scdn.co/image/ab67616d00004851c056e3e96e16a67a972a6c51",
                width: 64
              }
            ],
            name: "Himitsu Kaigi",
            release_date: "2019-11-30",
            release_date_precision: "day",
            total_tracks: 8,
            type: "album",
            uri: "spotify:album:1rQYN59Fc69SHDwKtTwSKe"
          },
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/74yb8EAWGPAcIUo6CFxKIR"
              },
              href: "https://api.spotify.com/v1/artists/74yb8EAWGPAcIUo6CFxKIR",
              id: "74yb8EAWGPAcIUo6CFxKIR",
              name: "NKOHA",
              type: "artist",
              uri: "spotify:artist:74yb8EAWGPAcIUo6CFxKIR"
            }
          ],

          disc_number: 1,
          duration_ms: 205014,
          explicit: false,
          external_ids: { isrc: "QZHZ51912425" },
          external_urls: {
            spotify: "https://open.spotify.com/track/6FoGOLEcSLkj0iWevz8edJ"
          },
          href: "https://api.spotify.com/v1/tracks/6FoGOLEcSLkj0iWevz8edJ",
          id: "6FoGOLEcSLkj0iWevz8edJ",
          is_local: false,
          name: "Senpai",
          popularity: 39,
          preview_url:
            "https://p.scdn.co/mp3-preview/9c988b6c7729350b43450f2f77a7e4b31e51017f?cid=f4233a4c37b445d08eef707987b11ac8",
          track_number: 8,
          type: "track",
          uri: "spotify:track:6FoGOLEcSLkj0iWevz8edJ"
        },
        currently_playing_type: "track",
        actions: { disallows: { resuming: true } },
        is_playing: true
      }
    };
  }
};
</script>

<style lang="scss" scoped>
#song-box {
  min-height: 100px;
}

.song-image {
  height: 80px;
  width: 80px;
  border-radius: 10px;
  border: 1px solid lightgray;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1);
  transition: 0.4s ease;
}

.song-data {
}
</style>
