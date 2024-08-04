import { SupabaseClient } from '@supabase/supabase-js';
import configuration from '~/configuration';
import useSupabase from '~/core/hooks/use-supabase';

export const useUploadFile = () => {
  const client = useSupabase();

  return async (file: File) => {
    const { data, error } = await client.storage
      .from(configuration.storage.bucket_name)
      .upload(file.name + '-' + crypto.randomUUID(), file);

    if (error) {
      throw error;
    }

    return data;
  };
};
