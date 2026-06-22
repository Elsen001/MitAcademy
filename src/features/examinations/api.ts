import apiClient from '@/lib/api-client';
import type { ExaminationsResponse } from './types';

export async function fetchExaminations(): Promise<ExaminationsResponse> {
  const { data } = await apiClient.get<ExaminationsResponse>('/api/examinations/index');
  return data;
}
