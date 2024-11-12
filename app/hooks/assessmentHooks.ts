import { useQuery, useMutation, useQueryClient } from 'react-query';
import useAssessmentStore from '../assessmentState';

export function useFetchAssessment() {
  return useQuery('fetchAssessment', async () => {
    const response = await fetch('/api/assessment', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      throw new Error('Failed to fetch assessment');
    }

    const json  = await response.json();
    return json.data.json_blob;
  }, {
    onError: (error) => {
      console.error('Error fetching assessment:', error);
    }
  });
}

export function useSaveAssessment() {
  const queryClient = useQueryClient();
  const sections = useAssessmentStore((state) => state.sections);

  return useMutation(async () => {
    const response = await fetch('/api/assessment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sections),
    });

    if (!response.ok) {
      throw new Error('Failed to save assessment');
    }

    const result = await response.json();
    console.log('Assessment saved successfully:', result);
    return result;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchAssessment');
    },
    onError: (error) => {
      console.error('Error saving assessment:', error);
    }
  });
}
