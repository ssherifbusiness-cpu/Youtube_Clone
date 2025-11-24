--Get video by date uploaded DECENDING
SELECT
  v.video_id,
  v.video_views,
  v.date_uploaded,
  v.video_title
FROM
  video v
JOIN
  channel c ON v.channel_id = c.channel_id
WHERE
  c.channel_id = ${channel_id}
AND
  v.is_short = FALSE
ORDER BY
  v.date_uploaded DESC;
--Get video by video views DECENDING
 SELECT
  v.video_id,
  v.video_views,
  v.date_uploaded,
  v.video_title
FROM
  video v
JOIN
  channel c ON v.channel_id = c.channel_id
WHERE
  c.channel_id = ${channel_id}
AND
  v.is_short = FALSE
ORDER BY 
  v.video_views DESC;
--Get video by date uploaded ASCENDING
 SELECT
  v.video_id,
  v.video_views,
  v.date_uploaded,
  v.video_title
FROM
  video v
JOIN
  channel c ON v.channel_id = c.channel_id
WHERE
  c.channel_id = ${channel_id}
ORDER BY 
  v.date_uploaded ASC;
--Get short by date uploaded DECENDING
SELECT
  v.video_id,
  v.video_views,
  v.date_uploaded,
  v.video_title
FROM
  video v
JOIN
  channel c ON v.channel_id = c.channel_id
WHERE
  c.channel_id = ${channel_id}
AND
  v.is_short = TRUE
ORDER BY
  v.date_uploaded DESC;
--Get short by video views DECENDING
 SELECT
  v.video_id,
  v.video_views,
  v.date_uploaded,
  v.video_title
FROM
  video v
JOIN
  channel c ON v.channel_id = c.channel_id
WHERE
  c.channel_id = ${channel_id}
AND
  v.is_short = TRUE
ORDER BY
  v.video_views DESC;
--Get short by date uploaded ASCENDING
SELECT
  v.video_id,
  v.video_views,
  v.date_uploaded,
  v.video_title
FROM
  video v
JOIN
  channel c ON v.channel_id = c.channel_id
WHERE
  c.channel_id = ${channel_id}
AND
  v.is_short = TRUE
ORDER BY
  v.date_uploaded ASC;
--Get public playlists from ACCOUNT
SELECT
  p.playlist_id,
  p.playlist_title,
  p.date_created,
  COUNT(v.video_id) AS number_of_videos
FROM
  playlist p
JOIN
  video v ON p.video_id = v.video_id
WHERE
  p.channel_id = ${channel_id}
AND
  p.is_public = TRUE;
--Get posts
SELECT
  p.post_id,
  p.post_content,
  p.date_uploaded
FROM
  Post p
WHERE
  p.channel_id = ${channel_id}
ORDER BY
  v.date_uploaded DESC;
--Subscribe to account

