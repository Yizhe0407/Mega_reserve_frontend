import React from 'react'
import { Input } from './ui/input'


export default function PhoneLicense({ formData, setFormData }) {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className='flex flex-col items-center max-w-md mx-auto w-full p-6 space-y-6'>
      <h2 className="text-2xl font-semibold text-blue-600">兆豐輪胎預約系統</h2>
      <div className="flex flex-col w-full space-y-4">
        <div className="flex flex-col space-y-2">
          <p className="items-start">手機號碼︰</p>
          <Input 
            className="w-full border-2 items-center border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
            placeholder="請輸入手機號碼" 
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="items-start">車牌號碼︰</p>
          <Input 
            className="w-full border-2 items-center border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
            placeholder="請輸入車牌號碼" 
            value={formData.license}
            onChange={(e) => handleInputChange('license', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
