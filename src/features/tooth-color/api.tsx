type FetchToothColorsParams = {
  pageIndex: number;
  pageSize: number;
  search?: string;
};

type ToothColor = {
  id: number;
  name: string;
  note: string;
};

type ApiResponse = {
  data: ToothColor[];
  total?: number;
};

export async function fetchToothColors({
  pageIndex,
  pageSize,
  search,
}: FetchToothColorsParams): Promise<ApiResponse> {
  const res = await fetch(
    `/api/tooth-colors?page=${pageIndex}&limit=${pageSize}&search=${search ?? ''}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch tooth colors');
  }

  return res.json();
}