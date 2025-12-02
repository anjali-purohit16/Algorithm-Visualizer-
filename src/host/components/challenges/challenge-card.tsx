import { NavLink } from 'react-router-dom';
import classes from './challenges.module.scss';

interface Props {
  name: string;
  link: string;
  img: string;
}

function ChallengeCard({ name, link, img }: Props) {
  return (
    <NavLink to={link} className={classes.card}>
      {/* Image Section with Overlay */}
      <div className={classes.imageWrapper}>
        <div className={classes.glowOverlay}></div>
        <img src={img} alt={name} />
      </div>

      {/* Text Section */}
      <div className={classes.content}>
        <h1>{name}</h1>
        <span>Initialize &rarr;</span>
      </div>
    </NavLink>
  );
}

export default ChallengeCard;