import { ModalProps } from '../types';
import React from 'react';


const BACKGROUND_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'rgb(0, 0, 0, 0.7)',
  zIndex: '1000'
}

export default function Modal({isOpen, setIsOpen, note, setNote, registerNote}: ModalProps) {

    if (!isOpen) return null;

    return(
      <div style={BACKGROUND_STYLE}>
        <div className='modal'>
          <button className='bars' id='bars' aria-expanded='false' aria-label='fechar formulário' role='form' onClick={() => setIsOpen(false)}>
            <span className='bar'></span>
            <span className='bar'></span>
          </button>
          <div className='modal-content'>
            <h2 className='subtitle'>Adicionar Nota</h2>
            <form className='form' onSubmit={(e) => { e.preventDefault(); registerNote(); setIsOpen(false); }}>

              <div className='form-group'>
                <label >* Título</label>
                <input
                  type='text'
                  name='title'
                  value={note.title}
                  required
                  onChange={(e) => setNote(prev => ({...prev, title: e.target.value}))}>
                </input>
              </div>

              <div className='form-group'>
                <label>* Descrição</label>
                <textarea
                  name='description'
                  value={note.description}
                  rows={4}
                  required
                  onChange={(e) => setNote(prev => ({...prev, description: e.target.value}))}>
                </textarea>
              </div>

              <div className='form-group'>
                <label>* Prioridade: </label>
                <div className='checkbox-group'>
                  <label>
                    <input className='checkbox'
                      type='checkbox'
                      name='high'
                      checked={note.priorities.high}
                      onChange={(e) => setNote(prev => ({...prev, priorities: {...prev.priorities, [e.target.name]: e.target.checked}}))}></input>
                    Alta
                  </label>
                  <label>
                    <input
                      className='checkbox'
                      type='checkbox'
                      name='medium'
                      checked={note.priorities.medium}
                      onChange={(e) => setNote(prev => ({...prev, priorities: {...prev.priorities, [e.target.name]: e.target.checked}}))}>
                    </input>
                    Média
                  </label>
                  <label>
                    <input
                      className='checkbox'
                      type='checkbox'
                      name='low'
                      checked={note.priorities.low}
                      onChange={(e) => setNote(prev => ({...prev, priorities: {...prev.priorities, [e.target.name]: e.target.checked}}))}>
                    </input>
                    Baixa
                  </label>
                </div>
              </div>

              <button className='form-button' type='submit' >Salvar</button>
            </form>
          </div>

        </div>
      </div>
    )
}
