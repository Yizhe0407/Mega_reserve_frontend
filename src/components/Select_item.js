import React from 'react'
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SERVICE_ITEMS = ['保養', '換輪胎', '板金烤漆', '更換零件', '其他'];

export default function Select_item({ formData, setFormData }) {
  const handleItemClick = (item) => {
    setFormData(prev => {
      const selectedItems = [...prev.selectedItems];
      const isOtherItem = item === '其他';
      const hasOther = selectedItems.some(i => i.startsWith('其他'));

      if (isOtherItem) {
        if (hasOther) {
          return {
            ...prev,
            selectedItems: selectedItems.filter(i => !i.startsWith('其他')),
            otherDescription: ''
          };
        }
        return {
          ...prev,
          selectedItems: [...selectedItems, '其他'],
          otherDescription: ''
        };
      }

      const itemIndex = selectedItems.indexOf(item);
      if (itemIndex > -1) {
        selectedItems.splice(itemIndex, 1);
      } else {
        selectedItems.push(item);
      }
      return { ...prev, selectedItems };
    });
  };

  const handleOtherDescription = (e) => {
    const newValue = e.target.value;
    setFormData(prev => ({
      ...prev,
      selectedItems: [
        ...prev.selectedItems.filter(item => !item.startsWith('其他')),
        newValue ? `其他(${newValue})` : '其他'
      ],
      otherDescription: newValue
    }));
  };

  return (
    <div className='flex flex-col gap-4 w-[250px]'>
      <h2 className="text-2xl text-center font-semibold text-blue-600">預約項目</h2>
      <p className="text-sm text-start text-gray-400">可一次預約多項目</p>

      {SERVICE_ITEMS.map((item) => {
        const isSelected = item === '其他' ?
          formData.selectedItems.some(i => i.startsWith('其他')) :
          formData.selectedItems.includes(item);

        return (
          <Button
            key={item}
            onClick={() => handleItemClick(item)}
            className={`${isSelected ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} 
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
