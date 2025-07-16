import React from 'react';
import { DollarSign, FileText, Download, Plus, Eye, CreditCard, Receipt, TrendingUp } from 'lucide-react';
import { generateInvoicePDF } from '../../utils/pdfGenerator';

const BillingManagement: React.FC = () => {
  const mockInvoices = [
    {
      id: 'INV-001',
      patientName: 'John Doe',
      patientId: '1',
      date: '2024-01-25',
      amount: 450.00,
      status: 'paid',
      services: ['Consultation', 'Blood Test', 'X-Ray'],
      insurance: 'Blue Cross Blue Shield'
    },
    {
      id: 'INV-002',
      patientName: 'Sarah Johnson',
      patientId: '2',
      date: '2024-01-24',
      amount: 320.00,
      status: 'pending',
      services: ['Consultation', 'Prescription'],
      insurance: 'Aetna'
    },
    {
      id: 'INV-003',
      patientName: 'Michael Brown',
      patientId: '3',
      date: '2024-01-23',
      amount: 180.00,
      status: 'overdue',
      services: ['Consultation'],
      insurance: 'Cigna'
    },
    {
      id: 'INV-004',
      patientName: 'Emily Davis',
      patientId: '4',
      date: '2024-01-22',
      amount: 750.00,
      status: 'paid',
      services: ['Surgery Consultation', 'MRI Scan', 'Follow-up'],
      insurance: 'Medicare'
    },
    {
      id: 'INV-005',
      patientName: 'Robert Wilson',
      patientId: '5',
      date: '2024-01-21',
      amount: 95.00,
      status: 'pending',
      services: ['Routine Checkup'],
      insurance: 'United Healthcare'
    }
  ];

  const generateInvoice = () => {
    const randomPatients = ['Alice Smith', 'Bob Johnson', 'Carol Williams', 'David Brown', 'Eva Davis'];
    const randomServices = [
      ['Consultation', 'Blood Test'],
      ['X-Ray', 'Consultation'],
      ['MRI Scan', 'Consultation', 'Follow-up'],
      ['Surgery', 'Anesthesia', 'Recovery'],
      ['Physical Therapy', 'Consultation'],
      ['Emergency Care', 'Medication'],
      ['Dental Cleaning', 'Consultation']
    ];
    
    const randomPatient = randomPatients[Math.floor(Math.random() * randomPatients.length)];
    const randomServiceSet = randomServices[Math.floor(Math.random() * randomServices.length)];
    const randomAmount = Math.random() * 800 + 100;
    const invoiceId = `INV-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
    
    const newInvoice = {
      id: invoiceId,
      patientName: randomPatient,
      patientId: `P${Math.floor(Math.random() * 9999)}`,
      date: new Date().toISOString().split('T')[0],
      amount: randomAmount,
      status: 'pending',
      services: randomServiceSet,
      insurance: 'Processing'
    };
    
    const pdf = generateInvoicePDF(newInvoice);
    pdf.save(`invoice-${invoiceId}.pdf`);
  };

  const downloadInvoice = (invoice: any) => {
    const pdf = generateInvoicePDF(invoice);
    pdf.save(`invoice-${invoice.id}.pdf`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Billing Management</h1>
        <div className="flex space-x-3">
          <button 
            onClick={generateInvoice}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Generate Invoice</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <FileText className="h-4 w-4" />
            <span>New Bill</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Receipt className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-800">{mockInvoices.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                ${mockInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Invoices</p>
              <p className="text-2xl font-bold text-gray-800">
                {mockInvoices.filter(inv => inv.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Outstanding</p>
              <p className="text-2xl font-bold text-gray-800">
                ${mockInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods & Processing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Credit Card Processing</h3>
                <p className="text-sm text-gray-600">Secure payment processing with major cards</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Insurance Claims</h3>
                <p className="text-sm text-gray-600">Automated insurance claim processing</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Receipt className="h-6 w-6 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Payment Plans</h3>
                <p className="text-sm text-gray-600">Flexible payment plan options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Invoices</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{invoice.patientName}</div>
                      <div className="text-gray-500">ID: {invoice.patientId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => alert(`Viewing invoice ${invoice.id} for ${invoice.patientName}`)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title="View Invoice"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => downloadInvoice(invoice)}
                        className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                        title="Download Invoice"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingManagement;