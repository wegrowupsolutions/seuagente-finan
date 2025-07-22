-- Enable RLS on the existing table_name table
ALTER TABLE public.table_name ENABLE ROW LEVEL SECURITY;

-- Create basic policy for table_name (since it's unclear what this table is for)
CREATE POLICY "Enable read access for all users" ON public.table_name
FOR SELECT USING (true);

-- Fix function search path for security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;