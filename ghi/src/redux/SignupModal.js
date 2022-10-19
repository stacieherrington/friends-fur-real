import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "./api";
import { preventDefault } from "./utility";
import { showModal, updateField, SIGNUP_MODAL } from "./accountSlice";
import Notification from "./Notification";

export default function SignupModal() {
  const dispatch = useDispatch();
  const { show, username, password } = useSelector((state) => state.account);
  const modalClass = `modal ${show === SIGNUP_MODAL ? "is-active" : ""}`;
  const [signup, { error, isLoading: signupLoading }] = useSignupMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );
  return (
    <div className={modalClass} key='signup-modal'>
      <div className='modal-background'></div>
      <div className='modal-content'>
        <div className='box content'>
          <h3>Signup</h3>
          {error ? (
            <Notification type='danger'>{error.data.detail}</Notification>
          ) : null}
          <form
            method='POST'
            onSubmit={preventDefault(signup, () => ({
              email: username,
              password,
            }))}
          >
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
                <button disabled={signupLoading} className='button is-success'>
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
