CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar,
  "password" varchar,
  "role" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "garden" (
  "id" integer PRIMARY KEY,
  "owner_id" integer,
  "garden_name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "plant" (
  "id" integer PRIMARY KEY,
  "garden_id" integer,
  "plant_name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "recommendation" (
  "id" integer PRIMARY KEY,
  "plant_id" integer,
  "recommendation_text" text,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "plant_type" (
  "id" integer PRIMARY KEY,
  "plant_id" integer,
  "type_name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "forum" (
  "id" integer PRIMARY KEY,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "thread" (
  "id" integer PRIMARY KEY,
  "forum_id" integer,
  "title" varchar,
  "content" text,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "post" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "thread_id" integer,
  "title" varchar,
  "content" text,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "shop" (
  "id" integer PRIMARY KEY,
  "shop_name" varchar,
  "location" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "product" (
  "id" integer PRIMARY KEY,
  "shop_id" integer,
  "product_name" varchar,
  "price" decimal,
  "description" text,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "sensor" (
  "id" integer PRIMARY KEY,
  "garden_id" integer,
  "sensor_name" varchar,
  "sensor_type" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "weather_data" (
  "id" integer PRIMARY KEY,
  "garden_id" integer,
  "temperature" decimal,
  "humidity" decimal,
  "precipitation" decimal,
  "recorded_at" timestamp
);

CREATE TABLE "tasks" (
  "id" integer PRIMARY KEY,
  "garden_id" integer,
  "task_description" text,
  "due_date" timestamp
);

CREATE TABLE "events_calendar" (
  "id" integer PRIMARY KEY,
  "garden_id" integer,
  "event_name" varchar,
  "event_date" timestamp
);

CREATE TABLE "transactions" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "product_id" integer,
  "quantity" integer,
  "total_amount" decimal,
  "transaction_date" timestamp
);

CREATE TABLE "user_reviews" (
  "id" integer PRIMARY KEY,
  "product_id" integer,
  "user_id" integer,
  "review_text" text,
  "rating" decimal,
  "review_date" timestamp
);

ALTER TABLE "garden" ADD FOREIGN KEY ("owner_id") REFERENCES "user" ("id");

ALTER TABLE "plant" ADD FOREIGN KEY ("garden_id") REFERENCES "garden" ("id");

ALTER TABLE "recommendation" ADD FOREIGN KEY ("plant_id") REFERENCES "plant" ("id");

ALTER TABLE "plant_type" ADD FOREIGN KEY ("plant_id") REFERENCES "plant" ("id");

ALTER TABLE "thread" ADD FOREIGN KEY ("forum_id") REFERENCES "forum" ("id");

ALTER TABLE "post" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "post" ADD FOREIGN KEY ("thread_id") REFERENCES "thread" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("shop_id") REFERENCES "shop" ("id");

ALTER TABLE "sensor" ADD FOREIGN KEY ("garden_id") REFERENCES "garden" ("id");

ALTER TABLE "weather_data" ADD FOREIGN KEY ("garden_id") REFERENCES "garden" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("garden_id") REFERENCES "garden" ("id");

ALTER TABLE "events_calendar" ADD FOREIGN KEY ("garden_id") REFERENCES "garden" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "user_reviews" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "user_reviews" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
