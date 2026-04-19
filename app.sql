-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.Contact (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  email text,
  question text,
  name text,
  contacted boolean DEFAULT false,
  CONSTRAINT Contact_pkey PRIMARY KEY (id)
);
CREATE TABLE public.blogs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text,
  image_url text,
  author text NOT NULL,
  email text NOT NULL,
  published boolean DEFAULT true,
  published_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT blogs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.push_tokens (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  token text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT push_tokens_pkey PRIMARY KEY (id)
);
CREATE TABLE public.tour_categories (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT tour_categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.tour_images (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  tour_id uuid NOT NULL,
  image_path text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT tour_images_pkey PRIMARY KEY (id),
  CONSTRAINT tour_images_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours(id)
);
CREATE TABLE public.tours (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  category_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  total_seats integer NOT NULL CHECK (total_seats > 0),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT tours_pkey PRIMARY KEY (id),
  CONSTRAINT tours_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.tour_categories(id)
);

bucket images;