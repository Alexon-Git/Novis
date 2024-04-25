import { IUser } from '../../../services/users/users.interface'

const SettingForm = ({ props }: { props: IUser }) => {
  return (
    <form className="flex flex-col gap-16">
      <div className="w-1/4 flex flex-col justify-between gap-6">
        <label className="flex items-center justify-between font-extralight">
          Имя
          <input
            type="text"
            className="input input-bordered rounded-none input-ghost h-8 min-h-8"
            placeholder={props.firstName}
          />
        </label>
        <label className="flex items-center justify-between font-extralight">
          Фамилия
          <input
            type="text"
            className="input input-bordered rounded-none input-ghost h-8 min-h-8"
            placeholder={props.lastName}
          />
        </label>
        <label className="flex items-center justify-between font-extralight">
          Отчество
          <input
            type="text"
            className="input input-bordered rounded-none input-ghost h-8 min-h-8"
            placeholder={props.surName}
          />
        </label>
        <label className="flex items-center justify-between font-extralight">
          Почта
          <input
            type="email"
            className="input input-bordered rounded-none input-ghost h-8 min-h-8"
            placeholder={props.email}
          />
        </label>
        <label className="flex items-center justify-between font-extralight">
          Город
          <input
            type="text"
            className="input input-bordered rounded-none input-ghost h-8 min-h-8"
            placeholder={props.city ? props.city : 'Ваш город'}
          />
        </label>
        <label className="flex items-center justify-between font-extralight">
          Страна
          <input
            type="text"
            className="input input-bordered rounded-none input-ghost h-8 min-h-8"
            placeholder={props.country ? props.country : 'Страна'}
          />
        </label>
        <label className="flex items-center justify-between font-extralight">
          Часовой пояс
          <input
            type="text"
            className="input input-bordered rounded-none input-ghost h-8 min-h-8"
            placeholder={props.timeZone ? props.timeZone : 'Часовой пояс'}
          />
        </label>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button
            className="btn btn-primary rounded-[4px] h-11 min-h-11 text-base-100 text-xl font-semibold"
            type="submit"
          >
            Обновить профиль
          </button>
          <button
            className="btn btn-primary rounded-[4px] h-11 min-h-11 text-base-100 text-xl font-semibold"
            type="reset"
          >
            Отмена
          </button>
        </div>
        <button
          className="btn btn-primary rounded-[4px] h-11 min-h-11 text-base-100 text-xl font-semibold"
        >
          Выйти
        </button>
      </div>
    </form>
  )
}

export default SettingForm