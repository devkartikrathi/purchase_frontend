import React from 'react';
import { Link } from 'react-router-dom';
import { Receipt, Plus } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Receipt className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold text-gray-900">Purchase Manager</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/add-invoice"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Invoice</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}