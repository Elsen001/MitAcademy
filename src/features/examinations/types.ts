export type Examination = Record<string, unknown>;

export type ExaminationsData = {
  examinations: Examination[];
  total_price: number;
  total_final_price: number;
  total_payment: number;
  total_debt: number;
};

export type ExaminationsResponse = {
  message: string;
  data: ExaminationsData;
  meta: {
    total: number;
    limit: number;
    page: number;
  };
};
