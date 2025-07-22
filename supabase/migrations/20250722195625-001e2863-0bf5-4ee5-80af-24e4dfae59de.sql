-- Add new fields to products table for editing functionality
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS commission_rate DECIMAL(5,2) DEFAULT 0.00;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS facebook_pixel TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS google_analytics_pixel TEXT;