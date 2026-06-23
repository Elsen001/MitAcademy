import apiClient from '@/lib/api-client';
import type { ExaminationsResponse } from './types';

export async function fetchExaminations(): Promise<ExaminationsResponse> {
  const { data } = await apiClient.get<ExaminationsResponse>('/api/examinations/index');
  return data;
}
// api.ts — add this alongside fetchExaminations
export async function storeExamination(payload: {
  doctor_id?: string | number;
  patient_id?: string | number;
  referrer_id?: string | number;
  service_id?: string | number;
  price?: string;
  discount?: string;
  channel_id?: string;
  cabinet_id?: string;
  entry_date?: string;
  teeth: number[];
  note?: string;
}) {
  const res = await fetch('/api/examinations/store', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to store examination');
  }
  return res.json();
}