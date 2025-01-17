import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from 'react-modal'

import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('es', es)

import { useCalendarStore, useUiStore } from '../../hooks';



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore()
  const { activeEvent, startSavingEvent } = useCalendarStore()

  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: addHours(new Date(), 2),
    end: addHours(new Date(), 4),
  })

  const titleClass = useMemo(() => {
    if (!formSubmitted) return ''
    return formValues.title.length > 4 ? 'is-valid' : 'is-invalid'

  }, [formValues.title, formSubmitted])

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent })
    }

  }, [activeEvent])


  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChange = (e, changing) => {
    setFormValues({
      ...formValues,
      [changing]: e
    })
  }

  const onCloseModal = () => {
    closeDateModal()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    const difference = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(difference) || difference <= 0) {
      console.log('Error in dates');
      Swal.fire('Fechas incorrectas', 'La fecha de fin debe ser mayor a la de inicio', 'error')
      return;
    }

    if (formValues.title.trim().length < 2) return

    await startSavingEvent(formValues)
    closeDateModal()
    setFormSubmitted(false)
  }

  return (
    <Modal
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form
        className="container"
        onSubmit={onSubmit}
      >

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            className="form-control"
            onChange={(e) => onDateChange(e, 'start')}
            dateFormat='Pp'
            showTimeSelect
            locale={'es'}
            timeCaption='Hora'
            selected={formValues.start}
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            className="form-control"
            onChange={(e) => onDateChange(e, 'end')}
            dateFormat='Pp'
            showTimeSelect
            locale={'es'}
            timeCaption='Hora'
            selected={formValues.end}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            value={formValues.title}
            autoComplete="off"
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )

}
