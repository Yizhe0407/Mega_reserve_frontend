import React from 'react'
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Select_item({ formData, setFormData }) {
  const handleItemClick = (item) => {
    setFormData(prev => {
      const selectedItems = prev.selectedItems.includes(item)
        ? prev.selectedItems.filter(i => i !== item)
        : [...prev.selectedItems, item];
      // 如果取消選擇"其他"，清空問題描述
      const otherDescription = !selectedItems.includes('其他') ? '' : prev.otherDescription;
      return { ...prev, selectedItems, otherDescription };
    });
  };

  const handleOtherDescription = (e) => {
    setFormData(prev => ({
      ...prev,
      otherDescription: e.target.value
    }));
  };

  return (
    <div className='flex flex-col gap-4'>
      <p className="text-center text-lg">可一次預約多項目</p>

      {['保養', '換輪胎', '板金烤漆', '更換零件', '其他'].map((item) => (
        <Button
          key={item}
          onClick={() => handleItemClick(item)}
          className={`${formData.selectedItems.includes(item) ? 'bg-blue-600' : 'bg-white'} 
            text-${formData.selectedItems.includes(item) ? 'white' : 'blue-600'} 
            border border-blue-600 hover:bg-blue-600 hover:text-white`}
        >
          {item}
        </Button>
      ))}

      {formData.selectedItems.includes('其他') && (
        <div className="mt-2">
          <Input
            type="text"
            placeholder="請描述您的問題"
            value={formData.otherDescription || ''}
            onChange={handleOtherDescription}
            className="w-full"
            required
          />
        </div>
      )}
    </div>
  )
}
