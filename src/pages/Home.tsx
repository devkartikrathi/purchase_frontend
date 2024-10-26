import React, { useEffect, useState } from 'react';
import { FileText, ArrowRight, Upload, Bell } from 'lucide-react';
import { getInvoices } from '../services/invoices';

const steps = [
  {
    icon: <Upload className="h-6 w-6" />,
    title: 'Upload Invoice',
    description: 'Add your purchase receipts and warranty documents',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Track Details',
    description: 'Keep track of warranty periods and purchase information',
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: 'Get Notified',
    description: 'Receive alerts before warranty expiration',
  },
];

export function Home() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
      } catch (err) {
        setError('Failed to load invoices');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Purchase Manager</h1>
        <p className="mt-4 text-xl text-gray-600">
          Keep track of your purchases and warranties in one place
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Invoices</h2>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}
        {isLoading ? (
          <div className="text-center py-4">Loading invoices...</div>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice: any) => (
              <div
                key={invoice._id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{invoice.productName}</h3>
                  <p className="text-sm text-gray-500">
                    Purchased on {new Date(invoice.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}