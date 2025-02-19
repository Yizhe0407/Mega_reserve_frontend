import React from 'react'
import { Input } from './ui/input'


export default function PhoneLicense({ formData, setFormData }) {
  const handleInputChange = (field, value) => {
    // 如果是車牌號碼，則轉換為大寫
    const processedValue = field === 'license' ? value.toUpperCase() : value;
    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));
  };

  return (
    <div className='flex flex-col items-center max-w-md mx-auto w-[250px] space-y-6'>
      <h2 className="text-2xl font-semibold text-blue-600">兆豐輪胎預約系統</h2>
      <div className="flex flex-col gap-2">
        <h3 className="text-center">預約注意事項</h3>
        <div className="flex border border-gray-400 rounded-lg w-full h-full p-4">
          <p className="text-sm">
            若預約失敗，請致電04-24220080預約，謝謝！
          </p>
        </div>
      </div>
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
