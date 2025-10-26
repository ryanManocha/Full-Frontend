// Supabase client configuration
import { createClient } from '@supabase/supabase-js';
import { API_CONFIG } from '../config/environment';

// Create Supabase client
const supabaseUrl = API_CONFIG.SUPABASE_URL;
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjY3psY3R5aG9xY2d4dHZmb2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NjE0NjYsImV4cCI6MjA3NzAzNzQ2Nn0.0UtyZRUm3ajWe4GEZuEAM_cqvr2EFTpGSKbPXkKKhBE';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch training images for a specific job
export const fetchTrainingImages = async (jobId) => {
  try {
    const { data, error } = await supabase
      .from('training_images')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching training images:', error);
    throw error;
  }
};

// Get image count for a job
export const getImageCount = async (jobId) => {
  try {
    const { count, error } = await supabase
      .from('training_images')
      .select('*', { count: 'exact', head: true })
      .eq('job_id', jobId);

    if (error) {
      console.error('Supabase count error:', error);
      throw error;
    }

    return count || 0;
  } catch (error) {
    console.error('Error getting image count:', error);
    throw error;
  }
};

export default supabase;

