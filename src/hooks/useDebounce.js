import { useEffect, useState } from 'react';
// * đây là hook debounce - hook này có nhiệm vụ delay hành động ta muốn thực thi
// * chẳng hạn như search có sự kiện onChange, ta không debounce thì khi user nhập thông tin vào component sẽ rerender liên tục

export default function useDebounce(initialValue = '', delay = 1000) {
  const [debounceValue, setDebounceValue] = useState(initialValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initialValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initialValue]);
  // * Hiểu đơn giản là thay vì viết setTimeOut dài dòng vào hàm handle, ta dùng useEffect để viết setTimeout, và clean setTimeout,
  // * cài đặt initialValue nghĩa là giá trị mà ta muốn delay
  return debounceValue;
}
