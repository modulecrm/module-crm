
import { supabase } from '@/integrations/supabase/client';

interface CreateFeatureRequestData {
  title: string;
  description: string;
  module: string;
  userId: string;
  voteAllocation: number;
}

export const createFeatureRequestWithVotes = async ({
  title,
  description,
  module,
  userId,
  voteAllocation,
}: CreateFeatureRequestData) => {
  // Create the feature request
  const { data: featureRequest, error: createError } = await supabase
    .from('feature_requests')
    .insert({
      title: title.trim(),
      description: description.trim(),
      module,
      created_by: userId,
    })
    .select()
    .single();

  if (createError) throw createError;

  // Add votes if allocation > 0
  if (voteAllocation > 0) {
    const { error: voteError } = await supabase
      .from('feature_votes')
      .insert({
        feature_id: featureRequest.id,
        user_id: userId,
        votes_allocated: voteAllocation,
      });

    if (voteError) throw voteError;
  }

  return featureRequest;
};
