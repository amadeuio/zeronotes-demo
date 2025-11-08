import { IconButton } from '@/components';
import { useClickOutside } from '@/hooks';
import { useStore } from '@/store';
import { selectActions } from '@/store/selectors';
import { cn, getColorValue } from '@/utils';
import { useReducer, useState, type MouseEvent } from 'react';
import { Label, TextEdit } from '../..';
import { CreateToolbar } from './CreateToolbar';
import { initialState, noteReducer } from './reducer';

interface NoteCreateProps {
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const NoteCreate = ({ onClick, className }: NoteCreateProps) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  const { notes } = useStore(selectActions);
  const [isExpanded, setIsExpanded] = useState(false);
  const colorValue = getColorValue(state.colorId);

  const handleCreate = () => {
    if (!state.title && !state.content) {
      dispatch({ type: 'RESET' });
      setIsExpanded(false);
      return;
    }
    notes.add(state);
    dispatch({ type: 'RESET' });
  };

  const { triggerRef } = useClickOutside(handleCreate);

  return (
    <div
      ref={triggerRef}
      className={cn(
        'bg-base relative flex w-full max-w-[var(--width-note-expanded)] flex-col gap-4 rounded-lg border p-3.5 shadow-[0_1px_7px_rgba(0,0,0,0.8)] transition-colors duration-800 ease-in-out will-change-[background-color,border-color]',
        className,
      )}
      onClick={onClick}
      style={{
        backgroundColor: colorValue ?? 'var(--color-base)',
        borderColor: colorValue ?? 'var(--color-secondary)',
      }}
    >
      <TextEdit
        onFocus={() => setIsExpanded(true)}
        value={state.title}
        onChange={(value) => dispatch({ type: 'SET_TITLE', payload: value })}
        placeholder={isExpanded ? 'Title' : 'Take a note...'}
        isTitle={isExpanded}
      />
      {isExpanded && (
        <>
          <IconButton
            size={24}
            iconName="push_pin"
            label={state.isPinned ? 'Unpin note' : 'Pin note'}
            filled={state.isPinned}
            className="absolute top-2 right-2 p-1"
            iconClassName="text-neutral-300"
            onClick={() => dispatch({ type: 'TOGGLE_PINNED' })}
          />
          <TextEdit
            value={state.content}
            placeholder="Take a note..."
            onChange={(value) => dispatch({ type: 'SET_CONTENT', payload: value })}
          />
          {state.labels.length > 0 && (
            <div className="flex gap-1.5">
              {state.labels.map((label) => (
                <Label
                  key={label.id}
                  label={label}
                  onClose={() => dispatch({ type: 'REMOVE_LABEL', payload: label.id })}
                />
              ))}
            </div>
          )}
          <CreateToolbar state={state} dispatch={dispatch} />
        </>
      )}
    </div>
  );
};

export default NoteCreate;
