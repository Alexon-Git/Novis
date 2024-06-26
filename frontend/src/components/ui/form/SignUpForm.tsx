import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { emailPattern } from './emailPattern'
import { ISignUpRequest } from '../../../services/auth/auth.interface'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'
import { closeModal } from '../../../store/modals/modalReducer'
import { useDispatch } from 'react-redux'

const SignUpForm = () => {
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>()
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ISignUpRequest>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      first_name: '',
      last_name: '',
      patronymic: '',
      email: '',
      password: ''
    }
  })
  const { isLoading, error, user } = useTypedSelector((state) => state.user)
  const { signup } = useActions()
  const dispatch = useDispatch()

  const onSubmit = async (data: ISignUpRequest) => {
    signup(data)
  }

  useEffect(() => {
    if (user && user.id) {
      dispatch(closeModal())
    }
  }, [user])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col z-20"
    >
      <div className="flex flex-col gap-3 py-12">
        <div className="flex flex-col gap-8 text-[#A9A9A9]">
          <div>
            <input
              {...register('first_name', {
                required: true
              })}
              type="text"
              placeholder="Имя"
              className={`input ${errors.first_name && 'input-error'} bg-base-100 w-full rounded-[10px]`}
            />
            {errors.first_name?.type === 'required' && (
              <p className="font-medium text-sm text-error">
                * это поле обязательно
              </p>
            )}
          </div>
          <div>
            <input
              {...register('last_name', {
                required: true
              })}
              type="text"
              placeholder="Фамилия"
              className={`input ${errors.last_name && 'input-error'} bg-base-100 w-full rounded-[10px]`}
            />
            {errors.last_name?.type === 'required' && (
              <p className="font-medium text-sm text-error">
                * это поле обязательно
              </p>
            )}
          </div>
          <div>
            <input
              {...register('patronymic', {
                required: true
              })}
              type="text"
              placeholder="Отчество"
              className={`input ${errors.patronymic && 'input-error'} bg-base-100 w-full rounded-[10px]`}
            />
            {errors.patronymic?.type === 'required' && (
              <p className="font-medium text-sm text-error">
                * это поле обязательно
              </p>
            )}
          </div>
          <div>
            <input
              {...register('email', {
                required: true,
                pattern: emailPattern
              })}
              type="email"
              placeholder="Почта"
              className={`input ${errors.email && 'input-error'} bg-base-100 w-full rounded-[10px]`}
            />
            {errors.email?.type === 'required' && (
              <p className="font-medium text-sm text-error">
                * это поле обязательно
              </p>
            )}
            {errors.email?.type === 'pattern' && (
              <p className="font-medium text-sm text-error">
                * это поле должно соответстовать почте
              </p>
            )}
          </div>
          <div>
            <input
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              type="password"
              placeholder="Пароль"
              className={`input ${errors.password && 'input-error'} bg-base-100 w-full rounded-[10px]`}
            />
            {errors.password?.type === 'required' && (
              <p className="font-medium text-sm text-error">
                * это поле обязательно
              </p>
            )}
          </div>
          <div>
            <input
              {...register('password', {
                required: true,
                validate: (value) =>
                  value === passwordConfirmation || 'Пароли не совпадают'
              })}
              type="password"
              placeholder="Подтвердите пароль"
              className={`input ${errors.password && 'input-error'} bg-base-100 w-full rounded-[10px]`}
            />
            {errors.password?.type === 'required' && (
              <p className="font-medium text-sm text-error">
                * это поле обязательно
              </p>
            )}
          </div>
        </div>
        {errors.password?.type === 'validate' && (
          <p className="font-medium text-sm text-error">*Пароли не совпадают</p>
        )}
        {error && (
          <p className="font-medium text-sm text-error">
            {error &&
                <>*{error.message}</>
            }
          </p>
        )}
      </div>
      <button
        disabled={isLoading}
        className="w-full btn btn-secondary text-base-100 rounded-[12px] font-medium text-xl"
      >
        {!isLoading ? (
          'Зарегистрироваться'
        ) : (
          <div role="status">
            <span className="loading loading-spinner text-base-100"></span>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </button>
    </form>
  )
}

export default SignUpForm
