import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {

  const { openDateModal } = useUiStore()
  const { setActiveEvent } = useCalendarStore()

  const handleNewClick = () => {
    setActiveEvent(
      {
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 1),
        bgColor: '#fafafa',
        user: {
          _id: '123',
          name: 'David',
        }
      }
    )
    openDateModal()
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={handleNewClick}
    >
      <i className="fa fa-plus"></i>
    </button>
  )
}
