export interface Priorities{
    high: boolean;
    medium: boolean;
    low: boolean;
}
  
export interface Note{
    title: string;
    description: string;
    priorities: Priorities;
}


export interface ModalProps{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    note: Note;
    setNote: React.Dispatch<React.SetStateAction<Note>>;
    registerNote: () => void;
}
