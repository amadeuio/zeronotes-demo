import { cn } from '@/utils';
import { useEffect, useRef } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  className?: string;
  isTitle?: boolean;
}

const EditableText = ({
  value,
  onChange,
  placeholder,
  className,
  isTitle,
  onFocus,
}: EditableTextProps) => {
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

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      rows={1}
      className={cn('resize-none outline-none', isTitle && 'text-2xl font-semibold', className)}
      placeholder={placeholder}
      onFocus={onFocus}
    />
  );
};

export default EditableText;
