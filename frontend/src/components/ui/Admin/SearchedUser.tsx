import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { IUser } from '../../../services/users/users.interface'
import autoAnimate from '@formkit/auto-animate'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { UserService } from '../../../services/users/users.service'

const SearchedUser = ({ props }: { props: IUser }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>(props.first_name)
  const [lastName, setLastName] = useState<string>(props.last_name)
  const [patronymic, setPatronymic] = useState<string>(props.patronymic)
  const parent = useRef(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  const queryClient = useQueryClient()
  const mutationRole = useMutation({
    mutationFn: UserService.setRoleById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['usersWithFilter'] })
    }
  })
  const mutationUser = useMutation({
    mutationFn: UserService.updateUserById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['usersWithFilter'] })
    }
  })
  const submit = (event: SyntheticEvent) => {
    event.preventDefault()
    mutationUser.mutate({
      id: props.id,
      first_name: firstName,
      last_name: lastName,
      patronymic: patronymic
    })
    setIsEdit(false)
  }
  return (
    <div
      ref={parent}
      className="w-full flex justify-between items-center px-4 py-4 border-[1px] border-primary rounded-[20px]"
    >
      <div className="flex items-center gap-8">
        {!isEdit && (
          <>
            <h3 className=" font-medium">{`${props.first_name} ${props.last_name} ${props.patronymic}`}</h3>
            <p className=" font-light">{props.email}</p>
          </>
        )}
        {isEdit && (
          <form onSubmit={submit} className="flex items-center gap-4">
            <input
              type="text"
              className="input input-primary rounded-lg font-medium p-2"
              placeholder={props.first_name}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="input input-primary rounded-lg font-medium p-2"
              placeholder={props.last_name}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              className="input input-primary rounded-lg font-medium p-2"
              placeholder={props.patronymic}
              value={patronymic}
              onChange={(e) => setPatronymic(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary rounded-[10px] px-6"
            >
              Сохранить
            </button>
          </form>
        )}
      </div>
      <div className="flex items-center gap-8">
        {!isEdit && (
          <span className="underline">
            {props.role === 'admin'
              ? 'Администратор'
              : props.role === 'moderator'
                ? 'Модератор'
                : props.role === 'user'
                  ? 'Представитель'
                  : 'Нет роли'}
          </span>
        )}
        {isEdit && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                mutationRole.mutate({ id: props.id, role: 'admin' })
              }}
              className={`btn rounded-[9px] min-h-0 h-full text-base font-normal px-2 py-0.5 ${props.role === 'admin' ? 'btn-primary' : 'btn-outline btn-ghost'}`}
            >
              Администратор
            </button>
            <button
              onClick={() => {
                mutationRole.mutate({ id: props.id, role: 'moderator' })
              }}
              className={`btn rounded-[9px] min-h-0 h-full text-base font-normal px-2 py-0.5 ${props.role === 'moderator' ? 'btn-primary' : 'btn-outline btn-ghost'}`}
            >
              Модератор
            </button>
            <button
              onClick={() => {
                mutationRole.mutate({ id: props.id, role: 'user' })
              }}
              className={`btn rounded-[9px] min-h-0 h-full text-base font-normal px-2 py-0.5 ${props.role === 'user' ? 'btn-primary' : 'btn-outline btn-ghost'}`}
            >
              Представитель
            </button>
          </div>
        )}
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="flex items-center gap-4"
        >
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 10.4999C1 14.9782 1 17.2174 2.39079 18.6081C3.78348 19.9999 6.02167 19.9999 10.4999 19.9999C14.9782 19.9999 17.2174 19.9999 18.6081 18.6081C19.9999 17.2183 19.9999 14.9782 19.9999 10.4999V9.07495M11.9249 1H10.4999C6.02167 1 3.78253 1 2.39079 2.39079C1.46645 3.31609 1.1558 4.61663 1.05225 6.69997"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M15.22 2.38236L15.8365 1.76581C16.3271 1.27538 16.9924 0.999911 17.686 1C18.3797 1.00009 19.0449 1.27573 19.5353 1.76628C20.0258 2.25684 20.3012 2.92212 20.3011 3.61578C20.3011 4.30944 20.0254 4.97466 19.5349 5.46509L18.9174 6.08163C18.9174 6.08163 17.6083 6.00468 16.4531 4.84854C15.2969 3.69335 15.22 2.38331 15.22 2.38331L9.55327 8.04907C9.16948 8.43287 8.97758 8.62477 8.81228 8.83662C8.61753 9.08552 8.45128 9.35626 8.31448 9.64221C8.19953 9.88446 8.11403 10.1419 7.94208 10.6568L7.39204 12.305M7.39204 12.305L7.03674 13.3709C6.99495 13.4953 6.98867 13.6288 7.01861 13.7564C7.04855 13.8841 7.11351 14.0009 7.20619 14.0937C7.29888 14.1865 7.41561 14.2516 7.54326 14.2817C7.67092 14.3117 7.80443 14.3056 7.92878 14.2639L8.99563 13.9086M7.39204 12.305L8.99563 13.9086M18.9183 6.08068L16.0845 8.91357M13.2516 11.7474C12.8678 12.1312 12.6759 12.3231 12.4641 12.4884C12.2144 12.6831 11.9443 12.85 11.6585 12.9862C11.4162 13.1011 11.1588 13.1866 10.6439 13.3586L8.99563 13.9086"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SearchedUser
