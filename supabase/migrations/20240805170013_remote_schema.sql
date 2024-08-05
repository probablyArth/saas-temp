alter table "public"."tasks" drop column "description";

alter table "public"."tasks" drop column "due_date";

alter table "public"."tasks" add column "enrich" jsonb;

alter table "public"."tasks" add column "pdf_path" text;


