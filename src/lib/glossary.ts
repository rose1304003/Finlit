import { supabase } from "@/integrations/supabase/client";

export interface GlossaryTerm {
  id: string;
  term_uz: string;
  term_ru: string;
  term_en: string;
  definition_uz: string;
  definition_ru: string;
  definition_en: string;
  created_at: string;
}

export async function fetchGlossary(): Promise<GlossaryTerm[]> {
  const { data, error } = await supabase
    .from("glossary_terms" as any)
    .select("*")
    .order("term_uz", { ascending: true });

  if (error) throw error;
  return (data || []) as unknown as GlossaryTerm[];
}
