import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect, useState, useRef, useMemo} from 'react'
import Modal from './components/modal'
import {Note, Priorities, EditedNote} from "./types";



function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)


  const [selectedPriority, setSelectedPriority] = useState<'all' | keyof Priorities>('all');
  const firstRender = useRef(true);

  const priorityColors: Record<"all" | keyof Priorities, string> = {
    all: 'rgb(166, 248, 166)',
    high: 'rgb(247, 139, 139)',
    medium: 'rgb(160, 175, 246)',
    low: 'rgb(242, 246, 118)'
  };

 
  const [notes, setNotes] = useState<Note[]>([]);


  const [note, setNote] = useState<Note>({
    title: "",
    description: "",
    priorities: {high: false, medium: false, low: false}
  });

  const [editedNote, setEditedNote] = useState<EditedNote>({
    enabled: false,
    note: {title: "", description: "", priorities: {high: false, medium:false, low:false}}
  })

  function addNote() {

    const hasPriority = Object.values(note.priorities).some((value) => value);

    if (note.title.trim() === '' || note.description.trim() === '' || (!hasPriority)){

      alert('Preencha as todos os campos');
      return
    }

    if (editedNote.enabled){
      saveEdit();
      return;
    }

   
    setNotes(prevNotes => [...prevNotes, note]);
    
    setNote({title: "", description: "", priorities: {high: false, medium:false, low:false}});
  }

  function removeNote(index: number){

    const removedNote = notes.filter((_, indexNumber) => indexNumber !== index);
    setNotes(removedNote)

  }

  function editNote(index: number){

    const note: Note = notes[index];

    setNote(note);

    setEditedNote({
      enabled: true,
      note: note
    })

  }

  function saveEdit(){

    const indexNote = notes.findIndex(note => note === editedNote.note); 

    const allNotes = [...notes];

    allNotes[indexNote] = note;
    setNotes(allNotes);

    setEditedNote({
      enabled: false,
      note: {
        title: "", description: "", priorities: {high: false, medium:false, low:false}
      }
    })

    setNote({
      title: "",
      description: "",
      priorities: {high: false, medium: false, low: false}
    })

  }

  useEffect(() =>{

    const saveNotes = localStorage.getItem('@cursoreact')
    if (saveNotes){

      const parsedNotes: Note[] = JSON.parse(saveNotes)
      setNotes(parsedNotes)
    }

  }, []);

  useEffect(() =>{

    if (firstRender.current){
      firstRender.current = false;
      return
    }
     
    localStorage.setItem('@cursoreact', JSON.stringify(notes));

  }, [notes])

  const totalTarefas = useMemo(() => {
    return notes.length;
  }, [notes])

  return (
    <>
      <header className='notes-header'>
        <h1 className='title'>Notas</h1>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </header>

      <div className='functionalitys'>
        <button aria-controls='form' onClick={() => setIsModalOpen(true)} >+</button>
        <p>{totalTarefas} Nota(s)!</p>
      </div>

      <h2 className='priority-title'>Priority order:</h2>

      <section className='priority-buttons'>
        <button className='priority-button' style={{ backgroundColor: priorityColors.all}} onClick={()=> setSelectedPriority('all')}>all</button>

       
        {Object.keys(note.priorities).map((key) => {
          const priorityKey = key as keyof Priorities;
          return (
            <button

              key={priorityKey}
              className='priority-button'
              style={{backgroundColor: priorityColors[priorityKey]}}
              onClick={() => setSelectedPriority(priorityKey)}>

              {priorityKey}
              
            </button>
          )
        })}
        
      </section>

      <section className='card-notes'>
        
        {
          notes.filter(note => selectedPriority === 'all' || note.priorities[selectedPriority as keyof Priorities]).map((note, index) => {
              
              let color = '';
              if (note.priorities.high) {
                color = 'rgb(213, 79, 79)';
              } else if (note.priorities.medium) {
                color = 'rgb(63, 83, 181)';
              } else if (note.priorities.low) {
                color = 'rgb(229, 236, 21)';
              }

              return (
                <article key={index} className='card-note'>
                  <div className='note-text'>
                    <div className="card-priority" style={{borderColor: color}}>
                      <i className="fa-solid fa-check-double" style={{color: color }}></i>
                      <p>{Object.keys(note.priorities).filter(key => note.priorities[key as keyof Priorities]).join(', ')} priority</p>
                    </div>
                    <h1 className='note-title'>{note.title}</h1>
                    <p className='note-description'>{note.description}</p>
                  </div>
                  <div className="note-icons" style={{color: color}}>
                    <i className="fa-regular fa-pen-to-square" onClick={() => {setIsModalOpen(true); editNote(index)} }></i>
                    <i className="fa-regular fa-trash-can" onClick={() => removeNote(index)}></i>
                  </div>
                </article>
              )
            })
        }
        
      </section>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          note={note}
          setNote={setNote}
          registerNote={addNote}
          isEditedNote={editedNote}
        />
      )}
      
    </>
  )
}

export default App
