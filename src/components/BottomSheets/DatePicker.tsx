import { useState, useRef, useEffect } from "react";
import * as S from "./DatePicker.styles";

interface ScrollPickerProps {
    list: (string | number)[];
    onSelectedChange?: (selected: string | number) => void;
}

const DatePicker = ({ list, onSelectedChange }: ScrollPickerProps) => {
    const SCROLL_DEBOUNCE_TIME = 100; // 스크롤 이벤트의 디바운스 시간을 설정합니다
    
    const newList = ["", ...list, ""];
    const ref = useRef<HTMLUListElement>(null);
    const [selected, setSelected] = useState(1);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const ITEM_HEIGHT = 50;
    
    const handleScroll = () => {
        if (ref.current) {
            // 스크롤 이벤트가 발생할 때마다 이전에 설정된 디바운스 타이머를 초기화합니다.
            clearTimeout(timerRef.current!);
      
            // 스크롤 위치가 맨 앞의 빈 문자열을 가리키지 않게합니다.
            if (ref.current.scrollTop < ITEM_HEIGHT) {
              ref.current.scrollTop = ITEM_HEIGHT;
            }
      
            // 일정시간이 지난 후에 스크롤 위치를 계산 및 이동합니다.
            timerRef.current = setTimeout(() => {
              const index = Math.floor(
                (ref.current!.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT,
              );
      
              // 맨 앞, 뒤 값일 경우 무시
              if (list[index] !== "") {
                setSelected(index);
                itemRefs.current[index]?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
                onSelectedChange && onSelectedChange(newList[index]);
              }
            }, SCROLL_DEBOUNCE_TIME);
          }
    }
    
    useEffect(() => {
        if (ref.current) {
          ref.current.scrollTop = selected * ITEM_HEIGHT;
        }
    }, []);

    return (
        <S.List ref={ref} onScroll={handleScroll}>
            <S.ListCenter />
            {newList.map((item, index) => (
            <S.ListItem
                key={index}
                isSelected={index === selected}
                ref={(el) => (itemRefs.current[index] = el)}
            >
                {item}
            </S.ListItem>
            ))}
        </S.List>
    );
}

export default DatePicker;