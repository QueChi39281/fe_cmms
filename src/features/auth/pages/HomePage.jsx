import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarCheck2, Clock3, Cpu, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../../hooks/useAuth.js'
import { apiRequest } from '../../../services/api/client.js'
import './HomePage.css'

const initialValues = { name: '', email: '', password: '' }

export default function HomePage() {
  const [mode, setMode] = useState('login')
  const [values, setValues] = useState(initialValues)
  const [showPassword, setShowPassword] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useAuth()

  function changeMode(nextMode) {
    setMode(nextMode)
    setShowPassword(false)
    setFeedback(null)
    setValues(initialValues)
  }

  function updateField(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setFeedback(null)

    try {
      if (mode === 'login') {
        const result = await apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email: values.email, password: values.password }),
        })
        const user = result.user ?? result
        setUser(user)
        const allowedRoles = ['admin', 'manager', 'equipment-user', 'technician']
        const role = allowedRoles.includes(user.role) ? user.role : 'admin'
        navigate(`/${role}/dashboard`)
      } else if (mode === 'register') {
        await apiRequest('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name: values.name, email: values.email, password: values.password }),
        })
        setMode('login')
        setValues({ ...initialValues, email: values.email })
        setFeedback({ type: 'success', text: 'Tạo tài khoản thành công. Bạn có thể đăng nhập ngay.' })
      } else {
        await apiRequest('/auth/forgot-password', {
          method: 'POST',
          body: JSON.stringify({ email: values.email }),
        })
        setMode('login')
        setValues({ ...initialValues, email: values.email })
        setFeedback({ type: 'success', text: 'Nếu email tồn tại, hướng dẫn đặt lại mật khẩu sẽ được gửi đến bạn.' })
      }
    } catch (error) {
      setFeedback({ type: 'error', text: error.message || 'Không thể xử lý yêu cầu. Vui lòng thử lại.' })
    } finally {
      setSubmitting(false)
    }
  }

  const isLogin = mode === 'login'
  const isRegister = mode === 'register'

  return (
    <main className="welcome-page">
      <section className="welcome-story" aria-labelledby="welcome-title">
        <header className="welcome-brand">
          <span className="welcome-brand__mark">F</span>
          <span>fixflow<span>.</span></span>
        </header>

        <div className="welcome-copy">
          <p className="welcome-eyebrow"><span /> NỀN TẢNG QUẢN LÝ BẢO TRÌ</p>
          <h1 id="welcome-title">Thiết bị ổn định.<br /><span>Công việc</span> liền mạch.</h1>
          <p className="welcome-description">Một nơi để theo dõi thiết bị, tiếp nhận yêu cầu sửa chữa và đưa mọi lịch bảo trì đi đúng nhịp.</p>

          <div className="welcome-visual" aria-label="Tổng quan tình trạng thiết bị">
            <div className="visual-topline"><span>TRẠNG THÁI VẬN HÀNH</span><span className="live-indicator"><i /> ĐANG THEO DÕI</span></div>
            <div className="visual-content">
              <div className="visual-score"><div className="visual-ring"><span>96<small>%</small></span></div><div><strong>Thiết bị sẵn sàng</strong><span>Hệ thống vận hành ổn định</span></div></div>
              <div className="visual-equipment">
                <div><span className="equipment-glyph equipment-glyph--blue"><Cpu size={14} /></span><span><strong>Thiết bị hoạt động</strong><small>248 thiết bị</small></span><i className="equipment-status equipment-status--green" /></div>
                <div><span className="equipment-glyph equipment-glyph--gold"><Clock3 size={14} /></span><span><strong>Yêu cầu sửa chữa</strong><small>Được theo dõi tập trung</small></span><i className="equipment-status equipment-status--gold" /></div>
                <div><span className="equipment-glyph equipment-glyph--mint"><CalendarCheck2 size={14} /></span><span><strong>Lịch bảo trì</strong><small>Chủ động, đúng thời điểm</small></span><i className="equipment-status equipment-status--green" /></div>
              </div>
            </div>
            <div className="visual-footer"><span>THEO DÕI</span><b /> <span>TIẾP NHẬN</span><b /> <span>HOÀN TẤT</span></div>
          </div>
        </div>

        <footer className="welcome-footer"><span>FIXFLOW CMMS</span><span>QUẢN LÝ BẢO TRÌ, ĐƠN GIẢN HƠN</span></footer>
      </section>

      <section className="auth-side" aria-label="Tài khoản FixFlow">
        <div className="auth-card">
          {mode !== 'forgot' && (
            <div className="auth-tabs" role="tablist" aria-label="Chọn hình thức tài khoản">
              <button type="button" role="tab" aria-selected={isLogin} className={isLogin ? 'auth-tab auth-tab--active' : 'auth-tab'} onClick={() => changeMode('login')}>Đăng nhập</button>
              <button type="button" role="tab" aria-selected={isRegister} className={isRegister ? 'auth-tab auth-tab--active' : 'auth-tab'} onClick={() => changeMode('register')}>Tạo tài khoản</button>
            </div>
          )}

          <div className="auth-heading">
            <p className="auth-kicker">{isRegister ? 'BẮT ĐẦU CÙNG FIXFLOW' : mode === 'forgot' ? 'KHÔI PHỤC TÀI KHOẢN' : 'CHÀO MỪNG TRỞ LẠI'}</p>
            <h2>{isRegister ? 'Tạo tài khoản mới' : mode === 'forgot' ? 'Quên mật khẩu?' : 'Đăng nhập'}</h2>
            <p>{isRegister ? 'Tạo tài khoản để bắt đầu quản lý công việc bảo trì.' : mode === 'forgot' ? 'Nhập email đã đăng ký, chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.' : 'Đăng nhập để tiếp tục đến không gian làm việc của bạn.'}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && (
              <label className="form-field">
                <span>Họ và tên</span>
                <input autoComplete="name" name="name" onChange={updateField} placeholder="Nguyễn Minh Anh" required value={values.name} />
              </label>
            )}
            <label className="form-field">
              <span>Địa chỉ email</span>
              <input autoComplete="email" name="email" onChange={updateField} placeholder="ban@congty.com" required type="email" value={values.email} />
            </label>
            {mode !== 'forgot' && (
              <label className="form-field">
                <span>Mật khẩu</span>
                <span className="password-input-wrap">
                  <input autoComplete={isRegister ? 'new-password' : 'current-password'} minLength="8" name="password" onChange={updateField} placeholder="Tối thiểu 8 ký tự" required type={showPassword ? 'text' : 'password'} value={values.password} />
                  <button
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    aria-pressed={showPassword}
                    className="password-visibility"
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    {showPassword ? <EyeOff aria-hidden="true" size={17} /> : <Eye aria-hidden="true" size={17} />}
                  </button>
                </span>
              </label>
            )}
            {isLogin && <div className="auth-options"><label className="remember-option"><input type="checkbox" /> <span>Ghi nhớ đăng nhập</span></label><button type="button" className="auth-text-button" onClick={() => changeMode('forgot')}>Quên mật khẩu?</button></div>}
            {feedback && <p className={`auth-feedback auth-feedback--${feedback.type}`} role="status">{feedback.text}</p>}
            <button className="auth-submit" disabled={submitting} type="submit">
              {submitting ? 'Đang xử lý...' : isRegister ? 'Tạo tài khoản' : mode === 'forgot' ? 'Gửi hướng dẫn' : 'Đăng nhập'}
            </button>
          </form>

          {mode === 'forgot' ? (
            <p className="auth-switch">Nhớ mật khẩu rồi? <button type="button" className="auth-text-button" onClick={() => changeMode('login')}>Quay lại đăng nhập</button></p>
          ) : (
            <p className="auth-switch">{isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'} <button type="button" className="auth-text-button" onClick={() => changeMode(isRegister ? 'login' : 'register')}>{isRegister ? 'Đăng nhập' : 'Tạo tài khoản'}</button></p>
          )}
          <div className="auth-secure"><ShieldCheck aria-hidden="true" size={15} /> Kết nối bảo mật cho không gian làm việc của bạn</div>
        </div>
        <p className="auth-copyright">© 2026 FixFlow · Quản lý vận hành thiết bị</p>
      </section>
    </main>
  )
}
