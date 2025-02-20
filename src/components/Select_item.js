import React from 'react'
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Select_item({ formData, setFormData }) {
  const handleItemClick = (item) => {
    setFormData(prev => {
      let selectedItems = [...prev.selectedItems];
      
      if (item === '其他') {
        // 如果點擊「其他」選項
        if (selectedItems.includes('其他') || selectedItems.some(i => i.startsWith('其他('))) {
          // 如果已經選中「其他」，則移除「其他」和相關描述
          selectedItems = selectedItems.filter(i => !i.startsWith('其他'));
          return { ...prev, selectedItems, otherDescription: '' };
        } else {
          // 如果未選中「其他」，則添加「其他」
          selectedItems.push('其他');
          return { ...prev, selectedItems, otherDescription: '' };
        }
      } else {
        // 處理其他選項的點擊
        if (selectedItems.includes(item)) {
          selectedItems = selectedItems.filter(i => i !== item);
        } else {
          selectedItems.push(item);
        }
        return { ...prev, selectedItems };
      }
    });
  };

  const handleOtherDescription = (e) => {
    const newValue = e.target.value;
    setFormData(prev => {
      // 從選中項目中移除舊的描述（如果存在）
      const filteredItems = prev.selectedItems.filter(item => 
        !item.startsWith('其他')
      );
      
      // 添加新的描述
      const selectedItems = [
        ...filteredItems,
        newValue ? `其他(${newValue})` : '其他'
      ];

      return {
        ...prev,
        selectedItems,
        otherDescription: newValue
      };
    });
  };

  return (
    <div className='flex flex-col gap-4 w-[250px]'>
      <h2 className="text-2xl text-center font-semibold text-blue-600">預約項目</h2>
      <p className="text-sm text-start text-gray-400">可一次預約多項目</p>

      {['保養', '換輪胎', '板金烤漆', '更換零件', '其他'].map((item) => {
        const isSelected = item === '其他' ?
          formData.selectedItems.some(i => i.startsWith('其他')) :
          formData.selectedItems.includes(item);

        return (
          <Button
            key={item}
            onClick={() => handleItemClick(item)}
            className={`${isSelected ? 'bg-blue-600' : 'bg-white'} 
              ${isSelected ? 'text-white' : 'text-blue-600'} 
              border border-blue-600 hover:bg-blue-600 hover:text-white w-full transition-colors duration-200 touch-manipulation active:bg-blue-700`}
          >
            {item}
          </Button>
        );
      })}

      {formData.selectedItems.some(item => item.startsWith('其他')) && (
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
      <p className="text-sm text-start text-gray-500">⚠️若取消點選無反應，請輕觸空白處</p>
    </div>
  )
}
