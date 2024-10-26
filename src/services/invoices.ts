import api from './api';

export interface InvoiceData {
  productName: string;
  purchaseDate: string;
  storeName: string;
  warrantyPeriod: string;
  customerCare: string;
  image?: File;
}

export const addInvoice = async (data: InvoiceData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });

  const response = await api.post('/invoices', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getInvoices = async () => {
  const response = await api.get('/invoices');
  return response.data;
};