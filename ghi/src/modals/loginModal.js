import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../app/slices/authEndpoints";
import {
  eventTargetSelector as target,
  preventDefault,
} from "../functions/utilities";
import {
  showModal,
  updateField,
  LOG_IN_MODAL,
} from "../endpoints/accountSlice";
import Notification from "./Notification";

export default function LoginModal() {
  const dispatch = useDispatch();
  const { show, username, password } = useSelector((state) => state.account);
  const modalClass = `modal ${show === LOG_IN_MODAL ? "is-active" : ""}`;
  const [login, { error, isLoading: loginLoading }] = useLoginMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );
  return (
    <div className={modalClass} key='login-modal'>
      <div className='modal-background'></div>
      <div className='modal-content'>
        <div className='box content'>
          <h3>Login</h3>
          {error ? (
            <Notification type='danger'>{error.data.detail}</Notification>
          ) : null}
          <form method='POST' onSubmit={preventDefault(login, target)}>
            <div className='field'>
              <label className='label' htmlFor='email'>
                Email
              </label>
              <div className='control'>
                <input
                  required
                  onChange={field}
                  value={username}
                  name='username'
                  className='input'
                  type='email'
                  placeholder='you@example.com'
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div className='control'>
                <input
                  required
                  onChange={field}
                  value={password}
                  name='password'
                  className='input'
                  type='password'
                  placeholder='secret...'
                />
              </div>
            </div>
            <div className='field is-grouped'>
              <div className='control'>
                <button disabled={loginLoading} className='button is-success'>
                  Submit
                </button>
              </div>
              <div className='control'>
                <button
                  type='button'
                  onClick={() => dispatch(showModal(null))}
                  className='button is-danger'
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
