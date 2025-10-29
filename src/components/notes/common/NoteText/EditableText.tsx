import { cn } from '@/utils';
import { useLayoutEffect, useRef } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onFocus?: () => void;
}

const EditableText = ({ value, onChange, placeholder, className, onFocus }: EditableTextProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const resizeObserver = new ResizeObserver(() => {
      adjustTextareaHeight();
    });

    resizeObserver.observe(textarea);

    return () => resizeObserver.disconnect();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      rows={1}
      className={cn(className, 'max-h-[750px] overflow-y-auto')}
      placeholder={placeholder}
      onFocus={onFocus}
    />
  );
};

export default EditableText;
