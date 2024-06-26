import { Helmet } from 'react-helmet-async'
import { useCheckRole } from '../../../hooks/useCheckRole'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Accepted from '../../section/User/Accepted/Accepted'
import NotAccepted from '../../section/User/NotAccepted/NotAccepted'
import UploadFile from '../../section/User/UploadFile/UploadFile'
import Table from '../Table/Table'

type TemplateKeys = 'supervisor' | 'user' | 'admin'

const UserDashboard = () => {
  useCheckRole(['user', 'supervisor'])
  const user = useTypedSelector((state) => state.user.user)
  const TEMPLATES: Record<TemplateKeys, JSX.Element> = {
    supervisor: <Table />,
    user: <UploadFile />,
    admin: <UploadFile />
  }
  return (
    <div className="py-20">
      <Helmet>
        <title>Представитель</title>
      </Helmet>
      {user && user.role === 'admin' && <Table />}
      {user && user.role && TEMPLATES[user.role as TemplateKeys]}
      <NotAccepted />
      <Accepted />
    </div>
  )
}

export default UserDashboard
