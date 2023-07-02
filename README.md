<div align="center">
<samp>

# Orgel-si-bot

## Bot for Discord that can play YouTube videos

</samp>
</div>

## Requirements

- Docker
- Docker Compose

### Environment variables

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/postgres?schema=public"
DISCORD_TOKEN=<YOUR_DISCORD_TOKEN>
API_ENDPOINT=http://server:3000
```

## Usage

```bash
cd orgel-si-bot
```

```bash
docker compose up --build -d
```

```bash
docker compose exec server /bin/bash
```

```bash
pnpm prisma:init
```

Then, restart containers.

## Commands

### /info

Fetch the information of the specified video.

#### Arguments

- `video_url`: Youtube Video URL

### /play

Play the specified video.

#### Arguments

- `video_url`: Youtube Video URL
- `interrupt`(optional): Interrupt at the head of the queue

### /skip

Skip the current video.

### /resume

Resume playback.

### /history

Show the playback history.

#### Arguments

- `limit`(optional): Number of histories to display

### /queue

Show the playback queue.

### /settings

Configure the Orgel.

#### language

Change the language of the Orgel.

#### Arguments

- `language`: EN or JA

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/airRnot1106/orgel-si-bot/blob/main/LICENSE) file for details.
