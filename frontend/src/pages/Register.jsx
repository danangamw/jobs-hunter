import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

// redux toolkit and use navigate later
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

// if possible prefer local state
// global state

const Register = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  // redux toolkit and usenavigate later

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all fields');
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }

    dispatch(registerUser({ name, email, password }));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        toast.success(`Hello ${user.name}`);
        navigate('/');
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type={'text'}
            value={values.name}
            handleChange={handleChange}
            name={'name'}
            labelText={'name'}
          />
        )}

        {/* email field */}
        <FormRow
          type={'email'}
          value={values.email}
          handleChange={handleChange}
          name={'email'}
          labelText={'email'}
        />

        {/* password field */}
        <FormRow
          type={'password'}
          value={values.password}
          handleChange={handleChange}
          name={'password'}
          labelText={'password'}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'submit'}
        </button>

        <p>
          {values.isMember ? 'Not a member yet ?' : 'Already a member ?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>

        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: 'testUser@test.com', password: 'secret' })
            );
          }}
        >
          {isLoading ? 'loading...' : 'demo'}
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
