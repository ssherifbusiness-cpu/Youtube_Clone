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
--List all users and number of videos they've uploaded 
SELECT 
  u.user_id,
  u.username,
  COUNT(v.video_id) AS total_videos
FROM 
  users u
LEFT JOIN 
  video v ON u.user_id = v.user_id
GROUP BY 
  u.user_id;
--Get most popular playlist 
SELECT 
  p.playlist_id,
  p.playlist_title,
  COUNT(v.video_id) AS video_count
FROM 
  playlist p
JOIN 
  video v ON p.playlist_id = v.playlist_id
GROUP BY 
  p.playlist_id
ORDER BY 
  video_count DESC
LIMIT 1;
-- Get all channels with more than 1000 Subscribers
SELECT 
  c.channel_id,
  c.channel_name,
  COUNT(s.user_id) AS subscriber_count
FROM 
  channel c
JOIN 
  subscriptions s ON c.channel_id = s.channel_id
GROUP BY 
  c.channel_id
HAVING 
  COUNT(s.user_id) > 1000;

--Subscribe to channel 
DELIMITER //
CREATE PROCEDURE SubscribeUserToChannel(IN user_id INT, IN channel_id INT)
BEGIN
    INSERT INTO subscriptions (user_id, channel_id)
    VALUES (user_id, channel_id);
END //
DELIMITER ;
--Unsubscribe to channel 
DELIMITER //
CREATE PROCEDURE UnSubscribeUserToChannel(IN user_id INT, IN channel_id INT)
BEGIN
  DELETE FROM subscriptions
  WHERE user_id = ${user_id} AND channel_id = ${channel_id};
END //
DELIMITER ;
--Get total number of videos posted by channel
SELECT c.channel_id, c.channel_name, COUNT(v.video_id) AS total_videos
FROM channel c
LEFT JOIN video v ON c.channel_id = v.channel_id
GROUP BY c.channel_id;
--Get most popular video of last {x} days (trending)
DELIMITER //
CREATE PROCEDURE GetPopularVideosLastWeek()
BEGIN
    SELECT v.video_id, v.video_title, v.video_views
    FROM video v
    WHERE v.date_uploaded >= CURDATE() - INTERVAL {x} DAY
    ORDER BY v.video_views DESC;
END //
DELIMITER ;
