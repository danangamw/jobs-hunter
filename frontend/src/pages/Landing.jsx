import { Logo } from '../components/';
import interview from '../assets/images/interview.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
            doloribus at aut debitis laboriosam quis vel sequi eveniet
            architecto corrupti.
          </p>

          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>

        <img src={interview} alt='Jobs Hunter' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
