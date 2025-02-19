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
      <h2 className="text-2xl font-semibold text-blue-600">請輸入電話及車牌</h2>
      <div className="flex flex-col items-center w-full space-y-4">
        <Input 
          className="w-[200px] border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
          placeholder="請輸入電話號碼" 
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
        <Input 
          className="w-[200px] border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
          placeholder="請輸入車牌號碼" 
          value={formData.license}
          onChange={(e) => handleInputChange('license', e.target.value)}
        />
      </div>
    </div>
  )
}
