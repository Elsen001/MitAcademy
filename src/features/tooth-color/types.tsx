export type ToothColor = {
  id: number;
  name: string;
  note: string;
};

type ApiResponse = {
  data: ToothColor[];
  total?: number;
};

export async function fetchToothColors(params: {
  pageIndex: number;
  pageSize: number;
  search?: string;
}): Promise<ApiResponse> {
  const res = await fetch(
    `/api/tooth-colors?page=${params.pageIndex}&limit=${params.pageSize}&search=${params.search ?? ''}`
  );

  if (!res.ok) {
    throw new Error('API error');
  }

  return res.json();
}