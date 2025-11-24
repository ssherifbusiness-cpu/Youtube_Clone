CREATE TABLE IF NOT EXISTS channel(
  channel_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  channel_name VARCHAR(255),
  date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tag(
  tag_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  tag_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS video(
  video_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  channel_id BIGINT,
  tag_id BIGINT,
  video_url VARCHAR(255),
  thumbnail_url VARCHAR(255),
  video_author VARCHAR(255),
  video_title VARCHAR(255),
  date_uploaded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  video_views INT DEFAULT 0,
  is_short BOOL NOT NULL,
  FOREIGN KEY (tag_id) REFERENCES tag(tag_id),
  FOREIGN KEY (channel_id) REFERENCES channel(channel_id)
);

CREATE TABLE IF NOT EXISTS video_reaction(
  reaction_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  video_id BIGINT,
  reaction_type BOOL,
  FOREIGN KEY(video_id) REFERENCES video(video_id)
);

CREATE TABLE IF NOT EXISTS post(
  post_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  channel_id BIGINT,
  date_uploaded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  post_author VARCHAR(255),
  post_content VARCHAR(255),
  FOREIGN KEY (channel_id) REFERENCES channel(channel_id)
);

CREATE TABLE IF NOT EXISTS post_reaction(
  reaction_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  post_id BIGINT,
  reaction_type BOOL,
  FOREIGN KEY(post_id) REFERENCES post(post_id)
);

CREATE TABLE IF NOT EXISTS comment(
  comment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  parent_comment_id BIGINT DEFAULT NULL,
  video_id BIGINT,
  contents VARCHAR(255),
  date_uploaded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(video_id) REFERENCES video(video_id),
  FOREIGN KEY(parent_comment_id) REFERENCES comment(comment_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comment_reaction(
  reaction_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  comment_id BIGINT,
  reaction_type BOOL,
  FOREIGN KEY(comment_id) REFERENCES comment(comment_id)
);

CREATE TABLE IF NOT EXISTS playlist(
  playlist_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  video_id BIGINT,
  channel_id BIGINT,
  is_public BOOL NOT NULL,
  playlist_title VARCHAR(255),
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (video_id) REFERENCES video(video_id),
  FOREIGN KEY (channel_id) REFERENCES channel(channel_id)
);

CREATE TABLE IF NOT EXISTS subscription(
  subscription_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  channel_id BIGINT,
  date_subscribed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (channel_id) REFERENCES channel(channel_id)
);
