import { useClickOutside } from '@/hooks';
import { useActions } from '@/store';
import { cn } from '@/utils';
import { useReducer, useState, type MouseEvent } from 'react';
import { Label, NoteText } from '../common';
import NoteToolbar from './Toolbar';
import { initialState, noteReducer } from './reducer';

interface NoteCreateProps {
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const NoteCreate = ({ onClick, className }: NoteCreateProps) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  const { notes } = useActions();
  const [isExpanded, setIsExpanded] = useState(false);

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
        'bg-base shadow-base flex w-full max-w-[var(--width-note-expanded)] flex-col gap-6 rounded-lg border p-4',
        className,
      )}
      onClick={onClick}
    >
      <NoteText
        onFocus={() => setIsExpanded(true)}
        value={state.title}
        onChange={(value) => dispatch({ type: 'SET_TITLE', payload: value })}
        placeholder={isExpanded ? 'Title' : 'Take a note...'}
        isTitle={isExpanded}
      />
      {isExpanded && (
        <>
          <NoteText
            value={state.content}
            placeholder="Take a note..."
            onChange={(value) => dispatch({ type: 'SET_CONTENT', payload: value })}
          />
          <div className="flex gap-2">
            {state.labels.map((label) => (
              <Label
                key={label.id}
                label={label}
                onClose={() => dispatch({ type: 'REMOVE_LABEL', payload: label.id })}
              />
            ))}
          </div>
          <NoteToolbar state={state} dispatch={dispatch} />
        </>
      )}
    </div>
  );
};

export default NoteCreate;
