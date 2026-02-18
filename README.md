# Spotify Hits API

> COMP 4513 — Assignment #1

A REST API built with **Node.js**, **Express**, and **Supabase** for querying Spotify hit songs data from 2016–2019. All responses are returned in JSON format.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green) ![Express](https://img.shields.io/badge/Express-4.x-blue) ![Supabase](https://img.shields.io/badge/Supabase-cloud--db-brightgreen)

---

## Overview

This API provides endpoints to query songs, artists, genres, and playlists from a curated Spotify dataset. It also includes mood-based song recommendations sorted by audio features such as danceability, valence, energy, and more.

---

## Built With

- **Node.js** - JavaScript runtime
- **Express** - HTTP server and routing
- **Supabase** - Cloud PostgreSQL database
- **dotenv** - Environment variable management
- **Vercel** - Hosting

---

## API Endpoints

| Endpoint | Description |
|---|---|
| `/api/artists` | All artists sorted by name |
| `/api/artists/:ref` | Single artist by `artist_id` |
| `/api/artists/averages/:ref` | Audio feature averages for a specific artist |
| `/api/genres` | All genres |
| `/api/songs` | All songs sorted by title |
| `/api/songs/sort/:order` | All songs sorted by `id`, `title`, `artist`, `genre`, `year`, or `duration` |
| `/api/songs/:ref` | Single song by `song_id` |
| `/api/songs/search/begin/:substring` | Songs whose title begins with substring (case-insensitive) |
| `/api/songs/search/any/:substring` | Songs whose title contains substring (case-insensitive) |
| `/api/songs/search/year/:year` | Songs from a specific year |
| `/api/songs/artist/:ref` | All songs by a specific artist |
| `/api/songs/genre/:ref` | All songs in a specific genre |
| `/api/playlists/:ref` | All songs in a specific playlist |
| `/api/mood/dancing/:ref` | Top N songs sorted by danceability (desc) |
| `/api/mood/happy/:ref` | Top N songs sorted by valence (desc) |
| `/api/mood/coffee/:ref` | Top N songs sorted by liveness ÷ acousticness (desc) |
| `/api/mood/studying/:ref` | Top N songs sorted by energy × speechiness (asc) |

> For mood routes, if `:ref` is missing, less than 1, greater than 20, or non-numeric, it defaults to **20**.

---

## Test Links

- [/api/artists](https://comp4513-spotify-api.vercel.app/api/artists)
- [/api/artists/129](https://comp4513-spotify-api.vercel.app/api/artists/129)
- [/api/artists/sdfjkhsdf](https://comp4513-spotify-api.vercel.app/api/artists/sdfjkhsdf)
- [/api/artists/averages/129](https://comp4513-spotify-api.vercel.app/api/artists/averages/129)
- [/api/genres](https://comp4513-spotify-api.vercel.app/api/genres)
- [/api/songs](https://comp4513-spotify-api.vercel.app/api/songs)
- [/api/songs/sort/artist](https://comp4513-spotify-api.vercel.app/api/songs/sort/artist)
- [/api/songs/sort/year](https://comp4513-spotify-api.vercel.app/api/songs/sort/year)
- [/api/songs/sort/duration](https://comp4513-spotify-api.vercel.app/api/songs/sort/duration)
- [/api/songs/1010](https://comp4513-spotify-api.vercel.app/api/songs/1010)
- [/api/songs/sjdkfhsdkjf](https://comp4513-spotify-api.vercel.app/api/songs/sjdkfhsdkjf)
- [/api/songs/search/begin/love](https://comp4513-spotify-api.vercel.app/api/songs/search/begin/love)
- [/api/songs/search/begin/sdjfhs](https://comp4513-spotify-api.vercel.app/api/songs/search/begin/sdjfhs)
- [/api/songs/search/any/love](https://comp4513-spotify-api.vercel.app/api/songs/search/any/love)
- [/api/songs/search/year/2017](https://comp4513-spotify-api.vercel.app/api/songs/search/year/2017)
- [/api/songs/search/year/2027](https://comp4513-spotify-api.vercel.app/api/songs/search/year/2027)
- [/api/songs/artist/149](https://comp4513-spotify-api.vercel.app/api/songs/artist/149)
- [/api/songs/artist/7834562](https://comp4513-spotify-api.vercel.app/api/songs/artist/7834562)
- [/api/songs/genre/115](https://comp4513-spotify-api.vercel.app/api/songs/genre/115)
- [/api/playlists](https://comp4513-spotify-api.vercel.app/api/playlists)
- [/api/playlists/3](https://comp4513-spotify-api.vercel.app/api/playlists/3)
- [/api/playlists/35362](https://comp4513-spotify-api.vercel.app/api/playlists/35362)
- [/api/mood/dancing/5](https://comp4513-spotify-api.vercel.app/api/mood/dancing/5)
- [/api/mood/dancing/500](https://comp4513-spotify-api.vercel.app/api/mood/dancing/500)
- [/api/mood/dancing/ksdjf](https://comp4513-spotify-api.vercel.app/api/mood/dancing/ksdjf)
- [/api/mood/happy/8](https://comp4513-spotify-api.vercel.app/api/mood/happy/8)
- [/api/mood/happy](https://comp4513-spotify-api.vercel.app/api/mood/happy)
- [/api/mood/coffee/10](https://comp4513-spotify-api.vercel.app/api/mood/coffee/10)
- [/api/mood/studying/15](https://comp4513-spotify-api.vercel.app/api/mood/studying/15)
